package main

import (
	"backend/clients"
	"backend/configs"
	"backend/controllers"
	"backend/models"
	"backend/shared"
	"context"
	"fmt"
	"math/rand"
	"net/http"

	"github.com/golang-jwt/jwt"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

func generateRandomString(length int) string {
	charset := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[rand.Intn(len(charset))]
	}
	return string(b)
}

type ProviderContextKey struct{}

func main() {
	jwt_secret := generateRandomString(16)

	generateToken := func() string {
		// Create a new token object
		token := jwt.New(jwt.SigningMethodHS256)

		// Sign the token with a secret key
		tokenString, _ := token.SignedString([]byte(jwt_secret))
		return tokenString
	}

	key := generateRandomString(16)
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

	e.GET("/auth/:provider/callback", func(c echo.Context) error {
		req := c.Request()

		// fmt.Println("callback p	rovider: ", provider)

		user, err := gothic.CompleteUserAuth(c.Response(), req)
		if err != nil {
			return err
		}
		if controllers.CreateUser(user.Email) {
			fmt.Println("Created new user with email: ", user.Email)
		}
		fmt.Println("Authenticated user: ", user.Email)

		user_key := generateToken()
		shared.MyKeyStore.Set(user_key, models.User{Email: user.Email})

		fmt.Println("User key: ", user_key)

		return c.Redirect(302, "http://localhost:5173/success/"+user_key)
		// return c.JSON(http.StatusOK, map[string]string{"key": user_key})
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

	e.GET("/auth/logout", func(c echo.Context) error {
		gothic.Logout(c.Response(), c.Request())
		return c.Redirect(302, "http://localhost:5173")
	})

	e.POST("/validate-token", controllers.ValidateToken)
	e.POST("/profile", controllers.GetProfile)

	e.GET("/resorts", controllers.GetResorts)

	e.GET("/getCoordinates", getCoordinatesHandler)

	e.Logger.Fatal(e.Start(":6969"))
}

func getCoordinatesHandler(c echo.Context) error {
	address := c.QueryParam("address")
	if address == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Address is required"})
	}

	client := clients.NewGoogleMapsClient()
	lat, lng, err := client.GetCoordinates(address)
	if err != nil {
		// Handle error appropriately
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to get coordinates"})
	}

	return c.JSON(http.StatusOK, map[string]float64{"latitude": lat, "longitude": lng})
}
