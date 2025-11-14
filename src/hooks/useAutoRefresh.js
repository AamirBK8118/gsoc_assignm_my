/**
 * Custom Hook: useAutoRefresh
 * Handles automatic data refresh at specified intervals
 */

import { useEffect, useRef } from 'react'

const AUTO_REFRESH_INTERVAL = parseInt(import.meta.env.VITE_AUTO_REFRESH_INTERVAL) || 60000

export const useAutoRefresh = (callback, enabled) => {
  const intervalRef = useRef(null)

  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Start new interval if enabled
    if (enabled) {
      console.log('🔄 Auto-refresh enabled')
      intervalRef.current = setInterval(() => {
        console.log('🔄 Auto-refreshing data...')
        callback()
      }, AUTO_REFRESH_INTERVAL)
    } else {
      console.log('⏸️ Auto-refresh disabled')
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [callback, enabled])
}
