package controllers

import (
	"backend/models"
	"backend/shared"
	"backend/utils"
	"fmt"	

	"github.com/labstack/echo/v4"
	"github.com/markbates/goth/gothic"
)

func GetAuthProviderCallback(c echo.Context) error {
	req := c.Request()

	gothicUser, err := gothic.CompleteUserAuth(c.Response(), req)
	if err != nil {
		return err
	}
	user, err := CreateUser(gothicUser.Email)
	if err != nil {
		return err
	}
	fmt.Println("Authenticated user: ", user.Email)

	user_key := utils.GenerateToken()
	shared.MyKeyStore.Set(user_key, models.User{Email: user.Email, Favorites: user.Favorites})

	fmt.Println("User key: ", user_key)

	return c.Redirect(302, "http://localhost:5173/success/"+user_key)
	// return c.JSON(http.StatusOK, map[string]string{"key": user_key})
}
