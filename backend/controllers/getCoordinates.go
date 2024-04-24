package controllers 

import (
	"backend/clients"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetCoordinates(c echo.Context) error {
	address := c.QueryParam("address")
	if address == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Address is required"})
	}

	client := clients.NewGoogleMapsClient()
	lat, lng, err := client.GetCoordinates(address)
	if err != nil {
		// Handle error appropriately
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to get coordinates"})
	}

	return c.JSON(http.StatusOK, map[string]float64{"latitude": lat, "longitude": lng})
}
