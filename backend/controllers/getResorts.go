package controllers

import (
	"backend/clients"
	"encoding/json"
	"log"
	"math"
	"net/http"
	"strconv"
	"sync"

	"github.com/labstack/echo/v4"
)

type Resort struct {
	Slug     string   `json:"slug"`
	Name     string   `json:"name"`
	Country  string   `json:"country"`
	Region   string   `json:"region"`
	Location Location `json:"location"` // Ensure Location is properly nested
	URL      string   `json:"url"`
}

type Location struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

func GetResorts(c echo.Context) error {
	latQuery := c.QueryParam("lat")
	lngQuery := c.QueryParam("lng")
	radiusQuery := c.QueryParam("radius")

	var err error
	var latitude, longitude, radius float64

	log.Println("Received parameters:", latQuery, lngQuery, radiusQuery) // Logging input parameters

	latitude, err = strconv.ParseFloat(latQuery, 64)
	if err != nil {
		log.Println("Error converting latitude:", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid latitude"})
	}

	longitude, err = strconv.ParseFloat(lngQuery, 64)
	if err != nil {
		log.Println("Error converting longitude:", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid longitude"})
	}

	radius, err = strconv.ParseFloat(radiusQuery, 64)
	if err != nil {
		log.Println("Error converting radius:", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid radius"})
	}

	client := clients.NewSkiResortClient()
	var allResorts []Resort

	// Loop through all pages
	for page := 1; page <= 6; page++ {
		jsonResponse, err := client.GetResorts(page) // Make sure the client method can accept a page parameter
		if err != nil {
			log.Println("Error fetching resorts for page", page, ":", err)
			continue // Optionally handle this error more gracefully
		}

		var pageResult struct {
			Data []Resort `json:"data"`
		}
		err = json.Unmarshal([]byte(jsonResponse), &pageResult)
		if err != nil {
			log.Println("Error unmarshalling JSON for page", page, ":", err)
			continue // Optionally handle this error more gracefully
		}

		allResorts = append(allResorts, pageResult.Data...)
	}

	filteredResorts := filterResortsByDistance(allResorts, latitude, longitude, radius)

	log.Println("Filtered Resorts:", filteredResorts)

	// New slice to hold enriched resort data
	var enrichedResorts []EnrichedResort

	// Using a WaitGroup to synchronize the goroutines
	var wg sync.WaitGroup

	for _, resort := range filteredResorts {
		// Increment the WaitGroup counter
		wg.Add(1)
		go func(r Resort) {
			defer wg.Done() // Decrement the counter when the goroutine completes

			detailsJSON, err := client.GetResortDetails(r.Slug)
			if err != nil {
				log.Println("Error fetching details for resort", r.Slug, ":", err)
				return
			}

			log.Println("Full expanded:", detailsJSON)

			// Parse the details
			var details ResortDetails
			err = json.Unmarshal([]byte(detailsJSON), &details)
			if err != nil {
				log.Println("Error unmarshalling details for resort", r.Slug, ":", err)
				return
			}

			totalLifts := details.Lifts.Stats.Open + details.Lifts.Stats.Hold + details.Lifts.Stats.Scheduled + details.Lifts.Stats.Closed

			// Assuming ResortDetails has the fields you need, like OpenLifts and TotalLifts
			enriched := EnrichedResort{
				Resort:      resort,
				Href:        details.Href,
				LiftsStatus: details.Lifts.Status,
				LiftsStats:  details.Lifts.Stats,
				Conditions:  details.Conditions,
			}

			enriched.LiftsStats.Total = totalLifts
			// Safely add the detailed data to the slice
			mutex.Lock()
			enrichedResorts = append(enrichedResorts, enriched)
			mutex.Unlock()

		}(resort)
	}

	// Wait for all goroutines to finish
	wg.Wait()

	log.Println("Enriched Resorts:", enrichedResorts)

	return c.JSON(http.StatusOK, filteredResorts)
}

type ResortDetails struct {
	Href       string     `json:"href"`
	Units      string     `json:"units"`
	Lifts      Lifts      `json:"lifts"`
	Conditions Conditions `json:"conditions"`
}

type Lifts struct {
	Status Status `json:"status"`
	Stats  Stats  `json:"stats"`
}

type Status map[string]string

type Stats struct {
	Open       int        `json:"open"`
	Hold       int        `json:"hold"`
	Scheduled  int        `json:"scheduled"`
	Closed     int        `json:"closed"`
	Percentage Percentage `json:"percentage"`
	Total      int
}

type Percentage struct {
	Open      float64 `json:"open"`
	Hold      float64 `json:"hold"`
	Scheduled float64 `json:"scheduled"`
	Closed    float64 `json:"closed"`
}

type Conditions struct {
	Base            int `json:"base"`
	Season          int `json:"season"`
	TwelveHours     int `json:"twelve_hours"`
	TwentyFourHours int `json:"twentyfour_hours"`
	FortyEightHours int `json:"fortyeight_hours"`
	SevenDays       int `json:"seven_days"`
}

type EnrichedResort struct {
	Resort
	Href        string     `json:"href"`
	LiftsStatus Status     `json:"liftsStatus"`
	LiftsStats  Stats      `json:"liftsStats"`
	Conditions  Conditions `json:"conditions"`
}

var mutex = &sync.Mutex{}

func filterResortsByDistance(resorts []Resort, lat, lng, radius float64) []Resort {
	var result []Resort
	for _, resort := range resorts {
		if distance(lat, lng, resort.Location.Latitude, resort.Location.Longitude) <= radius {
			result = append(result, resort)
		}
	}
	return result
}

func distance(lat1, lon1, lat2, lon2 float64) float64 {
	const R = 6371 // Radius of the Earth in km
	dLat := (lat2 - lat1) * (math.Pi / 180)
	dLon := (lon2 - lon1) * (math.Pi / 180)
	a := math.Sin(dLat/2)*math.Sin(dLat/2) + math.Cos(lat1*(math.Pi/180))*math.Cos(lat2*(math.Pi/180))*math.Sin(dLon/2)*math.Sin(dLon/2)
	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))
	return R * c // Distance in km
}
