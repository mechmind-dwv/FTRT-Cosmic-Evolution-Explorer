/**
 * FTRT Calculator Service
 * Calculates Planetary Tidal Forces (Fuerzas de Marea Relativas Totales)
 * Core engine for cosmic-biological correlation analysis
 */

import { PLANETS, GRAVITATIONAL_CONSTANT, SUN_RADIUS, FTRT_REFERENCE_FORCE } from '@/utils/constants';
import { dateToJulianDay } from '@/utils/dateHelpers';
import { pearsonCorrelation } from '@/utils/correlations';

/**
 * Calculate tidal force exerted by a planet on the Sun
 * Formula: F_tidal = (2 * G * M_planet * M_sun * R_sun) / d³
 */
export const calculatePlanetaryTidalForce = (planetName, julianDay) => {
  const planet = PLANETS[planetName];
  if (!planet) {
    console.warn(`Planet ${planetName} not found`);
    return 0;
  }
  
  // Calculate orbital position (simplified Kepler orbit)
  const meanAnomaly = (2 * Math.PI * julianDay) / planet.period;
  const eccentricity = 0.05; // Simplified eccentricity
  const distance = planet.semiMajorAxis * (1 + eccentricity * Math.cos(meanAnomaly));
  
  // Tidal force calculation
  const tidalForce = (2 * GRAVITATIONAL_CONSTANT * planet.mass * SUN_RADIUS) / Math.pow(distance, 3);
  
  return tidalForce;
};

/**
 * Calculate total FTRT index for a specific date
 */
export const calculateFTRT = (date) => {
  const julianDay = dateToJulianDay(date);
  
  const forces = {};
  let totalForce = 0;
  
  // Calculate force from each planet
  Object.keys(PLANETS).forEach(planetName => {
    const force = calculatePlanetaryTidalForce(planetName, julianDay);
    forces[planetName] = force;
    totalForce += force;
  });
  
  // Find dominant planet (highest contribution)
  const dominantPlanet = Object.keys(forces).reduce((max, planet) => 
    forces[planet] > forces[max] ? planet : max
  );
  
  // Normalize to 0-1 scale
  const normalizedIndex = Math.min(totalForce / FTRT_REFERENCE_FORCE, 1);
  
  return {
    date: date.toISOString(),
    julianDay,
    totalForce,
    normalizedIndex,
    individualForces: forces,
    dominantPlanet,
    dominantForcePercentage: (forces[dominantPlanet] / totalForce) * 100
  };
};

/**
 * Calculate FTRT time series over a date range
 */
export const calculateFTRTTimeSeries = (startDate, endDate, stepDays = 30) => {
  const series = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    series.push(calculateFTRT(new Date(currentDate)));
    currentDate.setDate(currentDate.getDate() + stepDays);
  }
  
  return series;
};

/**
 * Detect FTRT peaks (potential evolutionary trigger windows)
 */
export const detectFTRTPeaks = (ftrtSeries, threshold = 0.7) => {
  const peaks = [];
  
  for (let i = 1; i < ftrtSeries.length - 1; i++) {
    const current = ftrtSeries[i].normalizedIndex;
    const previous = ftrtSeries[i - 1].normalizedIndex;
    const next = ftrtSeries[i + 1].normalizedIndex;
    
    // Peak detection: current > threshold AND local maximum
    if (current > threshold && current > previous && current > next) {
      peaks.push({
        date: ftrtSeries[i].date,
        julianDay: ftrtSeries[i].julianDay,
        index: current,
        dominantPlanet: ftrtSeries[i].dominantPlanet,
        type: 'ftrt_peak',
        significance: current > 0.85 ? 'extreme' : current > 0.75 ? 'high' : 'moderate'
      });
    }
  }
  
  return peaks;
};

/**
 * Calculate planetary alignment score
 * Higher score = more planets aligned on same side of Sun
 */
export const calculateAlignmentScore = (date) => {
  const julianDay = dateToJulianDay(date);
  const angles = [];
  
  // Calculate angular position of each planet
  Object.keys(PLANETS).forEach(planetName => {
    const planet = PLANETS[planetName];
    const angle = (2 * Math.PI * julianDay / planet.period) % (2 * Math.PI);
    angles.push(angle);
  });
  
  // Calculate mean angle
  const meanAngle = angles.reduce((sum, angle) => sum + angle, 0) / angles.length;
  
  // Calculate angular dispersion (variance)
  const dispersion = angles.reduce((sum, angle) => {
    return sum + Math.pow(angle - meanAngle, 2);
  }, 0) / angles.length;
  
  // Convert dispersion to alignment score (0-1)
  // Lower dispersion = higher alignment
  const alignmentScore = 1 - (Math.sqrt(dispersion) / Math.PI);
  
  return {
    score: Math.max(0, Math.min(1, alignmentScore)),
    meanAngle,
    dispersion,
    interpretation: alignmentScore > 0.7 ? 'High alignment' : 
                    alignmentScore > 0.5 ? 'Moderate alignment' : 'Low alignment'
  };
};

/**
 * Correlate FTRT with solar activity data
 */
export const correlateFTRTWithSolar = (ftrtData, solarData) => {
  const matched = [];
  const windowMs = 30 * 24 * 60 * 60 * 1000; // 30 days
  
  ftrtData.forEach(ftrt => {
    const ftrtDate = new Date(ftrt.date);
    
    // Find matching solar data within time window
    const solar = solarData.find(s => {
      const solarDate = new Date(s.date);
      return Math.abs(solarDate - ftrtDate) < windowMs;
    });
    
    if (solar) {
      matched.push({
        date: ftrt.date,
        ftrt: ftrt.normalizedIndex,
        sunspots: solar.sunspots,
        flux: solar.flux
      });
    }
  });
  
  if (matched.length < 2) {
    return { 
      correlation: 0, 
      confidence: 0, 
      error: 'Insufficient matched data points' 
    };
  }
  
  // Calculate Pearson correlation
  const ftrtValues = matched.map(m => m.ftrt);
  const sunspotValues = matched.map(m => m.sunspots);
  
  const correlation = pearsonCorrelation(ftrtValues, sunspotValues);
  
  return {
    correlation,
    dataPoints: matched.length,
    matched,
    confidence: matched.length / ftrtData.length,
    interpretation: Math.abs(correlation) > 0.7 ? 'Strong correlation' :
                   Math.abs(correlation) > 0.5 ? 'Moderate correlation' :
                   Math.abs(correlation) > 0.3 ? 'Weak correlation' : 'No significant correlation'
  };
};

/**
 * Calculate synodic period between two planets
 * (time between successive alignments)
 */
export const calculateSynodicPeriod = (planet1Name, planet2Name) => {
  const p1 = PLANETS[planet1Name];
  const p2 = PLANETS[planet2Name];
  
  if (!p1 || !p2) return null;
  
  // Synodic period formula: 1/T_synodic = |1/T1 - 1/T2|
  const synodicPeriod = 1 / Math.abs((1 / p1.period) - (1 / p2.period));
  
  return {
    planet1: planet1Name,
    planet2: planet2Name,
    period1: p1.period,
    period2: p2.period,
    synodicPeriod,
    synodicPeriodYears: synodicPeriod / 365.25
  };
};

/**
 * Find next planetary alignment date
 */
export const findNextAlignment = (currentDate, planet1Name, planet2Name, threshold = 0.1) => {
  const synodic = calculateSynodicPeriod(planet1Name, planet2Name);
  if (!synodic) return null;
  
  // Approximate next alignment based on synodic period
  const daysToAlignment = synodic.synodicPeriod;
  const nextAlignment = new Date(currentDate);
  nextAlignment.setDate(nextAlignment.getDate() + daysToAlignment);
  
  return {
    date: nextAlignment,
    planets: [planet1Name, planet2Name],
    daysUntil: daysToAlignment
  };
};

/**
 * Generate comprehensive FTRT report for a time period
 */
export const generateFTRTReport = (startDate, endDate) => {
  const timeSeries = calculateFTRTTimeSeries(startDate, endDate, 30);
  const peaks = detectFTRTPeaks(timeSeries, 0.7);
  
  // Statistical analysis
  const values = timeSeries.map(d => d.normalizedIndex);
  const avgFTRT = values.reduce((sum, val) => sum + val, 0) / values.length;
  const maxFTRT = Math.max(...values);
  const minFTRT = Math.min(...values);
  
  // Dominant planet analysis
  const planetCounts = {};
  timeSeries.forEach(d => {
    planetCounts[d.dominantPlanet] = (planetCounts[d.dominantPlanet] || 0) + 1;
  });
  
  const mostInfluentialPlanet = Object.keys(planetCounts).reduce((a, b) => 
    planetCounts[a] > planetCounts[b] ? a : b
  );
  
  return {
    period: {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      days: Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)),
      dataPoints: timeSeries.length
    },
    statistics: {
      average: avgFTRT,
      maximum: maxFTRT,
      minimum: minFTRT,
      range: maxFTRT - minFTRT,
      peakCount: peaks.length,
      peakFrequency: peaks.length / timeSeries.length
    },
    peaks,
    timeSeries,
    planetaryInfluence: {
      mostInfluential: mostInfluentialPlanet,
      dominancePercentage: (planetCounts[mostInfluentialPlanet] / timeSeries.length) * 100,
      distribution: planetCounts
    },
    interpretation: interpretFTRT(avgFTRT, peaks.length, timeSeries.length)
  };
};

/**
 * Interpret FTRT values for human understanding
 */
const interpretFTRT = (avgFTRT, peakCount, totalPoints) => {
  const peakFrequency = peakCount / totalPoints;
  
  let activity = '';
  if (avgFTRT > 0.8) {
    activity = 'Very high tidal forcing period. Significant potential for solar modulation and evolutionary pressure.';
  } else if (avgFTRT > 0.6) {
    activity = 'Elevated tidal forcing. Moderate influence on solar activity and biological systems likely.';
  } else if (avgFTRT > 0.4) {
    activity = 'Normal tidal forcing levels. Baseline evolutionary conditions expected.';
  } else {
    activity = 'Low tidal forcing. Minimal cosmic influence on biological systems.';
  }
  
  let peaks = '';
  if (peakFrequency > 0.15) {
    peaks = ' Frequent peaks suggest heightened mutagenic windows.';
  } else if (peakFrequency > 0.08) {
    peaks = ' Moderate peak frequency indicates periodic evolutionary pressure.';
  } else {
    peaks = ' Rare peaks suggest stable cosmic conditions.';
  }
  
  return activity + peaks;
};

/**
 * Export all functions
 */
export default {
  calculatePlanetaryTidalForce,
  calculateFTRT,
  calculateFTRTTimeSeries,
  detectFTRTPeaks,
  calculateAlignmentScore,
  correlateFTRTWithSolar,
  calculateSynodicPeriod,
  findNextAlignment,
  generateFTRTReport
};
