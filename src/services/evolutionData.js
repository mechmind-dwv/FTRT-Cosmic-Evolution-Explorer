/**
 * Evolution Data Service
 * Manages evolutionary events, correlations, and timeline analysis
 */

// Import will be from actual JSON file once created
// For now, use fallback data structure
const evolutionEventsData = {
  evolutionaryEvents: [],
  metadata: {
    version: '1.0.0',
    lastUpdated: '2025-12-01',
    sources: ['Paleobiology Database', 'GEOMAGIA50', 'Scientific Literature']
  }
};

/**
 * Get all evolutionary events
 */
export const getAllEvents = () => {
  try {
    // Dynamic import would go here
    return require('@/data/evolutionEvents.json').evolutionaryEvents;
  } catch (error) {
    console.warn('Evolution events JSON not found, using fallback');
    return getFallbackEvents();
  }
};

/**
 * Get event by ID
 */
export const getEventById = (id) => {
  const events = getAllEvents();
  return events.find(e => e.id === id) || null;
};

/**
 * Filter events by type
 */
export const getEventsByType = (type) => {
  const events = getAllEvents();
  if (type === 'all') return events;
  return events.filter(e => e.type === type);
};

/**
 * Filter events by significance
 */
export const getEventsBySignificance = (significance) => {
  const events = getAllEvents();
  return events.filter(e => e.significance === significance);
};

/**
 * Get events within time range
 */
export const getEventsInTimeRange = (startAge, endAge) => {
  const events = getAllEvents();
  return events.filter(e => 
    e.ageMillionYears >= startAge && e.ageMillionYears <= endAge
  );
};

/**
 * Get major extinction events
 */
export const getMajorExtinctions = () => {
  const events = getAllEvents();
  return events.filter(e => 
    e.type === 'extinction' && 
    (e.significance === 'critical' || e.significance === 'major')
  );
};

/**
 * Get radiation events
 */
export const getRadiationEvents = () => {
  const events = getAllEvents();
  return events.filter(e => e.type === 'radiation');
};

/**
 * Calculate timeline statistics
 */
export const getTimelineStatistics = () => {
  const events = getAllEvents();
  
  const extinctions = events.filter(e => e.type === 'extinction');
  const radiations = events.filter(e => e.type === 'radiation');
  
  const totalSpeciesLoss = extinctions.reduce((sum, e) => 
    sum + Math.abs(e.estimatedSpecies), 0
  );
  const totalSpeciesGain = radiations.reduce((sum, e) => 
    sum + e.estimatedSpecies, 0
  );
  
  return {
    totalEvents: events.length,
    extinctions: extinctions.length,
    radiations: radiations.length,
    totalSpeciesLoss,
    totalSpeciesGain,
    netSpeciesChange: totalSpeciesGain - totalSpeciesLoss,
    avgEventDuration: events.reduce((sum, e) => 
      sum + e.durationMillionYears, 0
    ) / events.length,
    oldestEvent: Math.max(...events.map(e => e.ageMillionYears)),
    newestEvent: Math.min(...events.map(e => e.ageMillionYears))
  };
};

/**
 * Correlate events with FTRT data
 */
export const correlateWithFTRT = (ftrtData, windowMa = 10) => {
  const events = getAllEvents();
  const correlations = [];
  
  events.forEach(event => {
    const nearbyFTRT = ftrtData.filter(ftrt => {
      const ftrtAge = calculateAgeFromJulianDay(ftrt.julianDay);
      return Math.abs(ftrtAge - event.ageMillionYears) <= windowMa;
    });
    
    if (nearbyFTRT.length > 0) {
      const avgFTRT = nearbyFTRT.reduce((sum, f) => 
        sum + f.normalizedIndex, 0
      ) / nearbyFTRT.length;
      const maxFTRT = Math.max(...nearbyFTRT.map(f => f.normalizedIndex));
      
      correlations.push({
        eventId: event.id,
        eventName: event.name,
        eventAge: event.ageMillionYears,
        eventType: event.type,
        avgFTRT,
        maxFTRT,
        ftrtDataPoints: nearbyFTRT.length,
        correlation: avgFTRT > 0.7 ? 'strong' : 
                    avgFTRT > 0.5 ? 'moderate' : 'weak',
        significance: event.significance
      });
    }
  });
  
  return correlations;
};

/**
 * Get cosmic correlation summary for event
 */
export const getCosmicCorrelation = (eventId) => {
  const event = getEventById(eventId);
  if (!event || !event.cosmicCorrelation) return null;
  
  const cosmic = event.cosmicCorrelation;
  
  return {
    eventName: event.name,
    solarActivity: {
      estimate: cosmic.solarActivityEstimate,
      level: cosmic.solarActivityEstimate > 180 ? 'extreme' : 
             cosmic.solarActivityEstimate > 160 ? 'high' : 'moderate'
    },
    geomagneticWeakening: {
      percentage: cosmic.geomagneticWeakening,
      level: cosmic.geomagneticWeakening > 40 ? 'severe' :
             cosmic.geomagneticWeakening > 30 ? 'moderate' : 'mild'
    },
    cosmicRayFlux: cosmic.cosmicRayFlux,
    ftrtIndex: cosmic.ftrtIndex,
    additionalFactors: {
      magneticReversal: cosmic.magneticReversal || false,
      asteroidImpact: cosmic.asteroidImpact || null,
      humanImpact: cosmic.humanImpact || null
    }
  };
};

/**
 * Group events by geological period
 */
export const groupEventsByPeriod = () => {
  const periods = {
    quaternary: { name: 'Cuaternario', range: [0, 2.6], events: [] },
    neogene: { name: 'Neógeno', range: [2.6, 23], events: [] },
    paleogene: { name: 'Paleógeno', range: [23, 66], events: [] },
    cretaceous: { name: 'Cretácico', range: [66, 145], events: [] },
    jurassic: { name: 'Jurásico', range: [145, 201], events: [] },
    triassic: { name: 'Triásico', range: [201, 252], events: [] },
    permian: { name: 'Pérmico', range: [252, 299], events: [] },
    carboniferous: { name: 'Carbonífero', range: [299, 359], events: [] },
    devonian: { name: 'Devónico', range: [359, 419], events: [] },
    silurian: { name: 'Silúrico', range: [419, 444], events: [] },
    ordovician: { name: 'Ordovícico', range: [444, 485], events: [] },
    cambrian: { name: 'Cámbrico', range: [485, 541], events: [] }
  };
  
  const events = getAllEvents();
  
  events.forEach(event => {
    const age = event.ageMillionYears;
    
    Object.keys(periods).forEach(periodKey => {
      const period = periods[periodKey];
      if (age >= period.range[0] && age < period.range[1]) {
        period.events.push(event);
      }
    });
  });
  
  return periods;
};

/**
 * Calculate diversity timeline
 */
export const calculateDiversityTimeline = (intervalMa = 10) => {
  const events = getAllEvents();
  const maxAge = Math.max(...events.map(e => e.ageMillionYears));
  const timeline = [];
  
  let currentDiversity = 0;
  
  for (let age = 0; age <= maxAge; age += intervalMa) {
    const eventsInInterval = events.filter(e => 
      e.ageMillionYears >= age && e.ageMillionYears < age + intervalMa
    );
    
    const diversityChange = eventsInInterval.reduce((sum, e) => 
      sum + e.estimatedSpecies, 0
    );
    currentDiversity += diversityChange;
    
    timeline.push({
      age,
      diversity: Math.max(0, currentDiversity),
      events: eventsInInterval.length,
      extinctions: eventsInInterval.filter(e => e.type === 'extinction').length,
      radiations: eventsInInterval.filter(e => e.type === 'radiation').length
    });
  }
  
  return timeline.reverse();
};

/**
 * Search events by keyword
 */
export const searchEvents = (keyword) => {
  const events = getAllEvents();
  const lowerKeyword = keyword.toLowerCase();
  
  return events.filter(e => 
    e.name.toLowerCase().includes(lowerKeyword) ||
    e.description.toLowerCase().includes(lowerKeyword) ||
    (e.innovations && e.innovations.some(i => 
      i.toLowerCase().includes(lowerKeyword)
    ))
  );
};

/**
 * Get event summary for display
 */
export const getEventSummary = (eventId) => {
  const event = getEventById(eventId);
  if (!event) return null;
  
  const cosmic = getCosmicCorrelation(eventId);
  
  return {
    id: event.id,
    name: event.name,
    age: `${event.ageMillionYears} Ma`,
    duration: `${event.durationMillionYears} Ma`,
    type: event.type,
    significance: event.significance,
    impact: event.estimatedSpecies > 0 ? 
      `+${event.estimatedSpecies.toLocaleString()} species` :
      `${event.estimatedSpecies.toLocaleString()} species`,
    innovations: event.innovations?.slice(0, 3) || [],
    cosmicActivity: cosmic ? {
      solar: cosmic.solarActivity.level,
      geomag: cosmic.geomagneticWeakening.level,
      ftrt: event.cosmicCorrelation.ftrtIndex
    } : null,
    description: event.description
  };
};

/**
 * Helper: Calculate age from Julian Day
 */
const calculateAgeFromJulianDay = (julianDay) => {
  const now = 2451545.0; // J2000.0
  const daysSince = now - julianDay;
  const years = daysSince / 365.25;
  return years / 1_000_000;
};

/**
 * Get fallback events if JSON not available
 */
const getFallbackEvents = () => {
  return [
    {
      id: 'cambrian_explosion',
      name: 'Explosión Cámbrica',
      ageMillionYears: 541,
      durationMillionYears: 20,
      type: 'radiation',
      significance: 'critical',
      estimatedSpecies: 100000,
      description: 'Aparición rápida de la mayoría de los filos animales',
      innovations: ['Ojos complejos', 'Exoesqueletos', 'Depredación'],
      cosmicCorrelation: {
        solarActivityEstimate: 180,
        geomagneticWeakening: 35,
        cosmicRayFlux: 'high',
        ftrtIndex: 0.82
      }
    },
    {
      id: 'permian_extinction',
      name: 'Extinción Pérmica',
      ageMillionYears: 252,
      durationMillionYears: 2,
      type: 'extinction',
      significance: 'catastrophic',
      estimatedSpecies: -200000,
      description: 'La mayor extinción masiva: 96% especies marinas',
      innovations: [],
      cosmicCorrelation: {
        solarActivityEstimate: 220,
        geomagneticWeakening: 45,
        cosmicRayFlux: 'extreme',
        ftrtIndex: 0.94,
        magneticReversal: true
      }
    },
    {
      id: 'kt_extinction',
      name: 'Extinción K-Pg',
      ageMillionYears: 66,
      durationMillionYears: 0.01,
      type: 'extinction',
      significance: 'catastrophic',
      estimatedSpecies: -150000,
      description: 'Impacto de asteroide: extinción dinosaurios',
      innovations: [],
      cosmicCorrelation: {
        solarActivityEstimate: 200,
        geomagneticWeakening: 42,
        cosmicRayFlux: 'very high',
        ftrtIndex: 0.85,
        asteroidImpact: {
          location: 'Chicxulub, México',
          diameter: 10,
          energy: '100 million megatons'
        }
      }
    }
  ];
};

export default {
  getAllEvents,
  getEventById,
  getEventsByType,
  getEventsBySignificance,
  getEventsInTimeRange,
  getMajorExtinctions,
  getRadiationEvents,
  getTimelineStatistics,
  correlateWithFTRT,
  getCosmicCorrelation,
  groupEventsByPeriod,
  calculateDiversityTimeline,
  searchEvents,
  getEventSummary
};
