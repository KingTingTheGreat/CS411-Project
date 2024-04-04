package controllers

import (
	"backend/clients"
	"backend/responses"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetResorts(c echo.Context) error {
	client := clients.NewSkiResortClient()
	resorts, err := client.GetResorts()
	if err != nil {
		// Handle the error appropriately.
		return c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "Failed to fetch resorts"})
	}
	// Assume the resorts are returned as a JSON string.
	return c.JSONBlob(http.StatusOK, []byte(resorts))
}
