'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validación simple
    if (!formData.nombre.trim()) {
      setError('Por favor ingresa tu nombre');
      setLoading(false);
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Por favor ingresa un email válido');
      setLoading(false);
      return;
    }

    // Simular inicio de sesión (guardar en localStorage)
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        nombre: formData.nombre.trim(),
        email: formData.email.trim().toLowerCase(),
        loggedIn: true,
      }));
      setLoading(false);
      router.push('/cartelera');
    }, 500);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      {/* Líneas decorativas */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-5xl">🎬</span>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
                Cineverse
              </span>
            </div>
          </Link>
          <h1 className="text-4xl font-black text-white mb-3">
            Iniciar Sesión
          </h1>
          <p className="text-gray-400">
            Accede a nuestra cartelera de cine
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-gradient-to-br from-amber-950/20 to-black rounded-2xl p-8 border-2 border-amber-800/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-semibold text-amber-400 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border-2 border-amber-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-red-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border-2 border-red-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                placeholder="tu.email@ejemplo.com"
                required
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-950/50 border-2 border-red-600/50 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-400 text-black font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-amber-600/50 hover:border-amber-400 uppercase tracking-wider relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <span>Ingresar</span>
                    <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>

          {/* Información adicional */}
          <div className="mt-6 pt-6 border-t border-amber-800/30">
            <p className="text-gray-500 text-sm text-center">
              Al iniciar sesión, aceptas nuestros términos y condiciones
            </p>
          </div>

          {/* Link de regreso */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors inline-flex items-center gap-2"
            >
              <span>←</span>
              <span>Volver al inicio</span>
            </Link>
          </div>
        </div>

        {/* Características */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-amber-950/20 rounded-lg p-4 border border-amber-800/30">
            <div className="text-2xl mb-2">🎟️</div>
            <p className="text-xs text-gray-400">Gratis</p>
          </div>
          <div className="bg-red-950/20 rounded-lg p-4 border border-red-800/30">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-xs text-gray-400">Rápido</p>
          </div>
          <div className="bg-amber-950/20 rounded-lg p-4 border border-amber-800/30">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-xs text-gray-400">Seguro</p>
          </div>
        </div>
      </div>
    </div>
  );
}
