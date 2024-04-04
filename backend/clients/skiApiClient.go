package clients

import (
	"backend/configs"
	"io"
	"net/http"
)

type SkiResortClient struct {
	APIKey string
	Host   string
}

func NewSkiResortClient() *SkiResortClient {
	return &SkiResortClient{
		APIKey: configs.EnvRapidAPIKey(),
		Host:   configs.EnvRapidAPIHost(),
	}
}

func (client *SkiResortClient) GetResorts() (string, error) {
	req, _ := http.NewRequest("GET", "https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort", nil)

	req.Header.Add("X-RapidAPI-Key", client.APIKey)
	req.Header.Add("X-RapidAPI-Host", client.Host)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	return string(body), nil
}
