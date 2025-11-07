'use client';

import { useEffect, useState } from 'react';
import { getPeliculas, crearPelicula, eliminarPelicula } from '@/lib/supabase/supabase-admin';
import PeliculasTable from '@/app/components/admin/TablaPeliculas';
import PeliculaForm from '@/app/components/admin/FormularioPelicula';
import PeliculasStats from '@/app/components/admin/ChartPeliculasPopulares';
import { Button } from '@/components/ui/button';

export default function PeliculasPage() {
  const [peliculas, setPeliculas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const cargarPeliculas = async () => {
    setLoading(true);
    const data = await getPeliculas();
    setPeliculas(data || []);
    setLoading(false);
  };

  useEffect(() => {
    cargarPeliculas();
  }, []);

  const handleNuevaPelicula = async (pelicula: any) => {
    await crearPelicula(pelicula);
    setShowForm(false);
    await cargarPeliculas();
  };

  const handleEliminar = async (id: string) => {
    if (confirm('¿Seguro que deseas eliminar esta película?')) {
      await eliminarPelicula(id);
      await cargarPeliculas();
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">🎬 Gestión de Películas</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cerrar' : '➕ Nueva Película'}
        </Button>
      </header>

      {showForm && <PeliculaForm onSubmit={handleNuevaPelicula} />}

      <PeliculasStats peliculas={peliculas} />

      <PeliculasTable
        peliculas={peliculas}
        loading={loading}
        onEliminar={handleEliminar}
      />
    </div>
  );
}
