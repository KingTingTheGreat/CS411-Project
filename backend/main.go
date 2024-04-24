package main

import (
	"backend/configs"
	"backend/controllers"
	"backend/utils"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

type ProviderContextKey struct{}

func main() {
	key := utils.GenerateRandomString(16)
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
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// run database
	configs.ConnectDB()

	// // middleware
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:6969", "http://localhost:5173"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	e.GET("/", controllers.Home)

	e.GET("/auth/:provider/callback", controllers.GetAuthProviderCallback)
	e.GET("/auth/:provider", controllers.GetAuthProvider)

	e.GET("/auth/logout", controllers.GetLogout)

	e.POST("/validate-token", controllers.ValidateToken)
	e.POST("/profile", controllers.GetProfile)

	e.GET("/resorts", controllers.GetResorts)

	e.GET("/getCoordinates", controllers.GetCoordinates)

	e.Logger.Fatal(e.Start(":6969"))
}

