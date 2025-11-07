'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/supabase-admin';
import FormFuncion from '@/app/components/admin/FormularioFuncion';
import ListaFunciones from '@/app/components/admin/TablaFunciones';
import PeliculasStats from '@/app/components/admin/ChartPeliculasPopulares';

export default function FuncionesPage() {
  const [funciones, setFunciones] = useState<any[]>([]);

  const obtenerFunciones = async () => {
    const { data, error } = await supabase.from('funciones').select('*');
    if (!error && data) setFunciones(data);
  };

  const agregarFuncion = async (funcion: any) => {
    const { error } = await supabase.from('funciones').insert([funcion]);
    if (!error) obtenerFunciones();
  };

  useEffect(() => {
    obtenerFunciones();
  }, []);

  return (
    <div className="p-8 flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">Gestión de Funciones 🎥</h1>

      <FormFuncion onAdd={agregarFuncion} />

      <ListaFunciones funciones={funciones} />

      <PeliculasStats peliculas={funciones} />
    </div>
  );
}
