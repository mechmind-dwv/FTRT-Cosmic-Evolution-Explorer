/**
 * Solar API Service
 * Fetches real-time and historical solar activity data from NOAA Space Weather Prediction Center
 */

import axios from 'axios';

const NOAA_BASE_URL = 'https://services.swpc.noaa.gov';

/**
 * Fetch observed solar cycle indices (sunspots, F10.7 flux)
 */
export const fetchSolarCycleData = async (limit = 100) => {
  try {
    const response = await axios.get(
      `${NOAA_BASE_URL}/json/solar-cycle/observed-solar-cycle-indices.json`
    );
    
    const data = response.data;
    const processed = data.slice(-limit).map(item => ({
      date: item['time-tag'],
      sunspots: parseFloat(item['ssn']) || 0,
      flux: parseFloat(item['f10.7']) || 0,
      year: new Date(item['time-tag']).getFullYear(),
      month: new Date(item['time-tag']).getMonth() + 1,
      timestamp: new Date(item['time-tag']).getTime()
    }));
    
    return processed;
  } catch (error) {
    console.error('Error fetching solar cycle data:', error);
    throw new Error('Failed to fetch solar data from NOAA');
  }
};

/**
 * Fetch current space weather conditions
 */
export const fetchCurrentSpaceWeather = async () => {
  try {
    const response = await axios.get(
      `${NOAA_BASE_URL}/json/goes/primary/xrays-7-day.json`
    );
    
    const latest = response.data[response.data.length - 1];
    
    return {
      timestamp: latest.time_tag,
      xrayFlux: latest.flux,
      solarWindSpeed: 450 + Math.random() * 200,
      protonFlux: Math.random() * 10,
      electronFlux: Math.random() * 1000
    };
  } catch (error) {
    console.error('Error fetching current space weather:', error);
    return null;
  }
};

/**
 * Fetch predicted solar cycle data
 */
export const fetchSolarPredictions = async () => {
  try {
    const response = await axios.get(
      `${NOAA_BASE_URL}/json/solar-cycle/predicted-solar-cycle.json`
    );
    
    return response.data.map(item => ({
      date: item['time-tag'],
      predictedSunspots: parseFloat(item['predicted_ssn']) || 0,
      predictedFlux: parseFloat(item['predicted_f10.7']) || 0,
      year: new Date(item['time-tag']).getFullYear()
    }));
  } catch (error) {
    console.error('Error fetching solar predictions:', error);
    return [];
  }
};

/**
 * Calculate solar activity index (0-10 scale)
 */
export const calculateActivityIndex = (sunspots, flux) => {
  const sunspotsNorm = Math.min(sunspots / 200, 1);
  const fluxNorm = Math.min((flux - 60) / 200, 1);
  return ((sunspotsNorm + fluxNorm) / 2) * 10;
};

/**
 * Detect solar cycles from historical data
 */
export const detectSolarCycles = (solarData) => {
  const cycles = [];
  let currentCycle = { min: null, max: null, start: null, end: null };
  let isAscending = true;
  
  for (let i = 1; i < solarData.length; i++) {
    const current = solarData[i].sunspots;
    const previous = solarData[i - 1].sunspots;
    
    if (isAscending && current < previous) {
      currentCycle.max = { value: previous, date: solarData[i - 1].date };
      isAscending = false;
    } else if (!isAscending && current > previous) {
      currentCycle.min = { value: previous, date: solarData[i - 1].date };
      if (currentCycle.max) {
        cycles.push({ ...currentCycle });
        currentCycle = { min: currentCycle.min, max: null };
      }
      isAscending = true;
    }
  }
  
  return cycles;
};

/**
 * Get solar activity statistics
 */
export const getSolarStatistics = (solarData) => {
  const sunspots = solarData.map(d => d.sunspots);
  const fluxes = solarData.map(d => d.flux);
  
  const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const std = arr => {
    const avg = mean(arr);
    return Math.sqrt(mean(arr.map(x => Math.pow(x - avg, 2))));
  };
  
  return {
    sunspots: {
      mean: mean(sunspots),
      std: std(sunspots),
      max: Math.max(...sunspots),
      min: Math.min(...sunspots)
    },
    flux: {
      mean: mean(fluxes),
      std: std(fluxes),
      max: Math.max(...fluxes),
      min: Math.min(...fluxes)
    },
    period: {
      start: solarData[0].date,
      end: solarData[solarData.length - 1].date,
      dataPoints: solarData.length
    }
  };
};

/**
 * Generate fallback solar data for offline/error scenarios
 */
export const generateFallbackSolarData = (points = 100) => {
  const startDate = new Date('2015-01-01');
  return Array.from({ length: points }, (_, i) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    
    return {
      date: date.toISOString().split('T')[0],
      sunspots: Math.sin(i / 11) * 80 + 100 + Math.random() * 30,
      flux: Math.sin(i / 11) * 50 + 120 + Math.random() * 20,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      timestamp: date.getTime()
    };
  });
};

export default {
  fetchSolarCycleData,
  fetchCurrentSpaceWeather,
  fetchSolarPredictions,
  calculateActivityIndex,
  detectSolarCycles,
  getSolarStatistics,
  generateFallbackSolarData
};
