package controllers

import (
	"backend/models"
	"backend/shared"
	"fmt"
	"log"
	"net/http"
	"strings" 
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/net/context"
)

func updateUser(token string, user models.User) {
	fmt.Println("updatd user", user)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := userCollection.UpdateOne(ctx, bson.M{"email":user.Email}, bson.M{"$set":bson.M{"favorites": user.Favorites}})
	if err != nil {
		log.Println(err)
	}
	shared.MyKeyStore.Set(token, user) 
	fmt.Println("updated memory")
}

func PutFavoriteStatus(c echo.Context) error {
	fmt.Println("\n\nPUTFAVORITESTATUS\n\n")
	
	mountainId := c.FormValue("id")
	status := c.FormValue("status") == "true"

	fmt.Println(mountainId, status)

	token := c.Request().Header.Get("Authorization")
	token = strings.TrimPrefix(token, "Bearer ")

	if token == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error":"Token is required"})
	}
	user, ok := shared.MyKeyStore.Get(token)
	if !ok {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error":"Unauthorized"})
	}
	fmt.Println("user", user)

	currentStatus := false
	for i, v := range user.Favorites {
		if v == mountainId {
			if !status {
				user.Favorites = append(user.Favorites[:i], user.Favorites[i+1:]...)
				log.Println("REMOVED FAVORITE")
				go updateUser(token, user)
				return c.JSON(http.StatusOK, map[string]string{"message":"Success"})
			}
			currentStatus = true
		}
	}

	if status == currentStatus {
		// mountainId already in favorites, no changes to be made
		return c.JSON(http.StatusOK, map[string]string{"message":"Success"})
	}

	// add mountainId to favorites
	user.Favorites = append(user.Favorites, mountainId)
	go updateUser(token, user)
	log.Println("ADDED FAVORITE")
	return c.JSON(http.StatusOK, map[string]string{"message":"Success"})
}
