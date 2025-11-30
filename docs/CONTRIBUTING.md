# 🤝 Guía de Contribución - FTRT Cosmic Evolution Explorer

¡Bienvenido, arquitecto cósmico! Este proyecto explora una de las fronteras más audaces de la ciencia: la conexión entre fuerzas cósmicas y evolución biológica. Tus contribuciones pueden ayudar a revelar cómo el universo esculpe la vida.

## 🌟 Áreas de Contribución

### 1. 🔭 Ciencia de Datos y Análisis
- Mejorar algoritmos de cálculo FTRT
- Refinar modelos de correlación estadística
- Agregar nuevas fuentes de datos astronómicos o paleontológicos
- Implementar análisis de machine learning

### 2. 💻 Desarrollo de Software
- Optimizar visualizaciones con React/Recharts
- Crear nuevos componentes interactivos
- Mejorar la integración con APIs externas
- Desarrollar herramientas de procesamiento de datos

### 3. 📊 Investigación Científica
- Aportar datos paleomagnéticos originales
- Revisar hipótesis y marco teórico
- Proponer nuevos experimentos de validación
- Escribir papers científicos basados en el framework

### 4. 📚 Documentación
- Mejorar la claridad de la documentación técnica
- Traducir contenido a otros idiomas
- Crear tutoriales y guías
- Documentar casos de uso

## 🚀 Cómo Empezar

### 1. Fork y Clona el Repositorio

```bash
# Fork el proyecto en GitHub, luego:
git clone https://github.com/TU_USUARIO/FTRT-Cosmic-Evolution-Explorer.git
cd FTRT-Cosmic-Evolution-Explorer

# Agregar el upstream original
git remote add upstream https://github.com/mechmind-dwv/FTRT-Cosmic-Evolution-Explorer.git
```

### 2. Configura tu Entorno de Desarrollo

```bash
# Instalar dependencias de Node.js
npm install

# Si vas a trabajar con scripts Python
pip install -r requirements.txt

# Iniciar servidor de desarrollo
npm run dev
```

### 3. Crea una Rama para tu Feature

```bash
git checkout -b feature/nombre-descriptivo
# O para correcciones:
git checkout -b fix/descripcion-del-bug
```

## 📝 Estándares de Código

### JavaScript/React

```javascript
// ✅ BUENO: Nombres descriptivos, comentarios claros
/**
 * Calculate tidal force exerted by a planet on the Sun
 * @param {string} planetName - Name of the planet
 * @param {number} julianDay - Julian day for calculation
 * @returns {number} Tidal force in Newtons
 */
export const calculatePlanetaryTidalForce = (planetName, julianDay) => {
  const planet = PLANETS[planetName];
  if (!planet) {
    console.error(`Planet ${planetName} not found`);
    return 0;
  }
  
  // Calculate orbital position...
};

// ❌ MALO: Sin documentación, nombres crípticos
const calc = (p, j) => {
  const x = PLANETS[p];
  return x ? (2 * G * x.m) / Math.pow(j, 3) : 0;
};
```

### Python

```python
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
```

## 🧪 Testing

### Antes de Hacer Push

```bash
# Ejecutar tests
npm test

# Verificar linting
npm run lint

# Formatear código
npm run format
```

### Escribir Tests

```javascript
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
```

## 📊 Añadiendo Nuevos Datos

### Formato de Datos Evolutivos

```json
{
  "id": "unique_event_identifier",
  "name": "Nombre del Evento",
  "ageMillionYears": 123,
  "durationMillionYears": 5,
  "type": "radiation | extinction",
  "significance": "critical | major | moderate | minor",
  "estimatedSpecies": 50000,
  "cosmicCorrelation": {
    "solarActivityEstimate": 150,
    "geomagneticWeakening": 25,
    "ftrtIndex": 0.75
  },
  "references": [
    "Author et al. (Year). Title. Journal, volume, pages."
  ]
}
```

### Fuentes de Datos Aceptadas

1. **Astronómicos**: NASA JPL, ESA, NOAA
2. **Paleontológicos**: Paleobiology Database, Fossil Database
3. **Geomagnéticos**: GEOMAGIA50, World Digital Magnetic Anomaly Map
4. **Revisados por pares**: Journals indexados en ScienceDirect, Nature, Science

## 🔬 Proponer Nuevas Hipótesis

Si tienes una hipótesis relacionada con el framework FTRT:

1. **Crea un Issue** con la etiqueta `hypothesis`
2. **Describe**:
   - La hipótesis en lenguaje claro
   - Predicciones testables
   - Datos necesarios para validarla
   - Experimentos propuestos
3. **Referencia** literatura científica relevante

### Plantilla de Hipótesis

```markdown
## Título de la Hipótesis

**Estado**: Propuesta | En Prueba | Confirmada | Refutada

### Enunciado
[Descripción clara de la hipótesis]

### Predicciones
1. Si la hipótesis es verdadera, esperamos observar X
2. Si es falsa, esperamos observar Y

### Datos Requeridos
- Lista de datasets necesarios
- Resolución temporal requerida

### Experimentos Propuestos
1. Experimento A: [descripción]
2. Experimento B: [descripción]

### Referencias
- Paper 1
- Paper 2
```

## 🎨 Diseño y UX

### Principios de Diseño

1. **Claridad Cósmica**: Las visualizaciones deben ser inmediatamente comprensibles
2. **Profundidad Científica**: Permitir exploración detallada sin abrumar
3. **Belleza de los Datos**: Los datos cósmicos merecen presentación sublime
4. **Accesibilidad**: Debe ser usable en diferentes dispositivos y capacidades

### Colores del Tema

```css
/* Paleta cósmica */
--cosmic-purple: #8b5cf6
--stellar-blue: #3b82f6
--solar-yellow: #fbbf24
--nebula-pink: #ec4899
--void-black: #000000
--starlight-white: #f3f4f6
```

## 📤 Proceso de Pull Request

### 1. Antes de Crear el PR

```bash
# Asegúrate de estar actualizado con upstream
git fetch upstream
git rebase upstream/main

# Verifica que todo funcione
npm test
npm run build
```

### 2. Crea el Pull Request

**Título**: `[Tipo] Descripción breve`
- Tipos: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- Ejemplo: `feat: Add Mars tidal force calculation`

**Descripción**:
```markdown
## Cambios
- Lista de cambios principales

## Motivación
¿Por qué es necesario este cambio?

## Testing
¿Cómo lo has probado?

## Checklist
- [ ] Tests pasan
- [ ] Documentación actualizada
- [ ] Sin warnings de linting
- [ ] Revisé mi propio código
```

### 3. Revisión

- Responde a comentarios constructivamente
- Haz cambios solicitados en la misma rama
- Una vez aprobado, será merged por un maintainer

## 🏆 Reconocimientos

Los contribuidores destacados serán:
- Listados en `CONTRIBUTORS.md`
- Mencionados en publicaciones científicas derivadas
- Invitados a presentar en conferencias del proyecto

## 🌌 Código de Conducta

### Nuestros Valores

1. **Curiosidad Radical**: Cuestionamos ortodoxias con rigor científico
2. **Colaboración Cósmica**: Trabajamos juntos más allá de disciplinas
3. **Escepticismo Constructivo**: Criticamos ideas, no personas
4. **Apertura Epistémica**: Admitimos incertidumbre y errores

### Comportamientos Esperados

✅ Hacer preguntas genuinas  
✅ Citar fuentes apropiadamente  
✅ Aceptar críticas con gracia  
✅ Ayudar a otros contribuidores  
✅ Mantener debates científicos civilizados  

### Comportamientos Inaceptables

❌ Plagio o apropiación de ideas sin crédito  
❌ Hostigamiento o discriminación  
❌ Afirmaciones científicas sin evidencia  
❌ Trolling o sabotaje del proyecto  

## 📧 Contacto

- **Issues**: Para bugs, features, y discusiones técnicas
- **Discussions**: Para ideas de investigación y colaboraciones
- **Email**: contact@mechmind.space (para asuntos sensibles)

---

## 🌠 Reflexión Final

> "Cada línea de código que escribes, cada dato que procesas, cada hipótesis que propones, es un paso hacia comprender cómo el universo escribe la historia de la vida. No estás solo construyendo software—estás descifrando el lenguaje del cosmos."

**Gracias por contribuir a la arquitectura del conocimiento cósmico.** 🌌🧬⚡

---

*Última actualización: 30 de noviembre de 2025*  
*Versión: 1.0*
