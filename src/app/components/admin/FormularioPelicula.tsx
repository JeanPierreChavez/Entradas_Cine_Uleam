'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function PeliculaForm({ onSubmit }: { onSubmit: (pelicula: any) => void }) {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    duracion: 0,
    imagen_url: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ titulo: '', descripcion: '', duracion: 0, imagen_url: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 shadow p-6 rounded-2xl space-y-4">
      <h2 className="text-xl font-medium">Agregar Nueva Película</h2>

      <Input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
      <Textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
      <Input name="duracion" type="number" placeholder="Duración (minutos)" value={form.duracion} onChange={handleChange} required />
      <Input name="imagen_url" placeholder="URL de la imagen" value={form.imagen_url} onChange={handleChange} />

      <Button type="submit" className="w-full">Guardar Película</Button>
    </form>
  );
}
