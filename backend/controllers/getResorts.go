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
	var longitude, radius float64

	log.Println("Received parameters:", latQuery, lngQuery, radiusQuery) // Logging input parameters

	latitude, err := strconv.ParseFloat(latQuery, 64)
	if err != nil {
		log.Println("Error converting latitude:", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid latitude"})
	}

	longitude, err = strconv.ParseFloat(lngQuery, 64) // Use = as err is already declared
	if err != nil {
		log.Println("Error converting longitude:", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid longitude"})
	}

	radius, err = strconv.ParseFloat(radiusQuery, 64) // Use = as err is already declared
	if err != nil {
		log.Println("Error converting radius:", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid radius"})
	}

	client := clients.NewSkiResortClient()
	jsonResponse, err := client.GetResorts() // err is declared first time with :=
	if err != nil {
		log.Println("Error fetching resorts:", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch resorts"})
	}

	var result struct {
		Data []Resort `json:"data"` // Assuming the data array is under a 'data' key
	}

	err = json.Unmarshal([]byte(jsonResponse), &result) // Use = as err is already declared
	if err != nil {
		log.Println("Error unmarshalling JSON:", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error parsing resorts data"})
	}

	log.Println("Parsed Resorts:", result.Data)

	filteredResorts := filterResortsByDistance(result.Data, latitude, longitude, radius)

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
