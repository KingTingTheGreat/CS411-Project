package main

import (
	"backend/configs"
	"backend/controllers"
	"context"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

type ProviderContextKey struct{}

func main() {
	key := "secret-key"
	maxAge := 86400 * 7 // one week
	isProd := false

	store := sessions.NewCookieStore([]byte(key))
	store.MaxAge(maxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = true
	store.Options.Secure = isProd

	gothic.Store = store

	goth.UseProviders(
		google.New(configs.EnvGoogleClientId(), configs.EnvGoogleClientSecret(), "http://localhost:6969/auth/google/callback"),
	)

	e := echo.New()

	// run database
	configs.ConnectDB()

	// // middleware
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:6969", "http://localhost:5173"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.GET("/", controllers.Home)
	e.GET("/user/:id", controllers.GetUser)

	e.GET("/auth/:provider/callback", func(c echo.Context) error {
		_, err := gothic.CompleteUserAuth(c.Response(), c.Request())
		if err != nil {
			return err
		}
		// res := responses.Response{Status: 200, Message: "Sign in success", Data: &echo.Map{}}
		// return c.JSON(200, res)
		return c.Redirect(302, "http://localhost:5173/success")
	})
	e.GET("/auth/:provider", func(c echo.Context) error {
		// set the provider in the context
		provider := c.Param("provider")
		contextWithVal := context.WithValue(c.Request().Context(), "provider", provider)

		// create a new request with the new context
		nr := c.Request().WithContext(contextWithVal)
		c.SetRequest(nr)

		// call the gothic.BeginAuthHandler with the new request to start the authentication process
		gothic.BeginAuthHandler(c.Response(), c.Request())
		return nil
	})

	e.GET("/resorts", controllers.GetResorts)

	e.Logger.Fatal(e.Start(":6969"))
}
