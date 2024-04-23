package controllers

import (
	"backend/responses"
	// "backend/types"
	"net/http"
	"fmt"
	"time"
	"backend/configs"
	"backend/models"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/net/context"

)

var userCollection *mongo.Collection = configs.GetCollection(configs.DB, "Users")

func GetUser(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	fmt.Println("GetUser controller")
	email := c.Param("email")

	var user models.User
	err := userCollection.FindOne(ctx, bson.M{"email":email}).Decode(&user)
	if err != nil {
		fmt.Println("User not found with email", email)
		data := &echo.Map{
			"user": nil,
		}
		res := responses.Response{Status:http.StatusBadRequest, Message: "User not found", Data: data}
		return c.JSON(http.StatusBadRequest, res) 
	}

	// // get user data from database
	// Nuser := types.User{
	// 	Id:                "test-id",
	// 	Username:          "test-username",
	// 	Email:             email,
	// 	FirstName:         "test-first-name",
	// 	LastName:          "test-last-name",
	// 	FavoriteMountains: []string{"test-mountain1", "test-mountain2"},
	// }

	fmt.Printf("Got user %v\n", user)

	data := &echo.Map{
		"user": user,
	}

	res := responses.Response{Status: 200, Message: fmt.Sprintf("User data for: %v", email), Data: data}

	return c.JSON(200, res)
}
