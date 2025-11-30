🏗️ FTRT Cosmic Evolution Explorer - Estructura del Proyecto

## 📁 Árbol de Directorios

```
FTRT-Cosmic-Evolution-Explorer/
├── 📄 README.md                      # Documentación principal (✓ existente)
├── 📄 LICENSE                        # MIT License
├── 📄 .gitignore                     # Ignorar node_modules, .env, etc.
├── 📄 package.json                   # Dependencias y scripts
├── 📄 package-lock.json              # Lock de dependencias
│
├── 📂 src/                           # Código fuente principal
│   ├── 📄 App.jsx                    # Componente principal (Explorer)
│   ├── 📄 index.js                   # Entry point
│   ├── 📄 index.css                  # Estilos globales (Tailwind)
│   │
│   ├── 📂 components/                # Componentes React reutilizables
│   │   ├── 📄 DashboardView.jsx     # Vista de dashboard solar
│   │   ├── 📄 EvolutionView.jsx     # Vista de eventos evolutivos
│   │   ├── 📄 CorrelationView.jsx   # Vista de análisis FTRT
│   │   ├── 📄 MetricCard.jsx        # Card de métricas
│   │   ├── 📄 TabButton.jsx         # Botón de navegación
│   │   └── 📄 LoadingSpinner.jsx    # Spinner de carga
│   │
│   ├── 📂 services/                  # Servicios de datos y APIs
│   │   ├── 📄 solarAPI.js           # Servicio NOAA Space Weather
│   │   ├── 📄 ftrtCalculator.js     # Cálculos de FTRT
│   │   ├── 📄 geomagService.js      # Datos geomagnéticos
│   │   └── 📄 evolutionData.js      # Base de datos evolutiva
│   │
│   ├── 📂 utils/                     # Utilidades y helpers
│   │   ├── 📄 correlations.js       # Algoritmos de correlación
│   │   ├── 📄 statistics.js         # Funciones estadísticas
│   │   ├── 📄 dateHelpers.js        # Manejo de fechas geológicas
│   │   └── 📄 constants.js          # Constantes del proyecto
│   │
│   └── 📂 data/                      # Datos estáticos y referencias
│       ├── 📄 evolutionEvents.json  # Eventos evolutivos históricos
│       ├── 📄 paleomagData.json     # Datos paleomagnéticos
│       └── 📄 references.json       # Referencias científicas
│
├── 📂 public/                        # Archivos públicos
│   ├── 📄 index.html                # HTML principal
│   ├── 📄 manifest.json             # PWA manifest
│   └── 📄 favicon.ico               # Icono del sitio
│
├── 📂 docs/                          # Documentación extendida
│   ├── 📄 METHODOLOGY.md            # Metodología científica
│   ├── 📄 API_DOCUMENTATION.md      # Documentación de APIs
│   ├── 📄 THEORY.md                 # Marco teórico detallado
│   ├── 📄 CONTRIBUTING.md           # Guía de contribución
│   └── 📄 RESEARCH_PLAN.md          # Plan de investigación
│
├── 📂 scripts/                       # Scripts de utilidad
│   ├── 📄 fetchSolarData.js         # Script para descargar datos solares
│   ├── 📄 calculateFTRT.py          # Cálculo de FTRT (Python)
│   ├── 📄 processEvolutionData.js   # Procesamiento de datos evolutivos
│   └── 📄 generateCorrelations.py   # Generación de correlaciones
│
├── 📂 tests/                         # Tests unitarios y de integración
│   ├── 📄 ftrtCalculator.test.js
│   ├── 📄 correlations.test.js
│   └── 📄 components.test.jsx
│
└── 📂 research/                      # Material de investigación
    ├── 📄 papers.md                 # Papers de referencia
    ├── 📄 datasets.md               # Datasets utilizados
    └── 📄 hypotheses.md             # Hipótesis en desarrollo
```

## 🚀 Archivos Prioritarios a Crear

### 1. **package.json** - Configuración del proyecto
### 2. **LICENSE** - Licencia MIT
### 3. **.gitignore** - Archivos a ignorar
### 4. **src/services/solarAPI.js** - Servicio de datos solares
### 5. **src/services/ftrtCalculator.js** - Motor de cálculo FTRT
### 6. **docs/METHODOLOGY.md** - Metodología científica
### 7. **docs/CONTRIBUTING.md** - Guía de contribución
### 8. **scripts/calculateFTRT.py** - Script Python para FTRT
### 9. **src/data/evolutionEvents.json** - Base de datos evolutiva
### 10. **DEPLOYMENT.md** - Guía de despliegue

## 📦 Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Visualización**: Recharts + D3.js
- **Estilos**: Tailwind CSS
- **APIs**: NOAA Space Weather, JPL Horizons
- **Cálculos**: Python (NumPy, SciPy) + JavaScript
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel / Netlify

## 🔧 Próximos Pasos

1. Crear `package.json` con todas las dependencias
2. Configurar estructura de carpetas
3. Modularizar el componente React actual
4. Implementar servicios de API
5. Crear scripts de procesamiento de datos
6. Escribir documentación técnica
7. Configurar CI/CD pipeline

---
