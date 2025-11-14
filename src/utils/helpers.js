/**
 * Utility Helper Functions
 */

/**
 * Format date and time
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export const formatDateTime = (date) => {
  if (!date) return 'N/A'
  
  return new Date(date).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

/**
 * Get AQI CSS class based on level
 * @param {string} level - AQI level
 * @returns {string} Tailwind CSS class
 */
export const getAQIClass = (level) => {
  const classMap = {
    'Good': 'bg-aqi-good',
    'Moderate': 'bg-aqi-moderate',
    'Unhealthy for Sensitive': 'bg-aqi-unhealthySensitive',
    'Unhealthy': 'bg-aqi-unhealthy',
    'Very Unhealthy': 'bg-aqi-veryUnhealthy',
    'Hazardous': 'bg-aqi-hazardous'
  }
  return classMap[level] || 'bg-aqi-moderate'
}

/**
 * Get AQI color based on level
 * @param {string} level - AQI level
 * @returns {string} Color hex code
 */
export const getAQIColor = (level) => {
  const colorMap = {
    'Good': '#10b981',
    'Moderate': '#f59e0b',
    'Unhealthy for Sensitive': '#f97316',
    'Unhealthy': '#ef4444',
    'Very Unhealthy': '#991b1b',
    'Hazardous': '#7f1d1d'
  }
  return colorMap[level] || '#f59e0b'
}

/**
 * Capitalize first letter of string
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
