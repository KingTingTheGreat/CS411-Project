package controllers

import (
	"backend/shared"
	"fmt"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

func ValidateToken(c echo.Context) error {
	token := c.Request().Header.Get("Authorization")
	token = strings.TrimPrefix(token, "Bearer ")

	fmt.Println("VALIDATING TOKEN CONTROLLER", token, len(token))
	if token == "" {
		fmt.Println("token is required")
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Token is required"})
	}

	_, ok := shared.MyKeyStore.Get(token)
	if !ok {
		fmt.Println("unauthorized")
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
	}
	
	fmt.Println("success")
	return c.JSON(http.StatusOK, map[string]string{"message": "Success"})
}
