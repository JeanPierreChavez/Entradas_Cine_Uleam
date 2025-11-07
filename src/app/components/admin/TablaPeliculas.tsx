'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function PeliculasTable({ peliculas, loading, onEliminar }: any) {
  if (loading) return <p className="text-center text-gray-400">Cargando...</p>;
  if (!peliculas.length) return <p className="text-center text-gray-400">No hay películas registradas.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-zinc-800 text-sm text-gray-600 dark:text-gray-300">
          <tr>
            <th className="p-3 text-left">Imagen</th>
            <th className="p-3 text-left">Título</th>
            <th className="p-3 text-left">Duración</th>
            <th className="p-3 text-left">Creada</th>
            <th className="p-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {peliculas.map((p: any) => (
            <tr key={p.id} className="border-t dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800">
              <td className="p-3">
                {p.imagen_url && (
                  <Image src={p.imagen_url} alt={p.titulo} width={60} height={90} className="rounded-md object-cover" />
                )}
              </td>
              <td className="p-3">{p.titulo}</td>
              <td className="p-3">{p.duracion} min</td>
              <td className="p-3">{new Date(p.created_at).toLocaleDateString()}</td>
              <td className="p-3 text-right">
                <Button variant="destructive" onClick={() => onEliminar(p.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
