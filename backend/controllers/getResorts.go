package controllers

import (
	"backend/clients"
	"encoding/json"
	"log"
	"math"
	"net/http"
	"strconv"

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

	return c.JSON(http.StatusOK, filteredResorts)
}

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
