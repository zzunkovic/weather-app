# Weatherboard: a Weather App

Weatherboard is weather application that displays the weather forecast for a queried location.

## Technologies used

- HTML
- CSS
- Typescript
- ReactJS
- Tailwind

## Features

- Searching for locations and displaying their forecast data from a 3rd party API (Open-Meteo: https://open-meteo.com/ )
- Setting the primary location which then displays when the user returns to the app
- Search bar suggestions

## Pages

### Home Page
On the welcome screen the user can enter a location which he wants to check the weather forecast for. The search button is only available when the
user selects one of the valid locations that are provided from the API. Each time the user types, a fetch request is sent to the API that then returns
an array of cities that could potentialy be of users interest. If the city is valid, the user gets taken to the forecast page.

### Forecast Page

