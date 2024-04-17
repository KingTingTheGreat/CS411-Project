package clients

import (
	"testing"
)

func TestGetCoordinates(t *testing.T) {
	client := NewGoogleMapsClient()
	address := "1600 Amphitheatre Parkway, Mountain View, CA"

	lat, lng, err := client.GetCoordinates(address)
	if err != nil {
		t.Errorf("Error while fetching coordinates: %s", err)
	}

	if lat == 0 || lng == 0 {
		t.Errorf("Received invalid coordinates: lat %f lng %f", lat, lng)
	}

}
