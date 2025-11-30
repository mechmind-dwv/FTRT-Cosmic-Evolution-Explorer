/**
 * Project Constants
 * Physical constants, configuration values, and reference data
 */

// Physical Constants
export const GRAVITATIONAL_CONSTANT = 6.674e-11; // m³ kg⁻¹ s⁻²
export const SUN_MASS = 1.989e30; // kg
export const SUN_RADIUS = 6.96e8; // meters
export const EARTH_MASS = 5.972e24; // kg
export const AU = 1.496e11; // meters (Astronomical Unit)

// Planetary Data
export const PLANETS = {
  mercury: { 
    mass: 3.301e23, 
    semiMajorAxis: 57.91e9, 
    period: 87.97,
    radius: 2.4397e6,
    color: '#8C7853'
  },
  venus: { 
    mass: 4.867e24, 
    semiMajorAxis: 108.2e9, 
    period: 224.7,
    radius: 6.0518e6,
    color: '#FFC649'
  },
  earth: { 
    mass: 5.972e24, 
    semiMajorAxis: 149.6e9, 
    period: 365.25,
    radius: 6.371e6,
    color: '#4A90E2'
  },
  mars: { 
    mass: 6.417e23, 
    semiMajorAxis: 227.9e9, 
    period: 686.98,
    radius: 3.3895e6,
    color: '#E27B58'
  },
  jupiter: { 
    mass: 1.898e27, 
    semiMajorAxis: 778.5e9, 
    period: 4332.59,
    radius: 6.9911e7,
    color: '#C88B3A'
  },
  saturn: { 
    mass: 5.683e26, 
    semiMajorAxis: 1433.5e9, 
    period: 10759.22,
    radius: 5.8232e7,
    color: '#FAD5A5'
  },
  uranus: { 
    mass: 8.681e25, 
    semiMajorAxis: 2872.5e9, 
    period: 30688.5,
    radius: 2.5362e7,
    color: '#4FD0E0'
  },
  neptune: { 
    mass: 1.024e26, 
    semiMajorAxis: 4495.1e9, 
    period: 60182,
    radius: 2.4622e7,
    color: '#4B70DD'
  }
};

// Geomagnetic Constants
export const EARTH_MAGNETIC_FIELD_BASELINE = 50000; // nT (nanoTesla)
export const GEOMAG_WEAKENING_THRESHOLD = 0.3; // 30% weakening considered significant

// Solar Activity Constants
export const SOLAR_CYCLE_AVERAGE_LENGTH = 11; // years
export const SUNSPOT_MAX_HISTORICAL = 300; // approximate maximum
export const F10_7_BASELINE = 120; // SFU (Solar Flux Units)

// FTRT Constants
export const FTRT_REFERENCE_FORCE = 1e15; // Newtons (for normalization)
export const FTRT_PEAK_THRESHOLD = 0.7; // Normalized index threshold for peak detection
export const FTRT_TIME_WINDOW_MA = 10; // Million years window for correlations

// API Endpoints
export const NOAA_BASE_URL = 'https://services.swpc.noaa.gov';
export const NOAA_SOLAR_CYCLE_URL = `${NOAA_BASE_URL}/json/solar-cycle/observed-solar-cycle-indices.json`;
export const NOAA_PLANETARY_K_URL = `${NOAA_BASE_URL}/products/noaa-planetary-k-index.json`;
export const NOAA_XRAY_URL = `${NOAA_BASE_URL}/json/goes/primary/xrays-7-day.json`;

// Evolutionary Event Types
export const EVENT_TYPES = {
  RADIATION: 'radiation',
  EXTINCTION: 'extinction',
  TRANSITION: 'transition'
};

// Significance Levels
export const SIGNIFICANCE_LEVELS = {
  CRITICAL: 'critical',
  MAJOR: 'major',
  MODERATE: 'moderate',
  MINOR: 'minor'
};

// Color Schemes
export const COLORS = {
  cosmic: {
    purple: '#8b5cf6',
    blue: '#3b82f6',
    pink: '#ec4899',
    yellow: '#fbbf24',
    green: '#10b981',
    red: '#ef4444',
    orange: '#f59e0b'
  },
  events: {
    radiation: '#10b981',
    extinction: '#ef4444',
    transition: '#f59e0b'
  },
  significance: {
    critical: '#dc2626',
    major: '#f59e0b',
    moderate: '#3b82f6',
    minor: '#6b7280'
  }
};

// Geological Time Scale (simplified)
export const GEOLOGICAL_PERIODS = [
  { name: 'Cuaternario', start: 0, end: 2.6, color: '#F2F200' },
  { name: 'Neógeno', start: 2.6, end: 23, color: '#FFE619' },
  { name: 'Paleógeno', start: 23, end: 66, color: '#FD9A52' },
  { name: 'Cretácico', start: 66, end: 145, color: '#7FC64E' },
  { name: 'Jurásico', start: 145, end: 201, color: '#34B2C9' },
  { name: 'Triásico', start: 201, end: 252, color: '#812B92' },
  { name: 'Pérmico', start: 252, end: 299, color: '#F04028' },
  { name: 'Carbonífero', start: 299, end: 359, color: '#67A599' },
  { name: 'Devónico', start: 359, end: 419, color: '#CB8C37' },
  { name: 'Silúrico', start: 419, end: 444, color: '#B3E1B6' },
  { name: 'Ordovícico', start: 444, end: 485, color: '#009270' },
  { name: 'Cámbrico', start: 485, end: 541, color: '#7FA056' }
];

// Statistical Thresholds
export const CORRELATION_THRESHOLDS = {
  STRONG: 0.7,
  MODERATE: 0.5,
  WEAK: 0.3
};

export const P_VALUE_THRESHOLDS = {
  HIGHLY_SIGNIFICANT: 0.01,
  SIGNIFICANT: 0.05,
  MARGINALLY_SIGNIFICANT: 0.1
};

// Chart Configuration
export const CHART_DEFAULTS = {
  lineWidth: 2,
  pointRadius: 4,
  animationDuration: 1000,
  tooltipDelay: 200
};

// Project Metadata
export const PROJECT_INFO = {
  name: 'FTRT Cosmic Evolution Explorer',
  version: '1.0.0',
  description: 'Exploring correlations between cosmic forces and biological evolution',
  repository: 'https://github.com/mechmind-dwv/FTRT-Cosmic-Evolution-Explorer',
  license: 'MIT',
  authors: ['MECHMIND-DWV'],
  contact: 'contact@mechmind.space'
};

export default {
  GRAVITATIONAL_CONSTANT,
  SUN_MASS,
  SUN_RADIUS,
  PLANETS,
  EARTH_MAGNETIC_FIELD_BASELINE,
  SOLAR_CYCLE_AVERAGE_LENGTH,
  FTRT_REFERENCE_FORCE,
  NOAA_BASE_URL,
  EVENT_TYPES,
  SIGNIFICANCE_LEVELS,
  COLORS,
  GEOLOGICAL_PERIODS,
  CORRELATION_THRESHOLDS,
  PROJECT_INFO
};
