# ✅ BUENO: Type hints, docstrings
def correlate_ftrt_with_solar(
    ftrt_data: List[Dict],
    solar_data: List[Dict],
    window_days: int = 30
) -> Dict[str, float]:
    """
    Correlate FTRT peaks with solar activity.
    
    Args:
        ftrt_data: List of FTRT measurements
        solar_data: List of solar activity data
        window_days: Temporal window for matching
    
    Returns:
        Dictionary with correlation coefficient and p-value
    """
    # Implementation...
    pass

# ❌ MALO: Sin tipos, sin documentación
def correlate(f, s, w=30):
    # Do stuff
    return {'r': 0.5}
