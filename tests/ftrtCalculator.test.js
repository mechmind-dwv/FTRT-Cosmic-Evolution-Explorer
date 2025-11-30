// tests/ftrtCalculator.test.js
import { calculateFTRT } from '../src/services/ftrtCalculator';

describe('FTRT Calculator', () => {
  test('should calculate valid FTRT for given date', () => {
    const date = new Date('2025-01-01');
    const result = calculateFTRT(date);
    
    expect(result).toHaveProperty('normalizedIndex');
    expect(result.normalizedIndex).toBeGreaterThanOrEqual(0);
    expect(result.normalizedIndex).toBeLessThanOrEqual(1);
  });
  
  test('should identify dominant planet correctly', () => {
    const date = new Date('2025-11-30');
    const result = calculateFTRT(date);
    
    expect(result.dominantPlanet).toBeDefined();
    expect(['jupiter', 'saturn', 'venus', 'earth']).toContain(
      result.dominantPlanet
    );
  });
});
