'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getEstadisticasGenerales,
  getPeliculasPopulares,
  getUltimasReservas
} from '@/lib/supabase/supabase-admin';

interface Estadisticas {
  totalReservas: number;
  asistieron: number;
  noPresentados: number;
  pendientes: number;
  tasaAsistencia: number;
  ocupacionPromedio: number;
}

interface PeliculaPopular {
  titulo: string;
  total_reservas: number;
  porcentaje: number;
}

interface ReservaReciente {
  id: string;
  nombre_estudiante: string;
  email_estudiante: string;
  cantidad_entradas: number;
  usado: boolean;
  funciones: {
    fecha: string;
    hora: string;
    peliculas: {
      titulo: string;
    };
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Estadisticas | null>(null);
  const [peliculasPopulares, setPeliculasPopulares] = useState<PeliculaPopular[]>([]);
  const [reservasRecientes, setReservasRecientes] = useState<ReservaReciente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      const [estadisticas, peliculas, reservas] = await Promise.all([
        getEstadisticasGenerales(),
        getPeliculasPopulares(),
        getUltimasReservas(5)
      ]);

      setStats(estadisticas);
      setPeliculasPopulares(peliculas);
      setReservasRecientes(reservas as unknown as ReservaReciente[]);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl">Cargando dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-8 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Resumen general del sistema</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Última actualización</p>
            <p className="text-sm font-semibold text-white">
              {new Date().toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8 space-y-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Reservas */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-semibold">Total Reservas</h3>
              <span className="text-3xl">🎟️</span>
            </div>
            <p className="text-4xl font-bold text-white">{stats?.totalReservas || 0}</p>
            <p className="text-sm text-slate-400 mt-2">Todas las reservas del sistema</p>
          </div>

          {/* Asistieron */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-green-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-semibold">Asistieron</h3>
              <span className="text-3xl">✅</span>
            </div>
            <p className="text-4xl font-bold text-green-400">{stats?.asistieron || 0}</p>
            <p className="text-sm text-green-300 mt-2">
              {/* Usar valor por defecto si tasaAsistencia es undefined para evitar calling toFixed on undefined */}
              {(stats?.tasaAsistencia ?? 0).toFixed(1)}% tasa de asistencia
            </p>
          </div>

          {/* No Presentados */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-red-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-semibold">No Presentados</h3>
              <span className="text-3xl">❌</span>
            </div>
            <p className="text-4xl font-bold text-red-400">{stats?.noPresentados || 0}</p>
            <p className="text-sm text-red-300 mt-2">
              {((stats?.noPresentados || 0) / (stats?.totalReservas || 1) * 100).toFixed(1)}% ausentismo
            </p>
          </div>

          {/* Pendientes */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-amber-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-semibold">Pendientes</h3>
              <span className="text-3xl">⏳</span>
            </div>
            <p className="text-4xl font-bold text-amber-400">{stats?.pendientes || 0}</p>
            <p className="text-sm text-amber-300 mt-2">
              Funciones futuras sin validar
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Películas Populares */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">🎬 Películas Más Populares</h3>
              <Link href="/admin/estadisticas" className="text-sm text-blue-400 hover:text-blue-300">
                Ver más →
              </Link>
            </div>
            
            {peliculasPopulares.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No hay datos disponibles</p>
            ) : (
              <div className="space-y-4">
                {peliculasPopulares.map((pelicula, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-300 font-medium">
                        {index + 1}. {pelicula.titulo}
                      </span>
                      <span className="text-sm font-bold text-blue-400">
                        {pelicula.total_reservas} reservas
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${pelicula.porcentaje}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Estado de Reservas */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-6">📊 Distribución de Estados</h3>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                {/* Círculo de fondo */}
                <svg className="w-48 h-48 transform -rotate-90">
                  {/* Asistieron */}
                  <circle
                    cx="96"
                    cy="96"
                    r="70"
                    stroke="#10b981"
                    strokeWidth="24"
                    fill="none"
                    strokeDasharray={`${(stats?.asistieron || 0) / (stats?.totalReservas || 1) * 440} 440`}
                  />
                  {/* Pendientes */}
                  <circle
                    cx="96"
                    cy="96"
                    r="70"
                    stroke="#f59e0b"
                    strokeWidth="24"
                    fill="none"
                    strokeDasharray={`${(stats?.pendientes || 0) / (stats?.totalReservas || 1) * 440} 440`}
                    strokeDashoffset={`-${(stats?.asistieron || 0) / (stats?.totalReservas || 1) * 440}`}
                  />
                  {/* No presentados */}
                  <circle
                    cx="96"
                    cy="96"
                    r="70"
                    stroke="#ef4444"
                    strokeWidth="24"
                    fill="none"
                    strokeDasharray={`${(stats?.noPresentados || 0) / (stats?.totalReservas || 1) * 440} 440`}
                    strokeDashoffset={`-${((stats?.asistieron || 0) + (stats?.pendientes || 0)) / (stats?.totalReservas || 1) * 440}`}
                  />
                </svg>
                
                {/* Número central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">{stats?.totalReservas || 0}</p>
                    <p className="text-sm text-slate-400">Total</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Leyenda */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-xs text-slate-400">Asistieron</p>
                <p className="text-lg font-bold text-green-400">
                  {((stats?.asistieron || 0) / (stats?.totalReservas || 1) * 100).toFixed(0)}%
                </p>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-amber-500 rounded-full mx-auto mb-2"></div>
                <p className="text-xs text-slate-400">Pendientes</p>
                <p className="text-lg font-bold text-amber-400">
                  {((stats?.pendientes || 0) / (stats?.totalReservas || 1) * 100).toFixed(0)}%
                </p>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2"></div>
                <p className="text-xs text-slate-400">No asistieron</p>
                <p className="text-lg font-bold text-red-400">
                  {((stats?.noPresentados || 0) / (stats?.totalReservas || 1) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reservations */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">📋 Últimas Reservas</h3>
            <Link href="/admin/reservas" className="text-sm text-blue-400 hover:text-blue-300">
              Ver todas →
            </Link>
          </div>
          
          {reservasRecientes.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No hay reservas aún</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-slate-400 border-b border-slate-700">
                    <th className="pb-3 font-semibold">Estudiante</th>
                    <th className="pb-3 font-semibold">Película</th>
                    <th className="pb-3 font-semibold">Fecha/Hora</th>
                    <th className="pb-3 font-semibold">Entradas</th>
                    <th className="pb-3 font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {reservasRecientes.map((reserva) => {
                    // Proteger fecha/hora en caso de datos incompletos
                    const fechaHoraStr = `${reserva.funciones.fecha ?? ''}T${reserva.funciones.hora ?? ''}`;
                    const fechaFuncion = new Date(fechaHoraStr);
                    const esPasada = !isNaN(fechaFuncion.getTime()) ? fechaFuncion < new Date() : false;
                    
                    return (
                      <tr key={reserva.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                        <td className="py-4">
                          <div>
                            <p className="font-medium text-white">{reserva.nombre_estudiante}</p>
                            <p className="text-xs text-slate-400">{reserva.email_estudiante}</p>
                          </div>
                        </td>
                        <td className="py-4 text-slate-300">{reserva.funciones.peliculas.titulo}</td>
                        <td className="py-4 text-slate-300">
                          {new Date(reserva.funciones.fecha).toLocaleDateString('es-ES')}
                          <br />
                          <span className="text-xs text-slate-400">
                            {/* Evitar substring sobre undefined */}
                            {reserva.funciones.hora ? reserva.funciones.hora.substring(0, 5) : '--:--'}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-xs font-semibold">
                            {reserva.cantidad_entradas}
                          </span>
                        </td>
                        <td className="py-4">
                          {reserva.usado ? (
                            <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-xs font-semibold">
                              ✓ Asistió
                            </span>
                          ) : esPasada ? (
                            <span className="px-3 py-1 bg-red-900/50 text-red-300 rounded-full text-xs font-semibold">
                              ✗ No asistió
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-amber-900/50 text-amber-300 rounded-full text-xs font-semibold">
                              ⏳ Pendiente
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/peliculas/nueva"
            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 border border-blue-500 hover:border-blue-400 transition-all hover:scale-105"
          >
            <span className="text-4xl mb-3 block">🎬</span>
            <h3 className="text-lg font-bold text-white mb-2">Nueva Película</h3>
            <p className="text-sm text-blue-100">Agregar película a la cartelera</p>
          </Link>

          <Link
            href="/admin/funciones/nueva"
            className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 border border-purple-500 hover:border-purple-400 transition-all hover:scale-105"
          >
            <span className="text-4xl mb-3 block">🎫</span>
            <h3 className="text-lg font-bold text-white mb-2">Nueva Función</h3>
            <p className="text-sm text-purple-100">Programar horario de película</p>
          </Link>

          <Link
            href="/admin/reservas"
            className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 border border-green-500 hover:border-green-400 transition-all hover:scale-105"
          >
            <span className="text-4xl mb-3 block">📋</span>
            <h3 className="text-lg font-bold text-white mb-2">Ver Reservas</h3>
            <p className="text-sm text-green-100">Gestionar todas las reservas</p>
          </Link>
        </div>
      </div>
    </div>
  );
}