import React, { useState, useEffect } from 'react';
import { Activity, Zap, Cpu, Wifi, Shield, TrendingUp, Globe, Code, Database, Cloud } from 'lucide-react';

const FuturisticDashboard = () => {
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState({
    cpu: 67,
    memory: 45,
    network: 89,
    security: 95
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const metricsTimer = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(30, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(90, prev.memory + (Math.random() - 0.5) * 8)),
        network: Math.max(50, Math.min(100, prev.network + (Math.random() - 0.5) * 6)),
        security: Math.max(85, Math.min(100, prev.security + (Math.random() - 0.5) * 4))
      }));
    }, 2000);
    return () => clearInterval(metricsTimer);
  }, []);

  const MetricCard = ({ icon: Icon, title, value, unit, color, trend }) => (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={p-3 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">{value}</span>
              <span className="text-gray-400 text-sm">{unit}</span>
            </div>
          </div>
        </div>
        <div className={text-sm px-3 py-1 rounded-full ${trend > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}}>
          {trend > 0 ? '+' : ''}{trend}%
        </div>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-2">
        <div 
          className={h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-1000}
          style={{ width: ${value}% }}
        />
      </div>
    </div>
  );

  const NavItem = ({ id, icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-3 w-full p-4 rounded-xl transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-cyan-300' 
          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-gray-900/30 backdrop-blur-xl border-r border-gray-700/50 p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  NEXUS OS
                </h1>
                <p className="text-gray-400 text-sm">Sistema Avanzado</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 font-mono">
              {time.toLocaleTimeString()} | {time.toLocaleDateString()}
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            <NavItem id="overview" icon={Activity} label="Vista General" isActive={activeTab === 'overview'} onClick={setActiveTab} />
            <NavItem id="performance" icon={Cpu} label="Rendimiento" isActive={activeTab === 'performance'} onClick={setActiveTab} />
            <NavItem id="network" icon={Wifi} label="Red" isActive={activeTab === 'network'} onClick={setActiveTab} />
            <NavItem id="security" icon={Shield} label="Seguridad" isActive={activeTab === 'security'} onClick={setActiveTab} />
            <NavItem id="analytics" icon={TrendingUp} label="Analíticas" isActive={activeTab === 'analytics'} onClick={setActiveTab} />
          </nav>

          {/* Quick Stats */}
          <div className="bg-gray-800/30 rounded-2xl p-4 border border-gray-700/50">
            <h3 className="text-gray-300 text-sm font-medium mb-3">Estado del Sistema</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Uptime</span>
                <span className="text-green-400 text-sm font-mono">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Conectado</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Latencia</span>
                <span className="text-cyan-400 text-sm font-mono">12ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Dashboard Principal
              </h2>
              <p className="text-gray-400 mt-1">Monitoreo avanzado en tiempo real</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
                Exportar Datos
              </button>
              <button className="bg-gray-800/50 hover:bg-gray-700/50 px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50">
                Configurar
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-all duration-300">
                    Tiempo Real
                  </button>
                  <button className="px-4 py-2 text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-700/50 transition-all duration-300">
                    Histórico
                  </button>
                </div>
              </div>
              <div className="relative h-64 flex items-end justify-between space-x-2">
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-cyan-500/80 to-purple-500/80 rounded-t-lg relative overflow-hidden group">
                    <div 
                      className="bg-gradient-to-t from-cyan-400 to-purple-400 rounded-t-lg transition-all duration-1000"
                      style={{ height: ${Math.random() * 80 + 20}% }}
                    />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-gray-400 text-xs mt-4">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Estado del Sistema</h3>
              <div className="space-y-4">
                {[
                  { label: 'Servidor Principal', status: 'online', color: 'bg-green-400' },
                  { label: 'Base de Datos', status: 'online', color: 'bg-green-400' },
                  { label: 'API Gateway', status: 'warning', color: 'bg-yellow-400' },
                  { label: 'Cache Redis', status: 'online', color: 'bg-green-400' },
                  { label: 'CDN Global', status: 'online', color: 'bg-green-400' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className={w-3 h-3 ${item.color} rounded-full animate-pulse} />
                      <span className="text-gray-300 text-sm font-medium">{item.label}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
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
          <div className="mt-8 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Tecnologías Implementadas</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Code, label: 'React 18', color: 'from-blue-400 to-cyan-400' },
                { icon: Database, label: 'PostgreSQL', color: 'from-indigo-400 to-purple-400' },
                { icon: Cloud, label: 'AWS Cloud', color: 'from-orange-400 to-yellow-400' },
                { icon: Globe, label: 'GraphQL', color: 'from-pink-400 to-rose-400' },
                { icon: Zap, label: 'Node.js', color: 'from-green-400 to-emerald-400' }
              ].map((tech, i) => (
                <div key={i} className="group relative">
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 text-center hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105">
                    <div className={w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300}>
                      <tech.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">{tech.label}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Data Stream */}
          <div className="mt-8 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Flujo de Datos en Tiempo Real</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">En Vivo</span>
              </div>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="flex items-center space-x-4 p-3 bg-gray-800/20 rounded-lg border border-gray-700/30 font-mono text-sm animate-pulse">
                  <span className="text-gray-500">{time.toLocaleTimeString()}</span>
                  <span className="text-cyan-400">INFO</span>
                  <span className="text-gray-300">Sistema procesando {Math.floor(Math.random() * 1000) + 100} peticiones/sec</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-full border border-gray-600/50">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-300 text-sm">Sistema Operativo • Versión 2.4.1 • Build 20250901</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-110 group">
        <Zap className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
      </button>

      {/* Animated cursor trail effect */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.3); }
          50% { box-shadow: 0 0 40px rgba(34, 211, 238, 0.6); }
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FuturisticDashboard;
