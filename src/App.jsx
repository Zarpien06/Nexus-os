import React, { useState, useEffect } from 'react';
import { Activity, Zap, Cpu, Wifi, Shield, TrendingUp, Globe, Code, Database, Cloud, Terminal, Monitor, Settings, Users, Bell, Search, Menu, X, ChevronRight, Play, Pause, RotateCcw, Download } from 'lucide-react';

const App = () => {
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [metrics, setMetrics] = useState({
    cpu: 67,
    memory: 45,
    network: 89,
    security: 95,
    temperature: 42,
    uptime: 99.9
  });

  // Real-time updates
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    
    const metricsTimer = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(30, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(90, prev.memory + (Math.random() - 0.5) * 8)),
        network: Math.max(50, Math.min(100, prev.network + (Math.random() - 0.5) * 6)),
        security: Math.max(85, Math.min(100, prev.security + (Math.random() - 0.5) * 4)),
        temperature: Math.max(35, Math.min(65, prev.temperature + (Math.random() - 0.5) * 3)),
        uptime: Math.max(95, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.1))
      }));
    }, 2000);
    return () => clearInterval(metricsTimer);
  }, [isPlaying]);

  // Generate notifications
  useEffect(() => {
    const notificationTimer = setInterval(() => {
      const messages = [
        'Sistema optimizado automáticamente',
        'Nueva conexión establecida',
        'Backup completado exitosamente',
        'Actualizaciones de seguridad aplicadas',
        'Rendimiento mejorado en 15%',
        'Cache limpiado automáticamente'
      ];
      
      const newNotification = {
        id: Date.now(),
        message: messages[Math.floor(Math.random() * messages.length)],
        time: new Date(),
        type: Math.random() > 0.8 ? 'warning' : 'info'
      };
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
    }, 5000);
    
    return () => clearInterval(notificationTimer);
  }, []);

  const MetricCard = ({ icon: Icon, title, value, unit, color, trend, subtitle }) => (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-500 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
              {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">{typeof value === 'number' ? value.toFixed(1) : value}</span>
                <span className="text-gray-400 text-sm">{unit}</span>
              </div>
            </div>
          </div>
          <div className={`text-sm px-3 py-1 rounded-full font-medium ${trend > 0 ? 'bg-green-500/20 text-green-400' : trend < 0 ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        </div>
        
        <div className="w-full bg-gray-700/50 rounded-full h-2 mb-3">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-1000 shadow-lg`}
            style={{ width: `${typeof value === 'number' ? value : 0}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );

  const NavItem = ({ id, icon: Icon, label, isActive, onClick, badge }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center justify-between w-full p-4 rounded-xl transition-all duration-300 group ${
        isActive 
          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/25' 
          : 'text-gray-400 hover:text-white hover:bg-gray-800/50 hover:border-gray-600/50 border border-transparent'
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
        <span className="font-medium">{label}</span>
      </div>
      {badge && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );

  const TabContent = () => {
    switch(activeTab) {
      case 'performance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard 
                icon={Cpu} 
                title="Procesador" 
                subtitle="Intel Core i9"
                value={metrics.cpu} 
                unit="%" 
                color="from-blue-500 to-cyan-500"
                trend={2.4}
              />
              <MetricCard 
                icon={Database} 
                title="Memoria RAM" 
                subtitle="32GB DDR5"
                value={metrics.memory} 
                unit="%" 
                color="from-purple-500 to-pink-500"
                trend={-1.2}
              />
              <MetricCard 
                icon={Monitor} 
                title="Temperatura" 
                subtitle="CPU Core Avg"
                value={metrics.temperature} 
                unit="°C" 
                color="from-orange-500 to-red-500"
                trend={0.8}
              />
            </div>
          </div>
        );
      
      case 'network':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricCard 
                icon={Wifi} 
                title="Velocidad de Red" 
                subtitle="Ethernet Gigabit"
                value={metrics.network} 
                unit="Mbps" 
                color="from-green-500 to-emerald-500"
                trend={5.7}
              />
              <MetricCard 
                icon={Globe} 
                title="Latencia Global" 
                subtitle="Ping promedio"
                value={12} 
                unit="ms" 
                color="from-cyan-500 to-blue-500"
                trend={-2.1}
              />
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricCard 
                icon={Shield} 
                title="Nivel de Seguridad" 
                subtitle="Protección activa"
                value={metrics.security} 
                unit="%" 
                color="from-green-500 to-emerald-500"
                trend={0.5}
              />
              <MetricCard 
                icon={Activity} 
                title="Amenazas Bloqueadas" 
                subtitle="Últimas 24h"
                value={247} 
                unit="ataques" 
                color="from-red-500 to-orange-500"
                trend={-15.3}
              />
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard 
                icon={Cpu} 
                title="CPU Usage" 
                value={metrics.cpu} 
                unit="%" 
                color="from-blue-500 to-cyan-500"
                trend={2.4}
              />
              <MetricCard 
                icon={Database} 
                title="Memoria" 
                value={metrics.memory} 
                unit="%" 
                color="from-purple-500 to-pink-500"
                trend={-1.2}
              />
              <MetricCard 
                icon={Globe} 
                title="Red" 
                value={metrics.network} 
                unit="Mbps" 
                color="from-green-500 to-emerald-500"
                trend={5.7}
              />
              <MetricCard 
                icon={Shield} 
                title="Seguridad" 
                value={metrics.security} 
                unit="%" 
                color="from-orange-500 to-red-500"
                trend={0.8}
              />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Activity Chart */}
              <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Actividad del Sistema</h3>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-all duration-300"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isPlaying ? 'Pausar' : 'Reanudar'}</span>
                    </button>
                    <button className="px-4 py-2 text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-700/50 transition-all duration-300">
                      Histórico
                    </button>
                  </div>
                </div>
                <div className="relative h-64 flex items-end justify-between space-x-2">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-cyan-500/20 to-purple-500/20 rounded-t-lg relative overflow-hidden group">
                      <div 
                        className={`bg-gradient-to-t from-cyan-400 to-purple-400 rounded-t-lg transition-all duration-1000 ${isPlaying ? 'animate-pulse' : ''}`}
                        style={{ 
                          height: `${Math.random() * 80 + 20}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-gray-400 text-xs mt-4 font-mono">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>24:00</span>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Estado del Sistema</h3>
                  <button className="text-gray-400 hover:text-white transition-colors duration-300">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Servidor Principal', status: 'online', color: 'bg-green-400', load: '23%' },
                    { label: 'Base de Datos', status: 'online', color: 'bg-green-400', load: '67%' },
                    { label: 'API Gateway', status: 'warning', color: 'bg-yellow-400', load: '89%' },
                    { label: 'Cache Redis', status: 'online', color: 'bg-green-400', load: '34%' },
                    { label: 'CDN Global', status: 'online', color: 'bg-green-400', load: '12%' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 group">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${item.color} rounded-full animate-pulse`} />
                        <div>
                          <span className="text-gray-300 text-sm font-medium block">{item.label}</span>
                          <span className="text-gray-500 text-xs">Carga: {item.load}</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technologies Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Stack Tecnológico</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { icon: Code, label: 'React 18', color: 'from-blue-400 to-cyan-400', status: 'v18.2.0' },
                  { icon: Database, label: 'PostgreSQL', color: 'from-indigo-400 to-purple-400', status: 'v15.3' },
                  { icon: Cloud, label: 'AWS Cloud', color: 'from-orange-400 to-yellow-400', status: 'Active' },
                  { icon: Globe, label: 'GraphQL', color: 'from-pink-400 to-rose-400', status: 'v16.6' },
                  { icon: Zap, label: 'Node.js', color: 'from-green-400 to-emerald-400', status: 'v20.5' }
                ].map((tech, i) => (
                  <div key={i} className="group relative">
                    <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 text-center hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105">
                      <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                        <tech.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm font-medium block">{tech.label}</span>
                      <span className="text-gray-500 text-xs">{tech.status}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Data Stream */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Flujo de Datos en Tiempo Real</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">En Vivo</span>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors duration-300">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {notifications.map((notification, i) => (
                  <div key={notification.id} className="flex items-center space-x-4 p-3 bg-gray-800/20 rounded-lg border border-gray-700/30 font-mono text-sm hover:bg-gray-800/40 transition-all duration-300">
                    <span className="text-gray-500 text-xs">{notification.time.toLocaleTimeString()}</span>
                    <span className={`text-xs px-2 py-1 rounded ${notification.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                      {notification.type.toUpperCase()}
                    </span>
                    <span className="text-gray-300 flex-1">{notification.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        
        {/* Matrix-like falling effect */}
        {Array.from({ length: 20 }, (_, i) => (
          <div 
            key={i}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent animate-matrix"
            style={{
              left: `${(i + 1) * 5}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-20'} bg-gray-900/30 backdrop-blur-xl border-r border-gray-700/50 transition-all duration-500 ease-in-out`}>
          <div className="p-6">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                {sidebarOpen && (
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      NEXUS OS
                    </h1>
                    <p className="text-gray-400 text-sm">Sistema Avanzado</p>
                  </div>
                )}
              </div>
              {sidebarOpen && (
                <div className="text-xs text-gray-500 font-mono">
                  {time.toLocaleTimeString()} | {time.toLocaleDateString()}
                </div>
              )}
            </div>

            {/* Toggle Sidebar */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="absolute top-6 -right-3 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300"
            >
              {sidebarOpen ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
            </button>

            {/* Navigation */}
            <nav className="space-y-2 mb-8">
              <NavItem 
                id="overview" 
                icon={Activity} 
                label={sidebarOpen ? "Vista General" : ""} 
                isActive={activeTab === 'overview'} 
                onClick={setActiveTab} 
              />
              <NavItem 
                id="performance" 
                icon={Cpu} 
                label={sidebarOpen ? "Rendimiento" : ""} 
                isActive={activeTab === 'performance'} 
                onClick={setActiveTab} 
              />
              <NavItem 
                id="network" 
                icon={Wifi} 
                label={sidebarOpen ? "Red" : ""} 
                isActive={activeTab === 'network'} 
                onClick={setActiveTab} 
              />
              <NavItem 
                id="security" 
                icon={Shield} 
                label={sidebarOpen ? "Seguridad" : ""} 
                isActive={activeTab === 'security'} 
                onClick={setActiveTab} 
                badge={notifications.filter(n => n.type === 'warning').length || undefined}
              />
              <NavItem 
                id="analytics" 
                icon={TrendingUp} 
                label={sidebarOpen ? "Analíticas" : ""} 
                isActive={activeTab === 'analytics'} 
                onClick={setActiveTab} 
              />
              <NavItem 
                id="terminal" 
                icon={Terminal} 
                label={sidebarOpen ? "Terminal" : ""} 
                isActive={activeTab === 'terminal'} 
                onClick={setActiveTab} 
              />
            </nav>

            {/* Quick Stats */}
            {sidebarOpen && (
              <div className="bg-gray-800/30 rounded-2xl p-4 border border-gray-700/50">
                <h3 className="text-gray-300 text-sm font-medium mb-3">Estado del Sistema</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Uptime</span>
                    <span className="text-green-400 text-sm font-mono">{metrics.uptime.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Conectado</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Latencia</span>
                    <span className="text-cyan-400 text-sm font-mono">12ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Usuarios</span>
                    <span className="text-purple-400 text-sm font-mono">1,247</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="bg-gray-900/30 backdrop-blur-xl border-b border-gray-700/50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {activeTab === 'overview' && 'Dashboard Principal'}
                    {activeTab === 'performance' && 'Monitor de Rendimiento'}
                    {activeTab === 'network' && 'Estado de Red'}
                    {activeTab === 'security' && 'Centro de Seguridad'}
                    {activeTab === 'analytics' && 'Analíticas Avanzadas'}
                    {activeTab === 'terminal' && 'Terminal del Sistema'}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {activeTab === 'overview' && 'Monitoreo avanzado en tiempo real'}
                    {activeTab === 'performance' && 'Métricas de sistema y hardware'}
                    {activeTab === 'network' && 'Conectividad y transferencia de datos'}
                    {activeTab === 'security' && 'Protección y amenazas detectadas'}
                    {activeTab === 'analytics' && 'Insights y tendencias del sistema'}
                    {activeTab === 'terminal' && 'Interfaz de línea de comandos'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Buscar..."
                    className="bg-gray-800/50 border border-gray-700/50 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all duration-300"
                  />
                </div>
                
                <button className="relative p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50">
                  <Bell className="w-5 h-5 text-gray-400" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
                  Exportar Datos
                </button>
                
                <button className="p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50">
                  <Settings className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-8 overflow-y-auto">
            <TabContent />
            
            {/* Footer Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">2.4M</div>
                <div className="text-gray-400 text-sm">Peticiones/día</div>
              </div>
              <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">99.9%</div>
                <div className="text-gray-400 text-sm">Disponibilidad</div>
              </div>
              <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">1,247</div>
                <div className="text-gray-400 text-sm">Usuarios activos</div>
              </div>
              <div className="bg-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">847TB</div>
                <div className="text-gray-400 text-sm">Datos procesados</div>
              </div>
            </div>

            {/* System Info Footer */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-full border border-gray-600/50">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-300 text-sm font-mono">Sistema Operativo • Versión 2.4.1 • Build 20250901 • React {React.version}</span>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-110 group z-50">
        <Zap className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
      </button>

      {/* Loading overlay for transitions */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300" />
    </div>
  );
};

export default App;
