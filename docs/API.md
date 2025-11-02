# 🌐 API Integration

This document details the API integration for the Prayer Times Lite application. The application uses two main APIs:

- **Aladhan API**: For fetching prayer times.
- **Nominatim (OpenStreetMap) API**: For geocoding and reverse geocoding.

## 🕌 Aladhan API

The Aladhan API is used to fetch prayer times for a given location.

- **Base URL**: `https://api.aladhan.com/v1`
- **Documentation**: [https://aladhan.com/prayer-times-api](https://aladhan.com/prayer-times-api)

### Endpoints

- **`GET /timingsByCity`**: Fetches prayer times for a specific city and country.
- **`GET /timings`**: Fetches prayer times for a specific latitude and longitude.

## 🗺️ Nominatim API

The Nominatim API is used for geocoding (searching for a location by name) and reverse geocoding (finding a location from coordinates).

- **Base URL**: `https://nominatim.openstreetmap.org`
- **Documentation**: [https://nominatim.org/release-docs/develop/api/Search/](https://nominatim.org/release-docs/develop/api/Search/)

### Endpoints

- **`GET /search`**: Searches for a location by name.
- **`GET /reverse`**: Finds a location from a given latitude and longitude.

## 📁 API Utility Functions

All API calls are handled through the `src/utils/api.js` file.

### `fetchPrayerTimes(city, country)`

Fetches prayer times for a given city and country.

- **`city`** (string): The name of the city.
- **`country`** (string): The name of the country.
- **Returns**: A promise that resolves to an object containing the prayer times.

### `fetchPrayerTimesByCoords(latitude, longitude)`

Fetches prayer times for a given latitude and longitude.

- **`latitude`** (number): The latitude.
- **`longitude`** (number): The longitude.
- **Returns**: A promise that resolves to an object containing the prayer times.

### `searchCities(query)`

Searches for cities using the Nominatim API.

- **`query`** (string): The search query.
- **Returns**: A promise that resolves to an array of location objects.

### `reverseGeocode(latitude, longitude)`

Performs reverse geocoding using the Nominatim API.

- **`latitude`** (number): The latitude.
- **`longitude`** (number): The longitude.
- **Returns**: A promise that resolves to a location object.

## 📥 API Response Formats

### Aladhan API Prayer Times Response

```json
{
  "code": 200,
  "status": "OK",
  "data": {
    "timings": {
      "Fajr": "05:45",
      "Sunrise": "07:07",
      "Dhuhr": "12:52",
      "Asr": "16:29",
      "Maghrib": "18:37",
      "Isha": "19:59"
    },
    ...
  }
}
```

### Nominatim API Search Response

```json
[
  {
    "place_id": 282978650,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    "osm_type": "relation",
    "osm_id": 1276422,
    "lat": "39.92077",
    "lon": "32.85411",
    "display_name": "Ankara, Turkey",
    ...
  }
]
```

## 🔄 Caching Strategy

The application caches prayer times in `localStorage` to reduce the number of API calls and provide offline access.

- **Cache Key**: `prayer_times_${city}_${country}` or `prayer_times_${latitude}_${longitude}`
- **Cache Duration**: 1 day.

## 🛡️ Error Handling

The application includes error handling for API requests. If an API request fails, the application will display an error message to the user.
