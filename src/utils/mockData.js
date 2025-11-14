/**
 * Mock Data for Fallback
 * Used when API calls fail or API keys are not configured
 */

export const MOCK_DATA = {
  weather: {
    temperature: 18,
    humidity: 65,
    windSpeed: 4.5,
    condition: 'partly cloudy',
    pressure: 1013,
    visibility: 10,
    clouds: 40
  },
  
  forecast: [
    { time: '00:00', temp: 15 },
    { time: '03:00', temp: 14 },
    { time: '06:00', temp: 13 },
    { time: '09:00', temp: 16 },
    { time: '12:00', temp: 20 },
    { time: '15:00', temp: 22 },
    { time: '18:00', temp: 19 },
    { time: '21:00', temp: 17 }
  ],
  
  airQuality: {
    aqi: 45,
    level: 'Good',
    pm25: 12,
    pm10: 25,
    no2: 15,
    o3: 35,
    so2: 8,
    co: 0.3
  }
}
