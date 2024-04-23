package models

type User struct {
	ID        string   `json:"id" bson:"_id"`
	Email     string   `json:"email" bson:"email"`
	Favorites []string `json:"favorites" bson:"favorites"`
}
