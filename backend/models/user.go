package models

type User struct {
	ID        string   `json:"id" bson:"_id"`
	Username  string   `json:"username" bson:"username"`
	FirstName string   `json:"firstname" bson:"firstname"`
	LastName  string   `json:"lastname" bson:"lastname"`
	Favorites []string `json:"favorites" bson:"favorites"`
}
