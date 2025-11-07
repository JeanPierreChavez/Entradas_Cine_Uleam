// components/admin/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-slate-900 text-white p-4">
      <h2 className="text-lg font-bold mb-6">🎬 Admin Panel</h2>
      <nav className="space-y-2">
        <Link href="/admin" className={pathname === '/admin' ? 'text-blue-400' : ''}>
          Dashboard
        </Link>
        <Link href="/admin/peliculas">Películas</Link>
        <Link href="/admin/funciones">Funciones</Link>
        <Link href="/admin/reservas">Reservas</Link>
      </nav>
    </aside>
  );
}
