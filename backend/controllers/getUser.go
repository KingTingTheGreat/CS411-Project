package controllers

import (
	"backend/responses"
	"backend/types"
	"fmt"

	"github.com/labstack/echo/v4"
)

func GetUser(c echo.Context) error {
	fmt.Println("GetUser controller")
	id := c.Param("id")

	// get user data from database
	user := types.User{
		Id:                id,
		Username:          "test-username",
		Email:             "test-email",
		FirstName:         "test-first-name",
		LastName:          "test-last-name",
		FavoriteMountains: []string{"test-mountain1", "test-mountain2"},
	}

	data := &echo.Map{
		"user": user,
	}

	res := responses.Response{Status: 200, Message: fmt.Sprintf("User data for: %v", id), Data: data}

	return c.JSON(200, res)
}
