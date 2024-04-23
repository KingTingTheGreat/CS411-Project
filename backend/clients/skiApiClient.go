package clients

import (
	"backend/configs"
	"fmt"
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

func (client *SkiResortClient) GetResorts(page int) (string, error) {
	url := fmt.Sprintf("https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort?page=%d", page)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return "", err
	}

	req.Header.Add("X-RapidAPI-Key", client.APIKey)
	req.Header.Add("X-RapidAPI-Host", client.Host)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}

func (client *SkiResortClient) GetResortDetails(slug string) (string, error) {
	url := fmt.Sprintf("https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort/%s", slug)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return "", err
	}

	req.Header.Add("X-RapidAPI-Key", client.APIKey)
	req.Header.Add("X-RapidAPI-Host", client.Host)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}
