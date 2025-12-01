/**
 * Geomagnetic Service
 * Manages geomagnetic field data, Kp index, and cosmic ray correlations
 */

import axios from 'axios';
import { NOAA_BASE_URL, EARTH_MAGNETIC_FIELD_BASELINE } from '@/utils/constants';

/**
 * Fetch current Kp index from NOAA
 */
export const fetchCurrentKpIndex = async () => {
  try {
    const response = await axios.get(
      `${NOAA_BASE_URL}/products/noaa-planetary-k-index.json`
    );
    
    const latest = response.data[response.data.length - 1];
    const kpValue = parseFloat(latest.kp_index);
    
    return {
      timestamp: latest.time_tag,
      kpIndex: kpValue,
      kpIndexInt: Math.round(kpValue),
      scale: getKpScale(kpValue),
      source: 'NOAA SWPC'
    };
  } catch (error) {
    console.error('Error fetching Kp index:', error);
    return null;
  }
};

/**
 * Get geomagnetic storm scale interpretation
 */
export const getKpScale = (kp) => {
  if (kp < 4) {
    return { 
      level: 'Quiet', 
      severity: 'none', 
      color: '#10b981', 
      description: 'Quiet geomagnetic field',
      gScale: 'G0'
    };
  } else if (kp < 5) {
    return { 
      level: 'Unsettled', 
      severity: 'minor', 
      color: '#fbbf24', 
      description: 'Unsettled magnetic field',
      gScale: 'G0'
    };
  } else if (kp < 6) {
    return { 
      level: 'G1 Storm', 
      severity: 'minor', 
      color: '#f59e0b', 
      description: 'Minor geomagnetic storm',
      gScale: 'G1'
    };
  } else if (kp < 7) {
    return { 
      level: 'G2 Storm', 
      severity: 'moderate', 
      color: '#f97316', 
      description: 'Moderate geomagnetic storm',
      gScale: 'G2'
    };
  } else if (kp < 8) {
    return { 
      level: 'G3 Storm', 
      severity: 'strong', 
      color: '#ef4444', 
      description: 'Strong geomagnetic storm',
      gScale: 'G3'
    };
  } else if (kp < 9) {
    return { 
      level: 'G4 Storm', 
      severity: 'severe', 
      color: '#dc2626', 
      description: 'Severe geomagnetic storm',
      gScale: 'G4'
    };
  } else {
    return { 
      level: 'G5 Storm', 
      severity: 'extreme', 
      color: '#991b1b', 
      description: 'Extreme geomagnetic storm',
      gScale: 'G5'
    };
  }
};

/**
 * Simulate geomagnetic data based on solar activity
 */
export const simulateGeomagneticData = (solarData) => {
  return solarData.map((solar, idx) => {
    // Inverse relationship: high solar activity = weaker magnetic field
    const baseField = EARTH_MAGNETIC_FIELD_BASELINE;
    const solarInfluence = solar.sunspots * 10;
    const randomVariation = (Math.random() - 0.5) * 1000;
    const fieldStrength = baseField - solarInfluence + randomVariation;
    
    // Kp index correlates with solar activity
    const kpBase = Math.sin(idx / 10) * 3 + 5;
    const solarModulation = (solar.sunspots / 200) * 2;
    const kpIndex = Math.max(0, Math.min(9, kpBase + solarModulation + (Math.random() - 0.5)));
    
    return {
      date: solar.date,
      year: solar.year,
      month: solar.month,
      fieldStrength: Math.max(30000, fieldStrength), // Minimum realistic value
      kpIndex: parseFloat(kpIndex.toFixed(2)),
      scale: getKpScale(kpIndex),
      timestamp: solar.timestamp
    };
  });
};

/**
 * Calculate percentage of geomagnetic field weakening
 */
export const calculateWeakening = (currentField, baseline = EARTH_MAGNETIC_FIELD_BASELINE) => {
  const weakening = ((baseline - currentField) / baseline) * 100;
  return Math.max(0, weakening);
};

/**
 * Detect geomagnetic reversals in time series
 */
export const detectGeomagneticReversals = (geomagData) => {
  const reversals = [];
  let previousPolarity = 'normal';
  const threshold = 5000; // nT change threshold
  
  geomagData.forEach((point, idx) => {
    if (idx === 0) return;
    
    const fieldChange = Math.abs(point.fieldStrength - geomagData[idx - 1].fieldStrength);
    
    if (fieldChange > threshold) {
      const currentPolarity = point.fieldStrength > 35000 ? 'normal' : 'reversed';
      
      if (currentPolarity !== previousPolarity) {
        reversals.push({
          date: point.date,
          age: calculateAgeFromDate(point.date),
          fromPolarity: previousPolarity,
          toPolarity: currentPolarity,
          fieldStrength: point.fieldStrength,
          significance: fieldChange > 10000 ? 'major' : 'minor'
        });
        previousPolarity = currentPolarity;
      }
    }
  });
  
  return reversals;
};

/**
 * Calculate cosmic ray flux based on geomagnetic field
 * Weaker field = more cosmic rays penetrating
 */
export const calculateCosmicRayFlux = (fieldStrength) => {
  const baseline = EARTH_MAGNETIC_FIELD_BASELINE;
  const weakening = calculateWeakening(fieldStrength, baseline);
  
  // Model: 1% field weakening = 2% cosmic ray increase
  const fluxIncrease = weakening * 2;
  
  let level = 'low';
  if (fluxIncrease >= 50) level = 'extreme';
  else if (fluxIncrease >= 30) level = 'high';
  else if (fluxIncrease >= 10) level = 'moderate';
  
  return {
    fluxIncrease: parseFloat(fluxIncrease.toFixed(2)),
    level,
    mutagenicRisk: Math.min(fluxIncrease / 100, 1), // 0-1 scale
    description: `${fluxIncrease.toFixed(1)}% increase in cosmic ray flux`,
    biologicalImpact: interpretMutagenicRisk(fluxIncrease / 100)
  };
};

/**
 * Interpret mutagenic risk level
 */
const interpretMutagenicRisk = (risk) => {
  if (risk > 0.5) {
    return 'Extreme: Significant increase in mutation rates expected';
  } else if (risk > 0.3) {
    return 'High: Elevated mutation rates likely';
  } else if (risk > 0.1) {
    return 'Moderate: Detectable increase in mutations possible';
  } else {
    return 'Low: Minimal impact on mutation rates';
  }
};

/**
 * Correlate geomagnetic activity with evolutionary events
 */
export const correlateGeomagWithEvolution = (geomagData, evolutionEvents, windowMa = 5) => {
  const correlations = [];
  
  evolutionEvents.forEach(event => {
    const eventAge = event.ageMillionYears;
    
    // Find geomag data within time window
    const nearbyGeomag = geomagData.filter(g => {
      const geomagAge = calculateAgeFromDate(g.date);
      return Math.abs(geomagAge - eventAge) <= windowMa;
    });
    
    if (nearbyGeomag.length > 0) {
      const avgField = nearbyGeomag.reduce((sum, g) => sum + g.fieldStrength, 0) / nearbyGeomag.length;
      const weakening = calculateWeakening(avgField);
      const cosmicRay = calculateCosmicRayFlux(avgField);
      
      correlations.push({
        event: event.name,
        eventType: event.type,
        eventAge,
        avgFieldStrength: avgField,
        weakening,
        cosmicRayFlux: cosmicRay.fluxIncrease,
        mutagenicRisk: cosmicRay.mutagenicRisk,
        dataPoints: nearbyGeomag.length,
        confidence: Math.min(nearbyGeomag.length / 10, 1)
      });
    }
  });
  
  return correlations;
};

/**
 * Get geomagnetic statistics for a dataset
 */
export const getGeomagStatistics = (geomagData) => {
  if (!geomagData || geomagData.length === 0) {
    return { error: 'No data provided' };
  }
  
  const fields = geomagData.map(d => d.fieldStrength);
  const kpValues = geomagData.map(d => d.kpIndex);
  
  const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const std = arr => {
    const avg = mean(arr);
    return Math.sqrt(mean(arr.map(x => Math.pow(x - avg, 2))));
  };
  
  return {
    fieldStrength: {
      mean: mean(fields),
      std: std(fields),
      max: Math.max(...fields),
      min: Math.min(...fields),
      range: Math.max(...fields) - Math.min(...fields),
      weakening: calculateWeakening(mean(fields))
    },
    kpIndex: {
      mean: mean(kpValues),
      std: std(kpValues),
      max: Math.max(...kpValues),
      min: Math.min(...kpValues)
    },
    stormActivity: {
      stormDays: geomagData.filter(d => d.kpIndex >= 5).length,
      quietDays: geomagData.filter(d => d.kpIndex < 4).length,
      stormPercentage: (geomagData.filter(d => d.kpIndex >= 5).length / geomagData.length) * 100
    },
    cosmicRayExposure: {
      averageIncrease: calculateCosmicRayFlux(mean(fields)).fluxIncrease,
      peakIncrease: calculateCosmicRayFlux(Math.min(...fields)).fluxIncrease
    }
  };
};

/**
 * Generate paleomagnetic intensity time series
 */
export const generatePaleomagTimeSeries = (startMa, endMa, intervalMa = 10) => {
  const data = [];
  
  for (let age = startMa; age <= endMa; age += intervalMa) {
    // Simplified paleomag model with periodic reversals
    const reversalCycle = Math.sin(age / 50) * 0.3; // ~50 Ma reversal cycle
    const randomVariation = (Math.random() - 0.5) * 0.2;
    
    const intensity = EARTH_MAGNETIC_FIELD_BASELINE * (1 + reversalCycle + randomVariation);
    const polarity = Math.sin(age / 25) > 0 ? 'normal' : 'reversed';
    
    data.push({
      ageMa: age,
      intensity: Math.max(20000, intensity),
      polarity,
      virtualDipoleStrength: intensity * 1e22, // Am²
      uncertainty: Math.random() * 5000
    });
  }
  
  return data;
};

/**
 * Calculate age from date for geological timescales
 */
const calculateAgeFromDate = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffYears = (now - date) / (1000 * 60 * 60 * 24 * 365.25);
  return diffYears / 1_000_000; // Convert to Ma
};

/**
 * Generate fallback geomagnetic data
 */
export const generateFallbackGeomagData = (points = 100) => {
  const startDate = new Date('2015-01-01');
  return Array.from({ length: points }, (_, i) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    
    const kp = Math.random() * 9;
    const fieldStrength = 48000 + Math.sin(i / 20) * 2000 + Math.random() * 1000;
    
    return {
      date: date.toISOString().split('T')[0],
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      fieldStrength,
      kpIndex: parseFloat(kp.toFixed(2)),
      scale: getKpScale(kp),
      timestamp: date.getTime()
    };
  });
};

export default {
  fetchCurrentKpIndex,
  getKpScale,
  simulateGeomagneticData,
  calculateWeakening,
  detectGeomagneticReversals,
  calculateCosmicRayFlux,
  correlateGeomagWithEvolution,
  getGeomagStatistics,
  generatePaleomagTimeSeries,
  generateFallbackGeomagData
};
