package controllers

import (
	"context"	

	"github.com/labstack/echo/v4"
	"github.com/markbates/goth/gothic"
)

func GetAuthProvider(c echo.Context) error {
	// set the provider in the context
	provider := c.Param("provider")
	contextWithVal := context.WithValue(c.Request().Context(), "provider", provider)

	// create a new request with the new context
	nr := c.Request().WithContext(contextWithVal)
	c.SetRequest(nr)

	// call the gothic.BeginAuthHandler with the new request to start the authentication process
	gothic.BeginAuthHandler(c.Response(), c.Request())
	return nil
}
