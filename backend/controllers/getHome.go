package controllers

import (
	"backend/responses"

	"github.com/labstack/echo/v4"
)

// Home godoc
func Home(c echo.Context) error {
	data := &echo.Map{
		"message": "Hello, World!",
	}

	res := responses.Response{Status: 200, Message: "Welcome to the home page", Data: data}

	return c.JSON(200, res)
}
