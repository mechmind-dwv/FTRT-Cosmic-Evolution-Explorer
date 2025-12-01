# 🚀 FTRT Cosmic Evolution Explorer - Setup Guide

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0 ([Descargar aquí](https://nodejs.org/))
- **npm** >= 9.0.0 (incluido con Node.js)
- **Git** ([Descargar aquí](https://git-scm.com/))
- Editor de código recomendado: **VS Code** ([Descargar aquí](https://code.visualstudio.com/))

### Verificar Instalación

```bash
node --version  # Debe mostrar v18.0.0 o superior
npm --version   # Debe mostrar 9.0.0 o superior
git --version   # Debe mostrar cualquier versión reciente
```

---

## 📦 Instalación

### 1. Clonar el Repositorio

```bash
# HTTPS
git clone https://github.com/mechmind-dwv/FTRT-Cosmic-Evolution-Explorer.git

# SSH (si tienes configurado SSH con GitHub)
git clone git@github.com:mechmind-dwv/FTRT-Cosmic-Evolution-Explorer.git

# Entrar al directorio
cd FTRT-Cosmic-Evolution-Explorer
```

### 2. Instalar Dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias:
- React 18
- Vite
- Tailwind CSS
- Recharts
- Axios
- Lucide React (iconos)
- MathJS
- Y más...

⏱️ **Tiempo estimado**: 2-3 minutos dependiendo de tu conexión

### 3. Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar el archivo .env con tus valores (opcional)
# Las APIs de NOAA son públicas y no requieren claves
```

**Contenido por defecto del `.env`**:
```env
VITE_APP_NAME=FTRT Cosmic Evolution Explorer
VITE_APP_ENV=development
VITE_NOAA_BASE_URL=https://services.swpc.noaa.gov
```

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El servidor iniciará en `http://localhost:3000` y se abrirá automáticamente en tu navegador.

---

## 🏗️ Estructura del Proyecto

```
FTRT-Cosmic-Evolution-Explorer/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes React
│   ├── services/        # Servicios de APIs y datos
│   ├── utils/           # Utilidades y helpers
│   ├── data/            # Datos estáticos
│   ├── App.jsx          # Componente principal
│   ├── index.js         # Entry point
│   └── index.css        # Estilos globales
├── docs/                # Documentación
├── scripts/             # Scripts de utilidad
├── tests/               # Tests
└── package.json         # Configuración del proyecto
```

---

## 🛠️ Scripts Disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Iniciar con puerto específico
npm run dev -- --port 3001
```

### Build

```bash
# Crear build de producción
npm run build

# Preview del build (después de npm run build)
npm run preview
```

### Testing

```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

### Linting y Formateo

```bash
# Ejecutar ESLint
npm run lint

# Formatear código con Prettier
npm run format

# Verificar formato sin modificar
npm run format:check
```

### Procesamiento de Datos

```bash
# Descargar últimos datos solares de NOAA
npm run fetch-solar

# Calcular valores FTRT (requiere Python)
npm run calculate-ftrt

# Procesar datos evolutivos
npm run process-data

# Generar correlaciones
npm run correlate
```

---

## 🐍 Configuración Python (Opcional)

Para ejecutar scripts de cálculo FTRT avanzados:

### 1. Instalar Python

Descargar Python >= 3.8 desde [python.org](https://www.python.org/)

### 2. Crear Entorno Virtual

```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### 3. Instalar Dependencias Python

```bash
pip install -r requirements.txt
```

Las dependencias incluyen:
- NumPy (cálculos numéricos)
- SciPy (estadística científica)
- Pandas (manipulación de datos)
- AstroPy (cálculos astronómicos)
- Matplotlib (visualizaciones)

---

## 🚢 Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

### Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### GitHub Pages

```bash
# Build
npm run build

# Deploy (requiere gh-pages instalado)
npm run deploy
```

---

## 🔧 Troubleshooting

### Error: "Module not found"

```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 already in use"

```bash
# Usar puerto diferente
npm run dev -- --port 3001
```

### Error al cargar datos de NOAA

- Verifica tu conexión a internet
- Las APIs de NOAA pueden tener mantenimiento ocasional
- El proyecto incluye datos de fallback automáticos

### Build falla en producción

```bash
# Verificar que todas las dependencias estén instaladas
npm ci

# Limpiar y reconstruir
npm run clean
npm run build
```

---

## 📚 Recursos Adicionales

### Documentación del Proyecto

- [README.md](./README.md) - Visión general del proyecto
- [METHODOLOGY.md](./docs/METHODOLOGY.md) - Metodología científica
- [CONTRIBUTING.md](./docs/CONTRIBUTING.md) - Guía de contribución
- [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) - Documentación de APIs

### Tecnologías Utilizadas

- [React](https://react.dev/) - Framework UI
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Estilos
- [Recharts](https://recharts.org/) - Visualizaciones
- [NOAA Space Weather API](https://www.swpc.noaa.gov/products/apis-json) - Datos solares

---

## 🤝 Soporte

¿Problemas durante la instalación?

1. Revisa la sección de **Troubleshooting** arriba
2. Busca en [Issues](https://github.com/mechmind-dwv/FTRT-Cosmic-Evolution-Explorer/issues)
3. Crea un nuevo issue con:
   - Sistema operativo
   - Versión de Node.js
   - Mensaje de error completo
   - Pasos para reproducir

---

## ✅ Checklist de Instalación Exitosa

- [ ] Node.js y npm instalados correctamente
- [ ] Repositorio clonado
- [ ] Dependencias instaladas sin errores
- [ ] Servidor de desarrollo inicia en localhost:3000
- [ ] Datos se cargan correctamente (verificar en Dashboard)
- [ ] No hay errores en la consola del navegador

Si todos los puntos están marcados: **¡Felicitaciones! 🎉 La instalación fue exitosa.**

---

**Última actualización**: 30 de noviembre de 2025  
**Versión**: 1.0.0  
**Mantenedor**: MECHMIND-DWV
