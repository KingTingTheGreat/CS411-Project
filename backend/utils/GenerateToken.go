package utils 

import (
	"github.com/golang-jwt/jwt"
)

func GenerateToken() string {
	// Create a new token object
	token := jwt.New(jwt.SigningMethodHS256)

	// Sign the token with a secret key
	tokenString, _ := token.SignedString([]byte(JWT_SECRET))
	return tokenString
}
