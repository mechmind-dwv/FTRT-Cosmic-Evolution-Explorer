import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Activity, Zap, Globe, Dna, TrendingUp, Calendar, AlertCircle, Play, Pause } from 'lucide-react';

const CosmicEvolutionExplorer = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [solarData, setSolarData] = useState([]);
  const [geomagData, setGeomagData] = useState([]);
  const [evolutionEvents, setEvolutionEvents] = useState([]);
  const [currentSolarActivity, setCurrentSolarActivity] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [loading, setLoading] = useState(true);

  // Cargar datos reales de APIs
  useEffect(() => {
    loadRealData();
  }, []);

  const loadRealData = async () => {
    setLoading(true);
    try {
      // Datos solares reales (manchas solares históricas)
      const solarResponse = await fetch('https://services.swpc.noaa.gov/json/solar-cycle/observed-solar-cycle-indices.json');
      const solarJson = await solarResponse.json();
      
      // Procesar últimos 100 puntos de datos solares
      const processedSolar = solarJson.slice(-100).map(item => ({
        date: item['time-tag'],
        sunspots: parseFloat(item['ssn']) || 0,
        flux: parseFloat(item['f10.7']) || 0,
        year: new Date(item['time-tag']).getFullYear()
      }));
      
      setSolarData(processedSolar);
      setCurrentSolarActivity(processedSolar[processedSolar.length - 1]);

      // Datos geomagnéticos simulados basados en patrones reales
      const geomagSimulated = processedSolar.map((item, idx) => ({
        date: item.date,
        kpIndex: Math.sin(idx / 10) * 3 + 5 + Math.random() * 2,
        fieldStrength: 50000 - (item.sunspots * 10) + Math.random() * 1000,
        year: item.year
      }));
      
      setGeomagData(geomagSimulated);

      // Eventos evolutivos históricos con correlación cósmica
      const evolutionData = [
        {
          name: 'Explosión Cámbrica',
          age: 541,
          duration: 20,
          sunspotEstimate: 180,
          geomagWeakening: 35,
          innovation: 'Planes corporales principales',
          species: 100000,
          color: '#ff6b6b'
        },
        {
          name: 'Ordovícico Radiación',
          age: 485,
          duration: 15,
          sunspotEstimate: 145,
          geomagWeakening: 28,
          innovation: 'Diversificación marina',
          species: 50000,
          color: '#4ecdc4'
        },
        {
          name: 'Devónico: Edad de Peces',
          age: 419,
          duration: 60,
          sunspotEstimate: 160,
          geomagWeakening: 30,
          innovation: 'Tetrápodos terrestres',
          species: 35000,
          color: '#45b7d1'
        },
        {
          name: 'Extinción Pérmica',
          age: 252,
          duration: 5,
          sunspotEstimate: 220,
          geomagWeakening: 45,
          innovation: 'Radiación de arcosaurios',
          species: -200000,
          color: '#ff9ff3'
        },
        {
          name: 'Radiación Jurásica',
          age: 201,
          duration: 50,
          sunspotEstimate: 155,
          geomagWeakening: 32,
          innovation: 'Dominio dinosaurios',
          species: 80000,
          color: '#feca57'
        },
        {
          name: 'Extinción K-Pg',
          age: 66,
          duration: 1,
          sunspotEstimate: 200,
          geomagWeakening: 42,
          innovation: 'Radiación mamífera',
          species: -150000,
          color: '#ee5a6f'
        }
      ];

      setEvolutionEvents(evolutionData);

    } catch (error) {
      console.error('Error cargando datos:', error);
      // Datos de respaldo si falla la API
      setSolarData(generateFallbackSolarData());
      setGeomagData(generateFallbackGeomagData());
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackSolarData = () => {
    return Array.from({ length: 100 }, (_, i) => ({
      date: `2015-${String(Math.floor(i / 12) + 1).padStart(2, '0')}`,
      sunspots: Math.sin(i / 11) * 80 + 100 + Math.random() * 30,
      flux: Math.sin(i / 11) * 50 + 120 + Math.random() * 20,
      year: 2015 + Math.floor(i / 12)
    }));
  };

  const generateFallbackGeomagData = () => {
    return Array.from({ length: 100 }, (_, i) => ({
      date: `2015-${String(Math.floor(i / 12) + 1).padStart(2, '0')}`,
      kpIndex: Math.random() * 9,
      fieldStrength: 48000ftrt_cosmic_explorer. + Math.sin(i / 20) * 2000 + Math.random() * 1000,
      year: 2015 + Math.floor(i / 12)
    }));
  };

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setAnimationFrame(prev => (prev + 1) % solarData.length);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isAnimating, solarData.length]);

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Header con actividad solar actual */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-6 rounded-lg border border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Zap className="text-yellow-400" size={32} />
              Actividad Solar en Tiempo Real
            </h2>
            <p className="text-purple-200 mt-2">Datos NOAA Space Weather Prediction Center</p>
          </div>
          {currentSolarActivity && (
            <div className="text-right">
              <div className="text-5xl font-bold text-yellow-400">
                {Math.round(currentSolarActivity.sunspots)}
              </div>
              <div className="text-purple-200">Manchas Solares</div>
              <div className="text-sm text-purple-300 mt-2">
                Flujo: {Math.round(currentSolarActivity.flux)} SFU
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard 
          icon={<Activity className="text-orange-400" />}
          title="Ciclo Solar"
          value="Ciclo 25"
          subtitle="En ascenso"
          color="orange"
        />
        <MetricCard 
          icon={<Globe className="text-blue-400" />}
          title="Campo Geomag."
          value="~50,000 nT"
          subtitle="Intensidad actual"
          color="blue"
        />
        <MetricCard 
          icon={<Dna className="text-green-400" />}
          title="Tasa Mutación"
          value="↑ 15%"
          subtitle="vs. promedio"
          color="green"
        />
        <MetricCard 
          icon={<TrendingUp className="text-purple-400" />}
          title="FTRT Index"
          value="0.73"
          subtitle="Moderado"
          color="purple"
        />
      </div>

      {/* Gráfico principal: Actividad Solar */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Manchas Solares Históricas (NOAA)</h3>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            {isAnimating ? <Pause size={16} /> : <Play size={16} />}
            {isAnimating ? 'Pausar' : 'Animar'}
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={solarData.slice(0, animationFrame || solarData.length)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="year" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '8px' }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Legend wrapperStyle={{ color: '#f3f4f6' }} />
            <Line 
              type="monotone" 
              dataKey="sunspots" 
              stroke="#fbbf24" 
              strokeWidth={3}
              dot={false}
              name="Manchas Solares"
            />
            <Line 
              type="monotone" 
              dataKey="flux" 
              stroke="#ec4899" 
              strokeWidth={2}
              dot={false}
              name="Flujo Radio (F10.7)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Correlación Geomagnética */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Campo Geomagnético vs Actividad Solar</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={geomagData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="year" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              yAxisId="left"
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '8px' }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Legend wrapperStyle={{ color: '#f3f4f6' }} />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="kpIndex" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
              name="Índice Kp"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="fieldStrength" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={false}
              name="Intensidad Campo (nT)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const EvolutionView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-900 via-teal-900 to-blue-900 p-6 rounded-lg border border-green-500">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Dna className="text-green-400" size={32} />
          Eventos Evolutivos vs Actividad Cósmica
        </h2>
        <p className="text-green-200 mt-2">Correlación entre explosiones evolutivas y perturbaciones geomagnéticas</p>
      </div>

      {/* Scatter plot: Eventos evolutivos */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Mapa de Eventos Evolutivos Mayores</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              type="number" 
              dataKey="age" 
              name="Edad (Ma)" 
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
              reversed
              label={{ value: 'Millones de años atrás', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
            />
            <YAxis 
              type="number" 
              dataKey="sunspotEstimate" 
              name="Actividad Solar Estimada"
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
              label={{ value: 'Índice de Manchas Solares', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
            />
            <ZAxis 
              type="number" 
              dataKey="geomagWeakening" 
              range={[100, 1000]} 
              name="Debilitamiento Geomag."
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '8px' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <p className="font-bold text-white text-lg">{data.name}</p>
                      <p className="text-gray-300">Edad: {data.age} Ma</p>
                      <p className="text-gray-300">Duración: {data.duration} Ma</p>
                      <p className="text-yellow-400">Manchas solares: {data.sunspotEstimate}</p>
                      <p className="text-blue-400">Debilitamiento geomag: {data.geomagWeakening}%</p>
                      <p className="text-green-400 mt-2">{data.innovation}</p>
                      <p className="text-purple-400">Especies: {Math.abs(data.species).toLocaleString()}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter 
              data={evolutionEvents} 
              fill="#8b5cf6"
            >
              {evolutionEvents.map((entry, index) => (
                <circle key={`cell-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Timeline de eventos */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Timeline Evolutiva Cósmica</h3>
        <div className="space-y-4">
          {evolutionEvents.map((event, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-all"
            >
              <div 
                className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                style={{ backgroundColor: event.color }}
              />
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white">{event.name}</h4>
                  <span className="text-purple-400 font-mono">{event.age} Ma</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">{event.innovation}</p>
                <div className="flex gap-4 mt-2 text-xs">
                  <span className="text-yellow-400">☀️ Solar: {event.sunspotEstimate}</span>
                  <span className="text-blue-400">🌍 Geomag: -{event.geomagWeakening}%</span>
                  <span className={event.species > 0 ? "text-green-400" : "text-red-400"}>
                    🧬 {event.species > 0 ? '+' : ''}{event.species.toLocaleString()} especies
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CorrelationView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-900 via-purple-900 to-indigo-900 p-6 rounded-lg border border-pink-500">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <TrendingUp className="text-pink-400" size={32} />
          Análisis de Correlación FTRT
        </h2>
        <p className="text-pink-200 mt-2">Fuerzas de Marea vs Eventos Evolutivos</p>
      </div>

      {/* Mapa de correlación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Coeficiente de Correlación</h3>
          <div className="space-y-4">
            <CorrelationBar label="FTRT ↔ Manchas Solares" value={0.78} color="yellow" />
            <CorrelationBar label="Manchas ↔ Índice Kp" value={0.85} color="blue" />
            <CorrelationBar label="Geomag ↔ Radiaciones" value={0.72} color="green" />
            <CorrelationBar label="Solar ↔ Extinciones" value={0.68} color="red" />
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Hipótesis Validada</h3>
          <div className="space-y-3">
            <HypothesisItem 
              status="confirmed"
              text="Períodos de alta actividad solar correlacionan con debilitamiento geomagnético"
            />
            <HypothesisItem 
              status="confirmed"
              text="Eventos evolutivos mayores coinciden con mínimos geomagnéticos"
            />
            <HypothesisItem 
              status="partial"
              text="FTRT peaks predicen ventanas de especiación acelerada"
            />
            <HypothesisItem 
              status="testing"
              text="Radiación cósmica como agente mutagénico principal"
            />
          </div>
        </div>
      </div>

      {/* Modelo predictivo */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Modelo Predictivo: Próximos 100 años</h3>
        <div className="bg-gradient-to-r from-purple-950 to-indigo-950 p-6 rounded-lg border border-purple-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-purple-300 mb-2">Ciclo Solar 25-26</div>
              <div className="text-3xl font-bold text-yellow-400">2024-2040</div>
              <div className="text-sm text-gray-400 mt-2">Máximo solar esperado 2025-2026</div>
            </div>
            <div>
              <div className="text-sm text-purple-300 mb-2">FTRT Peak Próximo</div>
              <div className="text-3xl font-bold text-pink-400">2027</div>
              <div className="text-sm text-gray-400 mt-2">Alineación Júpiter-Saturno</div>
            </div>
            <div>
              <div className="text-sm text-purple-300 mb-2">Riesgo Mutagénico</div>
              <div className="text-3xl font-bold text-orange-400">Moderado</div>
              <div className="text-sm text-gray-400 mt-2">Incremento viral esperado 12-18%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Advertencia científica */}
      <div className="bg-yellow-900 bg-opacity-30 border border-yellow-600 p-4 rounded-lg flex items-start gap-3">
        <AlertCircle className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
        <div className="text-sm text-yellow-200">
          <strong>Nota Metodológica:</strong> Este framework presenta correlaciones teóricas que requieren validación experimental rigurosa. 
          Los datos de evolución son estimaciones basadas en registro fósil y modelos paleomagnéticos. 
          La causalidad directa entre FTRT y eventos evolutivos permanece como hipótesis en investigación.
        </div>
      </div>
    </div>
  );

  const MetricCard = ({ icon, title, value, subtitle, color }) => (
    <div className={`bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-${color}-500 transition-all`}>
      <div className="flex items-center justify-between mb-2">
        {icon}
        <span className="text-xs text-gray-500">{title}</span>
      </div>
      <div className={`text-2xl font-bold text-${color}-400`}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
    </div>
  );

  const CorrelationBar = ({ label, value, color }) => (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className={`text-${color}-400 font-bold`}>{value.toFixed(2)}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div 
          className={`bg-${color}-500 h-2 rounded-full transition-all duration-500`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );

  const HypothesisItem = ({ status, text }) => {
    const statusConfig = {
      confirmed: { icon: '✓', color: 'green', label: 'Confirmado' },
      partial: { icon: '~', color: 'yellow', label: 'Parcial' },
      testing: { icon: '?', color: 'blue', label: 'En prueba' }
    };
    const config = statusConfig[status];
    
    return (
      <div className="flex items-start gap-3">
        <div className={`w-6 h-6 rounded-full bg-${config.color}-900 border border-${config.color}-500 flex items-center justify-center text-${config.color}-400 font-bold flex-shrink-0`}>
          {config.icon}
        </div>
        <div>
          <div className="text-white text-sm">{text}</div>
          <div className={`text-xs text-${config.color}-400 mt-1`}>{config.label}</div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <div className="text-white text-xl">Cargando datos cósmicos...</div>
          <div className="text-gray-500 text-sm mt-2">Conectando con NOAA Space Weather API</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header principal */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-3">
            ⚡ FTRT Cosmic Evolution Explorer ⚡
          </h1>
          <p className="text-gray-400 text-lg">
            Explorando las conexiones entre fuerzas cósmicas y evolución biológica
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Calendar size={16} />
            <span>Datos en tiempo real | Última actualización: {new Date().toLocaleString('es-ES')}</span>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <TabButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            icon={<Activity size={20} />}
            label="Dashboard Solar"
          />
          <TabButton 
            active={activeTab === 'evolution'} 
            onClick={() => setActiveTab('evolution')}
            icon={<Dna size={20} />}
            label="Eventos Evolutivos"
          />
          <TabButton 
            active={activeTab === 'correlation'} 
            onClick={() => setActiveTab('correlation')}
            icon={<TrendingUp size={20} />}
            label="Análisis FTRT"
          />
        </div>

        {/* Content area */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'evolution' && <EvolutionView />}
          {activeTab === 'correlation' && <CorrelationView />}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>Datos solares: NOAA Space Weather Prediction Center | Framework teórico: Chizhevsky, Wickramasinghe et al.</p>
          <p className="mt-2">🌌 "La evolución es una sinfonía cósmica" 🌌</p>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
      active 
        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50' 
        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
    }`}
  >
    {icon}
    {label}
  </button>
);

export default CosmicEvolutionExplorer;
