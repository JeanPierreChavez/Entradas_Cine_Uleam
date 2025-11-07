'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function PeliculasStats({ peliculas }: { peliculas: any[] }) {
  if (!peliculas.length) return null;

  const data = peliculas.map((p) => ({
    name: p.titulo,
    value: p.duracion || 0,
  }));

  const COLORS = ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA'];

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Duración de Películas (minutos)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie dataKey="value" data={data} outerRadius={120} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
