package shared

import (
	"backend/clients"
	"encoding/json"
	"log"
)

type Location struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type Resort struct {
	Slug     string   `json:"slug"`
	Name     string   `json:"name"`
	Country  string   `json:"country"`
	Region   string   `json:"region"`
	Location Location `json:"location"` // Ensure Location is properly nested
	URL      string   `json:"url"`
}

var AllResorts []Resort

func InitResorts() {
	client := clients.NewSkiResortClient()
	for page := 1; page <= 6; page++ {
		jsonResponse, err := client.GetResorts(page)
		if err != nil {
			log.Println("Error fetching resorts for page", page, ":", err)
			continue
		}

		var pageResult struct {
			Data []Resort `json:"data"`
		}
		err = json.Unmarshal([]byte(jsonResponse), &pageResult)
		if err != nil {
			log.Println("Error unmarshalling JSON for page", page, ":", err)
			continue
		}

		AllResorts = append(AllResorts, pageResult.Data...)
	}
	log.Println("Initialized AllResorts")
}
