package controllers

import (
	"backend/responses"
	"backend/shared"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

func GetProfile(c echo.Context) error {
	token := c.Request().Header.Get("Authorization")
	token = strings.TrimPrefix(token, "Bearer ")

	if token == "" {
		return c.JSON(http.StatusBadRequest, responses.Response{
			Status:  http.StatusBadRequest,
			Message: "Token is required",
			Data:    nil,
		})
	}

	user, ok := shared.MyKeyStore.Get(token)
	if !ok {
		return c.JSON(http.StatusUnauthorized, responses.Response{
			Status:  http.StatusUnauthorized,
			Message: "Unauthorized",
			Data:    nil,
		})
	}

	return c.JSON(http.StatusOK, responses.Response{
		Status:  http.StatusOK,
		Message: "Success",
		Data:    &echo.Map{"user": user},
	})
}
