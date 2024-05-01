# CS411 Project
# Overview

The Mountain Resort Finder is a user-friendly web application designed to help users discover and explore mountain resorts around the world. Leveraging Google OAuth 2.0 for secure authentication, the app provides detailed, up-to-date information about mountain conditions, including snow levels, ski lift status, and weather forecasts. Users can search for mountains within specific radii and favorite resorts for easy access.

# Features

Secure Authentication

Google OAuth 2.0: Ensures a secure login process, allowing users to sign in with their Google accounts.


# Dynamic Search

Global Search: Users can search for mountains globally by entering a location and selecting a search radius (50, 100, 200, 300 km).

Sort Algorithm: Results are sorted by the percentage of ski lifts open and the amount of snow.



# Detailed Information

Resort Overview: Displays a list of mountains with key information such as current weather and the number of lifts open.

Expandable Details: Users can click on any mountain to view detailed drop-downs about current conditions and lift status.

Weather Forecast: A detailed 14-day weather forecast for each mountain is accessible via a drop-down menu.



# Interactive Map

Location Mapping: An interactive map pinpointing the exact location of each mountain resort.



# User Preferences

Favorites: Users can favorite mountains for quick access on future visits.

Profile Page: A dedicated page where users can view and manage their favorite mountains.



# Technologies Used

Frontend: Vite using TypeScript and React

Backend: Echo using Go

Database: MongoDB

APIs: Google OAuth 2.0, FreeWeather API (WeatherAPI.com), Google Maps API, SkiAPI (from RapidAPI)
