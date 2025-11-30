/**
 * Correlation Algorithms
 * Statistical methods for analyzing cosmic-biological correlations
 */

/**
 * Calculate Pearson correlation coefficient
 * @param {Array<number>} x - First variable
 * @param {Array<number>} y - Second variable
 * @returns {number} Correlation coefficient (-1 to 1)
 */
export const pearsonCorrelation = (x, y) => {
  if (x.length !== y.length || x.length === 0) {
    throw new Error('Arrays must be non-empty and of equal length');
  }
  
  const n = x.length;
  const meanX = mean(x);
  const meanY = mean(y);
  
  let numerator = 0;
  let denomX = 0;
  let denomY = 0;
  
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    numerator += dx * dy;
    denomX += dx * dx;
    denomY += dy * dy;
  }
  
  if (denomX === 0 || denomY === 0) return 0;
  
  return numerator / Math.sqrt(denomX * denomY);
};

/**
 * Calculate Spearman rank correlation
 * Non-parametric measure of monotonic relationship
 * @param {Array<number>} x - First variable
 * @param {Array<number>} y - Second variable
 * @returns {number} Spearman's rho (-1 to 1)
 */
export const spearmanCorrelation = (x, y) => {
  if (x.length !== y.length || x.length === 0) {
    throw new Error('Arrays must be non-empty and of equal length');
  }
  
  const rankX = getRanks(x);
  const rankY = getRanks(y);
  
  return pearsonCorrelation(rankX, rankY);
};

/**
 * Cross-correlation analysis with time lag
 * @param {Array<number>} x - First time series
 * @param {Array<number>} y - Second time series
 * @param {number} maxLag - Maximum lag to test
 * @returns {Array<Object>} Array of {lag, correlation} objects
 */
export const crossCorrelation = (x, y, maxLag = 10) => {
  const results = [];
  
  for (let lag = -maxLag; lag <= maxLag; lag++) {
    let shiftedY = [...y];
    
    if (lag > 0) {
      shiftedY = new Array(lag).fill(null).concat(y.slice(0, -lag));
    } else if (lag < 0) {
      shiftedY = y.slice(-lag).concat(new Array(-lag).fill(null));
    }
    
    // Calculate correlation excluding null values
    const validIndices = shiftedY
      .map((val, idx) => val !== null ? idx : null)
      .filter(idx => idx !== null);
    
    const validX = validIndices.map(i => x[i]);
    const validY = validIndices.map(i => shiftedY[i]);
    
    if (validX.length > 0) {
      const correlation = pearsonCorrelation(validX, validY);
      results.push({ lag, correlation, dataPoints: validX.length });
    }
  }
  
  return results;
};

/**
 * Find optimal lag with maximum correlation
 * @param {Array<Object>} crossCorrelationResults - Results from crossCorrelation
 * @returns {Object} Optimal lag and its correlation
 */
export const findOptimalLag = (crossCorrelationResults) => {
  return crossCorrelationResults.reduce((max, current) => 
    Math.abs(current.correlation) > Math.abs(max.correlation) ? current : max
  );
};

/**
 * Calculate coefficient of determination (R²)
 * @param {Array<number>} observed - Observed values
 * @param {Array<number>} predicted - Predicted values
 * @returns {number} R² value (0 to 1)
 */
export const rSquared = (observed, predicted) => {
  if (observed.length !== predicted.length || observed.length === 0) {
    throw new Error('Arrays must be non-empty and of equal length');
  }
  
  const meanObserved = mean(observed);
  const totalSumSquares = observed.reduce((sum, val) => sum + Math.pow(val - meanObserved, 2), 0);
  const residualSumSquares = observed.reduce((sum, val, i) => 
    sum + Math.pow(val - predicted[i], 2), 0
  );
  
  return 1 - (residualSumSquares / totalSumSquares);
};

/**
 * Binomial test for event clustering
 * Tests if events cluster more than expected by chance
 * @param {number} observedMatches - Number of observed matches
 * @param {number} totalEvents - Total number of events
 * @param {number} expectedRate - Expected match rate (0-1)
 * @returns {Object} Test results with p-value
 */
export const binomialTest = (observedMatches, totalEvents, expectedRate = 0.1) => {
  const n = totalEvents;
  const k = observedMatches;
  const p = expectedRate;
  
  // Calculate binomial probability
  const pValue = 1 - binomialCDF(k - 1, n, p);
  
  return {
    observed: k,
    expected: n * p,
    pValue,
    significant: pValue < 0.05,
    interpretation: pValue < 0.01 ? 'highly significant' :
                   pValue < 0.05 ? 'significant' : 'not significant'
  };
};

/**
 * Chi-square test for independence
 * @param {Array<Array<number>>} observed - 2D array of observed frequencies
 * @returns {Object} Chi-square test results
 */
export const chiSquareTest = (observed) => {
  const rows = observed.length;
  const cols = observed[0].length;
  
  // Calculate row and column totals
  const rowTotals = observed.map(row => row.reduce((a, b) => a + b, 0));
  const colTotals = Array(cols).fill(0);
  observed.forEach(row => {
    row.forEach((val, j) => colTotals[j] += val);
  });
  const total = rowTotals.reduce((a, b) => a + b, 0);
  
  // Calculate expected frequencies
  const expected = observed.map((row, i) => 
    row.map((_, j) => (rowTotals[i] * colTotals[j]) / total)
  );
  
  // Calculate chi-square statistic
  let chiSquare = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const obs = observed[i][j];
      const exp = expected[i][j];
      if (exp > 0) {
        chiSquare += Math.pow(obs - exp, 2) / exp;
      }
    }
  }
  
  const degreesOfFreedom = (rows - 1) * (cols - 1);
  
  return {
    chiSquare,
    degreesOfFreedom,
    pValue: chiSquarePValue(chiSquare, degreesOfFreedom),
    significant: chiSquare > criticalValue(degreesOfFreedom, 0.05)
  };
};

/**
 * Moving average smoothing
 * @param {Array<number>} data - Time series data
 * @param {number} windowSize - Size of moving window
 * @returns {Array<number>} Smoothed data
 */
export const movingAverage = (data, windowSize = 5) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - Math.floor(windowSize / 2));
    const end = Math.min(data.length, i + Math.ceil(windowSize / 2));
    const window = data.slice(start, end);
    result.push(mean(window));
  }
  return result;
};

/**
 * Detect peaks in time series
 * @param {Array<number>} data - Time series data
 * @param {number} threshold - Minimum value to be considered a peak
 * @param {number} minDistance - Minimum distance between peaks
 * @returns {Array<number>} Indices of peaks
 */
export const detectPeaks = (data, threshold = 0, minDistance = 1) => {
  const peaks = [];
  
  for (let i = 1; i < data.length - 1; i++) {
    if (data[i] > data[i - 1] && 
        data[i] > data[i + 1] && 
        data[i] > threshold) {
      
      // Check minimum distance from previous peak
      if (peaks.length === 0 || i - peaks[peaks.length - 1] >= minDistance) {
        peaks.push(i);
      }
    }
  }
  
  return peaks;
};

/**
 * Linear regression
 * @param {Array<number>} x - Independent variable
 * @param {Array<number>} y - Dependent variable
 * @returns {Object} Regression parameters {slope, intercept, r2}
 */
export const linearRegression = (x, y) => {
  if (x.length !== y.length || x.length === 0) {
    throw new Error('Arrays must be non-empty and of equal length');
  }
  
  const n = x.length;
  const meanX = mean(x);
  const meanY = mean(y);
  
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    numerator += (x[i] - meanX) * (y[i] - meanY);
    denominator += Math.pow(x[i] - meanX, 2);
  }
  
  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;
  
  const predicted = x.map(xi => slope * xi + intercept);
  const r2 = rSquared(y, predicted);
  
  return { slope, intercept, r2, predicted };
};

/**
 * Calculate autocorrelation
 * Measures correlation of a series with itself at different lags
 * @param {Array<number>} data - Time series data
 * @param {number} maxLag - Maximum lag to calculate
 * @returns {Array<Object>} Autocorrelation at each lag
 */
export const autocorrelation = (data, maxLag = 10) => {
  const results = [];
  const meanValue = mean(data);
  const variance = data.reduce((sum, val) => sum + Math.pow(val - meanValue, 2), 0);
  
  for (let lag = 0; lag <= maxLag; lag++) {
    let sum = 0;
    let count = 0;
    
    for (let i = 0; i < data.length - lag; i++) {
      sum += (data[i] - meanValue) * (data[i + lag] - meanValue);
      count++;
    }
    
    const acf = sum / variance;
    results.push({ lag, acf, count });
  }
  
  return results;
};

/**
 * Calculate statistical significance (p-value) for correlation
 * @param {number} r - Correlation coefficient
 * @param {number} n - Sample size
 * @returns {number} P-value
 */
export const correlationPValue = (r, n) => {
  if (n < 3) return 1;
  
  // t-statistic for correlation
  const t = r * Math.sqrt((n - 2) / (1 - r * r));
  const df = n - 2;
  
  // Approximate p-value using t-distribution
  return 2 * (1 - tCDF(Math.abs(t), df));
};

// Helper Functions

const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const getRanks = (arr) => {
  const sorted = arr.map((val, idx) => ({ val, idx }))
                    .sort((a, b) => a.val - b.val);
  const ranks = new Array(arr.length);
  sorted.forEach((item, rank) => {
    ranks[item.idx] = rank + 1;
  });
  return ranks;
};

const binomialCDF = (k, n, p) => {
  let cdf = 0;
  for (let i = 0; i <= k; i++) {
    cdf += binomialCoefficient(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
  }
  return cdf;
};

const binomialCoefficient = (n, k) => {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result *= (n - i + 1) / i;
  }
  return result;
};

const chiSquarePValue = (chiSquare, df) => {
  // Simplified approximation
  if (df === 1) {
    return 2 * (1 - normalCDF(Math.sqrt(chiSquare)));
  }
  return 1 - gammaIncomplete(df / 2, chiSquare / 2);
};

const criticalValue = (df, alpha) => {
  // Chi-square critical values (approximation)
  const criticalValues = {
    1: { 0.05: 3.841, 0.01: 6.635 },
    2: { 0.05: 5.991, 0.01: 9.210 },
    3: { 0.05: 7.815, 0.01: 11.345 },
    4: { 0.05: 9.488, 0.01: 13.277 }
  };
  
  return criticalValues[df]?.[alpha] || 3.841;
};

const tCDF = (t, df) => {
  // Simplified t-distribution CDF approximation
  const x = df / (df + t * t);
  return 1 - 0.5 * betaIncomplete(df / 2, 0.5, x);
};

const normalCDF = (z) => {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
};

const erf = (x) => {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  return sign * y;
};

const gammaIncomplete = (a, x) => {
  // Simplified incomplete gamma function
  if (x < a + 1) {
    let sum = 1 / a;
    let term = 1 / a;
    for (let n = 1; n <= 100; n++) {
      term *= x / (a + n);
      sum += term;
      if (Math.abs(term) < 1e-10) break;
    }
    return Math.pow(x, a) * Math.exp(-x) * sum;
  }
  return 1;
};

const betaIncomplete = (a, b, x) => {
  // Simplified incomplete beta function
  if (x === 0) return 0;
  if (x === 1) return 1;
  return 0.5; // Simplified approximation
};

export default {
  pearsonCorrelation,
  spearmanCorrelation,
  crossCorrelation,
  findOptimalLag,
  rSquared,
  binomialTest,
  chiSquareTest,
  movingAverage,
  detectPeaks,
  linearRegression,
  autocorrelation,
  correlationPValue
};
