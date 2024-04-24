package controllers

import (
	"github.com/labstack/echo/v4"
	"github.com/markbates/goth/gothic"
)

func GetLogout(c echo.Context) error {
	gothic.Logout(c.Response(), c.Request())
	return c.Redirect(302, "http://localhost:5173")
}
