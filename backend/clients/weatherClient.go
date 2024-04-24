package clients

import (
	"backend/configs"
	"encoding/json"
	"fmt"
	"log"
	"net/http" // Make sure this path matches your project structure
)

type WeatherClient struct {
	apiKey  string
	baseURL string
}

func NewWeatherClient() *WeatherClient {
	apiKey := configs.WeatherAPIKey()
	return &WeatherClient{
		apiKey:  apiKey,
		baseURL: "http://api.weatherapi.com/v1/forecast.json",
	}
}

func (wc *WeatherClient) FetchWeather(lat, lon float64, days int) (*WeatherForecast, error) {
	url := fmt.Sprintf("%s?key=%s&q=%f,%f&days=%d", wc.baseURL, wc.apiKey, lat, lon, days)
	response, err := http.Get(url)
	if err != nil {
		log.Printf("Error fetching weather data: %s\n", err)
		return nil, err
	}
	defer response.Body.Close()

	var forecast WeatherForecast
	if err := json.NewDecoder(response.Body).Decode(&forecast); err != nil {
		log.Printf("Error decoding weather data: %s\n", err)
		return nil, err
	}

	return &forecast, nil
}

type WeatherForecast struct {
	Current  Current  `json:"current"`
	Forecast Forecast `json:"forecast"`
}

type Current struct {
	LastUpdated string    `json:"last_updated"`
	TempF       float64   `json:"temp_f"`
	IsDay       int       `json:"is_day"`
	Condition   Condition `json:"condition"`
	WindMph     float64   `json:"wind_mph"`
	Humidity    int       `json:"humidity"`
	PrecipIn    float64   `json:"precip_in"`
	Cloud       int       `json:"cloud"`
	FeelsLikeF  float64   `json:"feelslike_f"`
}

type Forecast struct {
	ForecastDay []ForecastDay `json:"forecastday"`
}

type ForecastDay struct {
	Date string `json:"date"`
	Day  Day    `json:"day"`
}

type Day struct {
	MaxTempF          float64   `json:"maxtemp_f"`
	MinTempF          float64   `json:"mintemp_f"`
	AvgTempF          float64   `json:"avgtemp_f"`
	MaxWindMph        float64   `json:"maxwind_mph"`
	TotalPrecipIn     float64   `json:"totalprecip_in"`
	TotalSnowCm       float64   `json:"totalsnow_cm"`
	DailyChanceOfRain int       `json:"daily_chance_of_rain"`
	DailyChanceOfSnow int       `json:"daily_chance_of_snow"`
	Condition         Condition `json:"condition"`
	Uv                float64   `json:"uv"`
}

type Condition struct {
	Text string `json:"text"`
	Icon string `json:"icon"`
	Code int    `json:"code"`
}
