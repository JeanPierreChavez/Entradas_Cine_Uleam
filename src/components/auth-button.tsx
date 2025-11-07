import Link from 'next/link';

export function AuthButton() {
  return (
    <Link
      href="/login"
      className="px-8 py-3 text-sm font-bold text-black bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-full hover:from-amber-400 hover:via-yellow-400 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/50 hover:scale-105 border-2 border-amber-600 hover:border-amber-400 uppercase tracking-wider"
    >
      Iniciar Sesión
    </Link>
  );
}

