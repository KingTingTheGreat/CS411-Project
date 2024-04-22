package controllers

import (
	"backend/models"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/net/context"
)

func CreateUser(email string) bool {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	fmt.Println("CreateUser controller")

	var user models.User
	// check if user exists
	err := userCollection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		// user does not exist, create user
		_, err := userCollection.InsertOne(ctx, bson.M{"email": email, "favorites": []string{}})
		if err != nil {
			fmt.Println("Error creating user: ", err)
			return false
		}
		return true
	}

	// user already exists
	fmt.Println("User already exists")
	return false
}
