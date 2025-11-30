/**
 * Statistical Utility Functions
 * Common statistical operations for data analysis
 */

/**
 * Calculate mean (average) of an array
 * @param {Array<number>} data - Numeric array
 * @returns {number} Mean value
 */
export const mean = (data) => {
  if (!data || data.length === 0) return 0;
  return data.reduce((sum, val) => sum + val, 0) / data.length;
};

/**
 * Calculate median
 * @param {Array<number>} data - Numeric array
 * @returns {number} Median value
 */
export const median = (data) => {
  if (!data || data.length === 0) return 0;
  const sorted = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 
    ? (sorted[mid - 1] + sorted[mid]) / 2 
    : sorted[mid];
};

/**
 * Calculate mode (most frequent value)
 * @param {Array<number>} data - Numeric array
 * @returns {number} Mode value
 */
export const mode = (data) => {
  if (!data || data.length === 0) return 0;
  const frequency = {};
  let maxFreq = 0;
  let modeValue = data[0];
  
  data.forEach(val => {
    frequency[val] = (frequency[val] || 0) + 1;
    if (frequency[val] > maxFreq) {
      maxFreq = frequency[val];
      modeValue = val;
    }
  });
  
  return modeValue;
};

/**
 * Calculate standard deviation
 * @param {Array<number>} data - Numeric array
 * @param {boolean} sample - Use sample std (default: true)
 * @returns {number} Standard deviation
 */
export const standardDeviation = (data, sample = true) => {
  if (!data || data.length === 0) return 0;
  const avg = mean(data);
  const squareDiffs = data.map(val => Math.pow(val - avg, 2));
  const divisor = sample ? data.length - 1 : data.length;
  return Math.sqrt(mean(squareDiffs) * (data.length / divisor));
};

/**
 * Calculate variance
 * @param {Array<number>} data - Numeric array
 * @param {boolean} sample - Use sample variance (default: true)
 * @returns {number} Variance
 */
export const variance = (data, sample = true) => {
  return Math.pow(standardDeviation(data, sample), 2);
};

/**
 * Calculate coefficient of variation (CV)
 * @param {Array<number>} data - Numeric array
 * @returns {number} CV as percentage
 */
export const coefficientOfVariation = (data) => {
  const avg = mean(data);
  if (avg === 0) return 0;
  return (standardDeviation(data) / avg) * 100;
};

/**
 * Calculate Z-scores
 * @param {Array<number>} data - Numeric array
 * @returns {Array<number>} Z-scores
 */
export const zScores = (data) => {
  const avg = mean(data);
  const std = standardDeviation(data);
  if (std === 0) return data.map(() => 0);
  return data.map(val => (val - avg) / std);
};

/**
 * Normalize data to 0-1 range
 * @param {Array<number>} data - Numeric array
 * @returns {Array<number>} Normalized data
 */
export const normalize = (data) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  if (range === 0) return data.map(() => 0.5);
  return data.map(val => (val - min) / range);
};

/**
 * Calculate percentile
 * @param {Array<number>} data - Numeric array
 * @param {number} percentile - Percentile to calculate (0-100)
 * @returns {number} Percentile value
 */
export const percentile = (data, percentile) => {
  if (!data || data.length === 0) return 0;
  const sorted = [...data].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
};

/**
 * Calculate quartiles
 * @param {Array<number>} data - Numeric array
 * @returns {Object} Q1, Q2 (median), Q3
 */
export const quartiles = (data) => {
  return {
    Q1: percentile(data, 25),
    Q2: percentile(data, 50),
    Q3: percentile(data, 75)
  };
};

/**
 * Calculate interquartile range (IQR)
 * @param {Array<number>} data - Numeric array
 * @returns {number} IQR value
 */
export const iqr = (data) => {
  const q = quartiles(data);
  return q.Q3 - q.Q1;
};

/**
 * Detect outliers using IQR method
 * @param {Array<number>} data - Numeric array
 * @param {number} multiplier - IQR multiplier (default: 1.5)
 * @returns {Array<number>} Indices of outliers
 */
export const detectOutliers = (data, multiplier = 1.5) => {
  const q = quartiles(data);
  const iqrValue = iqr(data);
  const lowerBound = q.Q1 - multiplier * iqrValue;
  const upperBound = q.Q3 + multiplier * iqrValue;
  
  return data
    .map((val, idx) => (val < lowerBound || val > upperBound) ? idx : null)
    .filter(idx => idx !== null);
};

/**
 * Calculate skewness (measure of asymmetry)
 * @param {Array<number>} data - Numeric array
 * @returns {number} Skewness value
 */
export const skewness = (data) => {
  if (!data || data.length === 0) return 0;
  const avg = mean(data);
  const std = standardDeviation(data);
  const n = data.length;
  
  if (std === 0) return 0;
  
  const sum = data.reduce((acc, val) => 
    acc + Math.pow((val - avg) / std, 3), 0
  );
  
  return (n / ((n - 1) * (n - 2))) * sum;
};

/**
 * Calculate kurtosis (measure of tailedness)
 * @param {Array<number>} data - Numeric array
 * @returns {number} Kurtosis value
 */
export const kurtosis = (data) => {
  if (!data || data.length === 0) return 0;
  const avg = mean(data);
  const std = standardDeviation(data);
  const n = data.length;
  
  if (std === 0) return 0;
  
  const sum = data.reduce((acc, val) => 
    acc + Math.pow((val - avg) / std, 4), 0
  );
  
  return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sum - 
         (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
};

/**
 * Calculate confidence interval
 * @param {Array<number>} data - Numeric array
 * @param {number} confidence - Confidence level (0-1, default: 0.95)
 * @returns {Object} {lower, upper, margin}
 */
export const confidenceInterval = (data, confidence = 0.95) => {
  const avg = mean(data);
  const std = standardDeviation(data);
  const n = data.length;
  
  // Z-score for confidence level (approximation)
  const zScores = {
    0.90: 1.645,
    0.95: 1.960,
    0.99: 2.576
  };
  const z = zScores[confidence] || 1.960;
  
  const margin = z * (std / Math.sqrt(n));
  
  return {
    lower: avg - margin,
    upper: avg + margin,
    margin,
    mean: avg
  };
};

/**
 * Perform t-test (one-sample)
 * @param {Array<number>} data - Sample data
 * @param {number} populationMean - Population mean to test against
 * @returns {Object} T-test results
 */
export const tTest = (data, populationMean) => {
  const sampleMean = mean(data);
  const sampleStd = standardDeviation(data);
  const n = data.length;
  
  const tStatistic = (sampleMean - populationMean) / (sampleStd / Math.sqrt(n));
  const degreesOfFreedom = n - 1;
  
  return {
    tStatistic,
    degreesOfFreedom,
    sampleMean,
    populationMean,
    significant: Math.abs(tStatistic) > 2.0 // Rough approximation
  };
};

/**
 * Calculate moving statistics
 * @param {Array<number>} data - Time series data
 * @param {number} windowSize - Size of moving window
 * @returns {Array<Object>} Moving stats for each window
 */
export const movingStatistics = (data, windowSize = 5) => {
  const results = [];
  
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - Math.floor(windowSize / 2));
    const end = Math.min(data.length, i + Math.ceil(windowSize / 2));
    const window = data.slice(start, end);
    
    results.push({
      index: i,
      mean: mean(window),
      median: median(window),
      std: standardDeviation(window),
      min: Math.min(...window),
      max: Math.max(...window)
    });
  }
  
  return results;
};

/**
 * Calculate cumulative sum
 * @param {Array<number>} data - Numeric array
 * @returns {Array<number>} Cumulative sums
 */
export const cumulativeSum = (data) => {
  let sum = 0;
  return data.map(val => {
    sum += val;
    return sum;
  });
};

/**
 * Calculate percentage change
 * @param {Array<number>} data - Numeric array
 * @returns {Array<number>} Percentage changes
 */
export const percentageChange = (data) => {
  return data.slice(1).map((val, idx) => {
    const previous = data[idx];
    return previous === 0 ? 0 : ((val - previous) / previous) * 100;
  });
};

/**
 * Calculate exponential moving average (EMA)
 * @param {Array<number>} data - Time series data
 * @param {number} alpha - Smoothing factor (0-1)
 * @returns {Array<number>} EMA values
 */
export const exponentialMovingAverage = (data, alpha = 0.3) => {
  const ema = [data[0]];
  
  for (let i = 1; i < data.length; i++) {
    ema.push(alpha * data[i] + (1 - alpha) * ema[i - 1]);
  }
  
  return ema;
};

/**
 * Bin data into histogram
 * @param {Array<number>} data - Numeric array
 * @param {number} bins - Number of bins
 * @returns {Array<Object>} Histogram bins with counts
 */
export const histogram = (data, bins = 10) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const binWidth = (max - min) / bins;
  
  const histogram = Array(bins).fill(0).map((_, i) => ({
    min: min + i * binWidth,
    max: min + (i + 1) * binWidth,
    count: 0,
    values: []
  }));
  
  data.forEach(val => {
    const binIndex = Math.min(Math.floor((val - min) / binWidth), bins - 1);
    histogram[binIndex].count++;
    histogram[binIndex].values.push(val);
  });
  
  return histogram;
};

/**
 * Generate summary statistics
 * @param {Array<number>} data - Numeric array
 * @returns {Object} Comprehensive statistical summary
 */
export const summarize = (data) => {
  if (!data || data.length === 0) {
    return { error: 'No data provided' };
  }
  
  const q = quartiles(data);
  
  return {
    count: data.length,
    mean: mean(data),
    median: median(data),
    mode: mode(data),
    std: standardDeviation(data),
    variance: variance(data),
    min: Math.min(...data),
    max: Math.max(...data),
    range: Math.max(...data) - Math.min(...data),
    Q1: q.Q1,
    Q2: q.Q2,
    Q3: q.Q3,
    IQR: iqr(data),
    skewness: skewness(data),
    kurtosis: kurtosis(data),
    cv: coefficientOfVariation(data)
  };
};

export default {
  mean,
  median,
  mode,
  standardDeviation,
  variance,
  coefficientOfVariation,
  zScores,
  normalize,
  percentile,
  quartiles,
  iqr,
  detectOutliers,
  skewness,
  kurtosis,
  confidenceInterval,
  tTest,
  movingStatistics,
  cumulativeSum,
  percentageChange,
  exponentialMovingAverage,
  histogram,
  summarize
};
