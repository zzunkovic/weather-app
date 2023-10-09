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
On the home page the user can enter a location which he wants to check the weather forecast for. The search button is only available when the
user selects one of the valid locations that are provided from the API. Each time the user types, a fetch request is sent to the API that then returns
an array of cities that could potentialy be of users interest. If the city is valid, the user gets taken to the forecast page. 
Additionally, users have the option to set a primary location. This primary location will be displayed instead of the homepage whenever the user revisits the page. The information about the primary location is stored in local storage, ensuring it's readily available for future visits.

### Forecast Page
When you visit the forecast page, the system retrieves weather data from the API by providing the longitude and latitude coordinates of the selected location. The API responds with an array of forecasts, including both hourly and daily predictions. Additionally, it provides information about the current weather conditions, which are displayed on the page.
Depending on the current weather conditions, appropriate images are shown on the screen. This includes setting the background image for the current weather and displaying icons for the hourly and daily forecast cards to match the weather conditions.
On each page, there's an option to set a primary location. However, if the primary location you've chosen matches the location currently displayed on the forecast page, this option will not be available. This feature allows you to easily switch between primary locations when needed.


### Search Page
This page is used for searching locations, much like on the home page with the difference that the button for settting up the primary location is not available.
