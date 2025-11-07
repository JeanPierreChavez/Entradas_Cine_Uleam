'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function FormFuncion({ onAdd }: { onAdd: (funcion: any) => void }) {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [hora, setHora] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !categoria || !hora) return;
    onAdd({ titulo, categoria, hora, descripcion });
    setTitulo('');
    setCategoria('');
    setHora('');
    setDescripcion('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4">
      <h2 className="text-lg font-medium">Agregar nueva función</h2>

      <Input
        placeholder="Título de la película"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <Input
        placeholder="Categoría (Acción, Comedia, etc.)"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      <Input
        placeholder="Hora de función (Ej: 19:00)"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
      />
      <Textarea
        placeholder="Descripción o sinopsis"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Guardar función
      </Button>
    </form>
  );
}
