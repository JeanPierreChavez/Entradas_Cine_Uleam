'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Efectos de fondo animados con dorado y rojo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-600/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/15 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Efectos de luz cinematográfica */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full px-6 py-6 sm:px-8 border-b border-amber-900/30">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🎬</span>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
                Cineverse
              </span>
            </div>
            <Link
              href="/login"
              className="px-8 py-3 text-sm font-bold text-black bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-full hover:from-amber-400 hover:via-yellow-400 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/50 hover:scale-105 border-2 border-amber-600 hover:border-amber-400 uppercase tracking-wider"
            >
              Iniciar Sesión
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6 sm:px-8 py-12">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            {/* Título principal */}
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_40px_rgba(251,191,36,0.6)]">
                  Tu Cine
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                  Universitario
                </span>
              </h1>
              <div className="flex items-center justify-center gap-4">
                <div className="w-20 h-1 bg-gradient-to-r from-transparent to-amber-500"></div>
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                <div className="w-20 h-1 bg-gradient-to-l from-transparent to-red-600"></div>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-2xl sm:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Disfruta de las mejores películas{' '}
              <span className="text-amber-400 font-bold">completamente gratis</span>. 
              <br className="hidden sm:block" />
              Reserva tu entrada y vive la{' '}
              <span className="text-red-400 font-bold">experiencia del cine</span> sin salir de la universidad.
            </p>

            {/* Características destacadas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-amber-950/30 to-black rounded-2xl p-8 border-2 border-amber-800/50 hover:border-amber-600 transition-all duration-300 hover:scale-105 group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">🎟️</div>
                  <h3 className="font-bold text-xl mb-3 text-amber-400">Entradas Gratis</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Todas las funciones son completamente gratuitas para estudiantes universitarios
                  </p>
                </div>
              </div>
              
              <div className="relative bg-gradient-to-br from-red-950/30 to-black rounded-2xl p-8 border-2 border-red-800/50 hover:border-red-600 transition-all duration-300 hover:scale-105 group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">📱</div>
                  <h3 className="font-bold text-xl mb-3 text-red-400">Reserva Fácil</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Reserva tus entradas en segundos con nuestro sistema simple e intuitivo
                  </p>
                </div>
              </div>
              
              <div className="relative bg-gradient-to-br from-amber-950/30 to-black rounded-2xl p-8 border-2 border-amber-800/50 hover:border-amber-600 transition-all duration-300 hover:scale-105 group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4">🎬</div>
                  <h3 className="font-bold text-xl mb-3 text-amber-400">Cartelera Actual</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Las mejores películas disponibles en horarios convenientes para ti
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Principal */}
            <div className="pt-10">
              <Link
                href="/login"
                className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-black text-black bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-full hover:from-amber-400 hover:via-yellow-400 hover:to-amber-400 transition-all duration-300 shadow-2xl hover:shadow-amber-500/60 hover:scale-110 transform border-4 border-amber-600/50 hover:border-amber-400 uppercase tracking-widest overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                <span className="relative z-10 flex items-center gap-3">
                  <span>Iniciar Sesión</span>
                  <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                </span>
              </Link>
            </div>

            {/* Texto adicional */}
            <p className="text-gray-500 text-sm mt-8 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              Sin registro complicado • Acceso directo • 100% Gratuito
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full px-6 py-8 sm:px-8 border-t border-amber-900/30">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-500 text-sm mb-4">
              Cineverse - Sistema de reservas para estudiantes universitarios
            </p>
            <div className="flex justify-center gap-8">
              <Link href="/empleado" className="text-gray-600 hover:text-amber-400 text-sm transition-colors font-semibold">
                👨‍💼 Empleados
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-red-400 text-sm transition-colors font-semibold">
                📊 Administración
              </Link>
            </div>
          </div>
        </footer>
      </div>

      {/* Estilos para animación */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
