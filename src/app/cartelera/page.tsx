'use client';

import { useEffect, useState } from 'react';
import { getPeliculas } from '@/lib/supabase/supabasee';
import Link from 'next/link';

// Define el tipo de Película
interface Pelicula {
  id: string;
  titulo: string;
  descripcion: string | null;
  duracion: number | null;
  imagen_url: string | null;
  created_at: string;
}

export default function CarteleraPage() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPeliculas();
  }, []);

  async function cargarPeliculas() {
    try {
      const data = await getPeliculas();
      setPeliculas(data);
    } catch (error) {
      console.error('Error cargando películas:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mb-4"></div>
          <div className="text-white text-xl font-semibold">Cargando películas...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header con efecto de luz cinematográfico */}
      <div className="relative overflow-hidden border-b border-red-900/30">
        {/* Efecto de cortinas laterales */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/5 via-transparent to-red-950/5"></div>
        {/* Líneas decorativas superiores */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 mb-4 drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] tracking-tight">
              🎬 CineVerse
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-6"></div>
            <p className="text-2xl md:text-3xl text-amber-100 mb-3 font-light tracking-wide">
              Cartelera de Cine Estudiantil
            </p>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Selecciona una película para ver los horarios disponibles y reservar tu entrada
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-12">
        {peliculas.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎭</div>
            <div className="text-amber-100 text-xl font-semibold mb-2">
              No hay películas disponibles
            </div>
            <div className="text-gray-500">
              Vuelve pronto para ver nuestra cartelera
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {peliculas.map((pelicula) => (
              <Link
                key={pelicula.id}
                href={`/funciones/${pelicula.id}`}
                className="group block"
              >
                <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl hover:shadow-red-900/50 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] border-2 border-gray-900 hover:border-red-600 group-hover:border-amber-500/50">
                  {/* Imagen con overlay */}
                  <div className="aspect-[2/3] bg-gradient-to-br from-gray-950 to-black relative overflow-hidden">
                    <img
                      src={pelicula.imagen_url || '/placeholder-movie.jpg'}
                      alt={pelicula.titulo}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-movie.jpg';
                      }}
                    />
                    {/* Overlay gradiente rojo en hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {/* Badge de duración estilo dorado */}
                    <div className="absolute top-3 right-3 bg-black/90 backdrop-blur-md text-amber-300 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-amber-600/50 shadow-lg shadow-amber-900/50">
                      <span>⏱️</span>
                      <span>{pelicula.duracion || 0} min</span>
                    </div>
                    {/* Efecto de brillo dorado en hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    {/* Borde superior dorado en hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Contenido de la tarjeta */}
                  <div className="p-5 md:p-6 relative bg-black">
                    <h2 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2 drop-shadow-lg">
                      {pelicula.titulo}
                    </h2>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {pelicula.descripcion || 'Sin descripción disponible'}
                    </p>
                    
                    {/* Botón de acción */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800 group-hover:border-red-900/50 transition-colors">
                      <span className="text-red-500 text-sm font-semibold flex items-center gap-2 group-hover:text-amber-400 group-hover:gap-3 transition-all uppercase tracking-wide">
                        Ver funciones
                        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </span>
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-red-600 to-red-700 group-hover:from-amber-500 group-hover:to-amber-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-red-900/50 group-hover:shadow-amber-900/50">
                        <span className="text-white text-sm font-bold">→</span>
                      </div>
                    </div>
                  </div>

                  {/* Efecto de borde brillante dorado/rojo */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/10 via-amber-500/20 to-red-600/10 blur-2xl"></div>
                  </div>
                  {/* Esquinas decorativas */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-600/0 group-hover:border-amber-600 transition-colors duration-300"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-600/0 group-hover:border-amber-600 transition-colors duration-300"></div>
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-red-600/0 group-hover:border-red-600 transition-colors duration-300"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-red-600/0 group-hover:border-red-600 transition-colors duration-300"></div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="mt-16 flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d851.9558584393305!2d-80.74610610905899!3d-0.9538358149898003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e0!4m3!3m2!1d-0.9536812!2d-80.7460947!4m3!3m2!1d-0.9536903!2d-80.7460924!5e0!3m2!1ses-419!2sec!4v1762539422296!5m2!1ses-419!2sec"
            width="400"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow-lg shadow-red-800/40"
          ></iframe>
        </div>

        {/* Botones de acceso con estilo cinematográfico */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          <Link
            href="/empleado"
            className="group relative inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white bg-gradient-to-r from-red-700 via-red-600 to-red-700 rounded-lg hover:from-red-600 hover:via-red-500 hover:to-red-600 transition-all duration-300 shadow-2xl hover:shadow-red-600/50 hover:scale-105 overflow-hidden border-2 border-red-800 hover:border-red-500 uppercase tracking-wider"
          >
            <span className="relative z-10 flex items-center gap-3">
              👨‍💼 Acceso Empleados
            </span>
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            {/* Resplandor dorado en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/30 group-hover:to-amber-400/30 transition-all duration-300 rounded-lg"></div>
          </Link>

          <Link
            href="/admin"
            className="group relative inline-flex items-center justify-center px-10 py-4 text-base font-bold text-black bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-lg hover:from-amber-400 hover:via-yellow-400 hover:to-amber-400 transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 hover:scale-105 overflow-hidden border-2 border-amber-600 hover:border-amber-400 uppercase tracking-wider"
          >
            <span className="relative z-10 flex items-center gap-3">
              📊 Panel Administrativo
            </span>
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            {/* Resplandor rojo en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/20 group-hover:to-red-500/20 transition-all duration-300 rounded-lg"></div>
          </Link>
        </div>
        
        {/* Línea decorativa inferior */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-red-900/50"></div>
          <p className="text-gray-600 text-center text-sm uppercase tracking-widest">
            Acceso exclusivo para personal autorizado
          </p>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-red-900/50"></div>
        </div>
        
        {/* Efecto de cortinas inferiores */}
        <div className="mt-12 h-2 bg-gradient-to-r from-red-950/30 via-transparent to-red-950/30"></div>
      </div>
    </div>
  );
}

