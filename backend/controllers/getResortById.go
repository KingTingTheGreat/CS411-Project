package controllers

import (
	"backend/clients"
	"backend/shared"
	"encoding/json"

	"github.com/labstack/echo/v4"
)

func GetResortById(c echo.Context) error {
	id := c.QueryParam("id")

	client := clients.NewSkiResortClient()
	detailsJSON, err := client.GetResortDetails(id)
	if err != nil {
		return c.JSON(500, map[string]string{"error": "Error fetching details"})
	}

	var details ResortDetails
	err = json.Unmarshal([]byte(detailsJSON), &details)
	if err != nil {
		return c.JSON(500, map[string]string{"error": "Error fetching details"})
	}

	r := shared.AllResortsMap[id]

	weatherClient := clients.NewWeatherClient()                                               // Ensure you have this client set up
	weather, err := weatherClient.FetchWeather(r.Location.Latitude, r.Location.Longitude, 14) // Assuming you want a 7-day forecast
	if err != nil {
		return c.JSON(500, map[string]string{"error": "Error fetching weather"})
	}

	enriched := EnrichedResort{
		Resort:     r,
		Units:      details.Data.Units,
		Href:       details.Data.Href,
		Lifts:      details.Data.Lifts,
		Conditions: details.Data.Conditions,
		Weather:    *weather,
	}

	return c.JSON(200, enriched)
}
