/**
 * Custom Hook: useDashboardData
 * Manages dashboard data fetching and state
 */

import { useState, useEffect, useCallback } from 'react'
import { fetchWeatherData, fetchForecastData, fetchAirQualityData } from '../services/apiService'

export const useDashboardData = (city) => {
  const [weatherData, setWeatherData] = useState(null)
  const [airQualityData, setAirQualityData] = useState(null)
  const [forecastData, setForecastData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  /**
   * Fetch all dashboard data
   */
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch all data in parallel
      const [weather, forecast, airQuality] = await Promise.all([
        fetchWeatherData(city),
        fetchForecastData(city),
        fetchAirQualityData(city)
      ])

      setWeatherData(weather)
      setForecastData(forecast)
      setAirQualityData(airQuality)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Failed to load data. Using fallback data.')
    } finally {
      setLoading(false)
    }
  }, [city])

  /**
   * Refresh data manually
   */
  const refreshData = useCallback(() => {
    fetchData()
  }, [fetchData])

  // Fetch data when city changes
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    weatherData,
    airQualityData,
    forecastData,
    loading,
    error,
    lastUpdated,
    refreshData
  }
}
