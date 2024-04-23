package clients

import (
	"backend/configs"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
)

type GoogleMapsClient struct {
	APIKey string
}

func NewGoogleMapsClient() *GoogleMapsClient {
	return &GoogleMapsClient{
		APIKey: configs.EnvGoogleMapsAPIKey(),
	}
}

func (client *GoogleMapsClient) GetCoordinates(address string) (float64, float64, error) {
	baseURL := "https://maps.googleapis.com/maps/api/geocode/json"
	requestURL := fmt.Sprintf("%s?address=%s&key=%s", baseURL, url.QueryEscape(address), client.APIKey)

	resp, err := http.Get(requestURL)
	if err != nil {
		return 0, 0, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return 0, 0, err
	}

	var result map[string]interface{}
	json.Unmarshal(body, &result)

	if result["status"] != "OK" {
		return 0, 0, fmt.Errorf("error retrieving data: %s", result["status"])
	}

	location := result["results"].([]interface{})[0].(map[string]interface{})["geometry"].(map[string]interface{})["location"].(map[string]interface{})
	lat := location["lat"].(float64)
	lng := location["lng"].(float64)

	return lat, lng, nil
}
