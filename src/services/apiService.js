/**
 * API Service
 * Handles all API calls to OpenWeatherMap and AQICN
 * Includes error handling and fallback to mock data
 */

import axios from 'axios'
import { MOCK_DATA } from '../utils/mockData'

// API Configuration
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const AQICN_API_KEY = import.meta.env.VITE_AQICN_API_KEY
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'
const AQICN_BASE_URL = 'https://api.waqi.info'
const API_TIMEOUT = 10000

/**
 * Fetch current weather data for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data
 */
export const fetchWeatherData = async (city) => {
  try {
    // Check if API key is configured
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_openweather_api_key_here') {
      console.warn('OpenWeatherMap API key not configured, using mock data')
      return MOCK_DATA.weather
    }

    const url = `${OPENWEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`
    
    const response = await axios.get(url, { timeout: API_TIMEOUT })
    const data = response.data
    
    return {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].description,
      pressure: data.main.pressure,
      visibility: (data.visibility / 1000).toFixed(1),
      clouds: data.clouds.all,
      icon: data.weather[0].icon
    }
  } catch (error) {
    console.error('Error fetching weather data:', error.message)
    return MOCK_DATA.weather
  }
}

/**
 * Fetch weather forecast data
 * @param {string} city - City name
 * @returns {Promise<Array>} Forecast data
 */
export const fetchForecastData = async (city) => {
  try {
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_openweather_api_key_here') {
      return MOCK_DATA.forecast
    }

    const url = `${OPENWEATHER_BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`
    
    const response = await axios.get(url, { timeout: API_TIMEOUT })
    const data = response.data
    
    // Extract next 8 data points (24 hours, 3-hour intervals)
    return data.list.slice(0, 8).map(item => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      temp: Math.round(item.main.temp)
    }))
  } catch (error) {
    console.error('Error fetching forecast data:', error.message)
    return MOCK_DATA.forecast
  }
}

/**
 * Fetch air quality data for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Air quality data
 */
export const fetchAirQualityData = async (city) => {
  try {
    if (!AQICN_API_KEY || AQICN_API_KEY === 'your_aqicn_api_key_here') {
      console.warn('AQICN API key not configured, using mock data')
      return MOCK_DATA.airQuality
    }

    const url = `${AQICN_BASE_URL}/feed/${encodeURIComponent(city)}/?token=${AQICN_API_KEY}`
    
    const response = await axios.get(url, { timeout: API_TIMEOUT })
    const data = response.data
    
    if (data.status !== 'ok') {
      throw new Error('Air Quality API returned error status')
    }
    
    const aqi = data.data.aqi
    const iaqi = data.data.iaqi || {}
    
    return {
      aqi: aqi,
      level: getAQILevel(aqi),
      pm25: iaqi.pm25?.v || 'N/A',
      pm10: iaqi.pm10?.v || 'N/A',
      no2: iaqi.no2?.v || 'N/A',
      o3: iaqi.o3?.v || 'N/A',
      so2: iaqi.so2?.v || 'N/A',
      co: iaqi.co?.v || 'N/A'
    }
  } catch (error) {
    console.error('Error fetching air quality data:', error.message)
    return MOCK_DATA.airQuality
  }
}

/**
 * Determine AQI level based on value
 * @param {number} aqi - AQI value
 * @returns {string} AQI level description
 */
const getAQILevel = (aqi) => {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 150) return 'Unhealthy for Sensitive'
  if (aqi <= 200) return 'Unhealthy'
  if (aqi <= 300) return 'Very Unhealthy'
  return 'Hazardous'
}
