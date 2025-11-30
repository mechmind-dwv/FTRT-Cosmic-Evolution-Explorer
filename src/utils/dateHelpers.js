/**
 * Date Helper Functions
 * Utilities for handling geological timescales and conversions
 */

/**
 * Convert date to Julian Day Number
 * @param {Date} date - JavaScript Date object
 * @returns {number} Julian Day Number
 */
export const dateToJulianDay = (date) => {
  const a = Math.floor((14 - (date.getMonth() + 1)) / 12);
  const y = date.getFullYear() + 4800 - a;
  const m = (date.getMonth() + 1) + 12 * a - 3;
  
  const jdn = date.getDate() + 
    Math.floor((153 * m + 2) / 5) + 
    365 * y + 
    Math.floor(y / 4) - 
    Math.floor(y / 100) + 
    Math.floor(y / 400) - 
    32045;
  
  return jdn;
};

/**
 * Convert Julian Day to Date
 * @param {number} jd - Julian Day Number
 * @returns {Date} JavaScript Date object
 */
export const julianDayToDate = (jd) => {
  const a = jd + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);
  
  return new Date(year, month - 1, day);
};

/**
 * Calculate age in millions of years from date
 * @param {Date|string} date - Date or date string
 * @returns {number} Age in Ma (millions of years)
 */
export const calculateAge = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now - dateObj;
  const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  return diffYears / 1_000_000;
};

/**
 * Format geological age for display
 * @param {number} ageInMa - Age in millions of years
 * @returns {string} Formatted age string
 */
export const formatGeologicalAge = (ageInMa) => {
  if (ageInMa < 0.001) {
    return `${(ageInMa * 1000).toFixed(1)} ka`; // thousands of years
  } else if (ageInMa < 1) {
    return `${ageInMa.toFixed(3)} Ma`;
  } else {
    return `${ageInMa.toFixed(1)} Ma`;
  }
};

/**
 * Get geological period for a given age
 * @param {number} ageInMa - Age in millions of years
 * @returns {Object|null} Period information
 */
export const getGeologicalPeriod = (ageInMa) => {
  const periods = [
    { name: 'Cuaternario', start: 0, end: 2.6 },
    { name: 'Neógeno', start: 2.6, end: 23 },
    { name: 'Paleógeno', start: 23, end: 66 },
    { name: 'Cretácico', start: 66, end: 145 },
    { name: 'Jurásico', start: 145, end: 201 },
    { name: 'Triásico', start: 201, end: 252 },
    { name: 'Pérmico', start: 252, end: 299 },
    { name: 'Carbonífero', start: 299, end: 359 },
    { name: 'Devónico', start: 359, end: 419 },
    { name: 'Silúrico', start: 419, end: 444 },
    { name: 'Ordovícico', start: 444, end: 485 },
    { name: 'Cámbrico', start: 485, end: 541 }
  ];
  
  return periods.find(p => ageInMa >= p.start && ageInMa < p.end) || null;
};

/**
 * Calculate time difference between two dates in various units
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {Object} Time differences in multiple units
 */
export const timeDifference = (date1, date2) => {
  const diffMs = Math.abs(date2 - date1);
  
  return {
    milliseconds: diffMs,
    seconds: diffMs / 1000,
    minutes: diffMs / (1000 * 60),
    hours: diffMs / (1000 * 60 * 60),
    days: diffMs / (1000 * 60 * 60 * 24),
    years: diffMs / (1000 * 60 * 60 * 24 * 365.25),
    millionYears: diffMs / (1000 * 60 * 60 * 24 * 365.25 * 1_000_000)
  };
};

/**
 * Create date range array
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @param {number} stepDays - Days between each date
 * @returns {Array} Array of dates
 */
export const createDateRange = (startDate, endDate, stepDays = 1) => {
  const dates = [];
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + stepDays);
  }
  
  return dates;
};

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'iso')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('es-ES');
    case 'long':
      return dateObj.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    case 'iso':
      return dateObj.toISOString().split('T')[0];
    default:
      return dateObj.toString();
  }
};

/**
 * Check if two dates are in the same geological period
 * @param {number} age1 - First age in Ma
 * @param {number} age2 - Second age in Ma
 * @returns {boolean} True if same period
 */
export const isSamePeriod = (age1, age2) => {
  const period1 = getGeologicalPeriod(age1);
  const period2 = getGeologicalPeriod(age2);
  return period1 && period2 && period1.name === period2.name;
};

export default {
  dateToJulianDay,
  julianDayToDate,
  calculateAge,
  formatGeologicalAge,
  getGeologicalPeriod,
  timeDifference,
  createDateRange,
  formatDate,
  isSamePeriod
};
