'use client';

export default function ListaFunciones({ funciones }: { funciones: any[] }) {
  if (!funciones.length)
    return <p className="text-gray-500 text-sm">No hay funciones registradas.</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-medium mb-4">Funciones registradas</h2>
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Categoría</th>
            <th className="p-2 border">Hora</th>
            <th className="p-2 border">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {funciones.map((f) => (
            <tr key={f.id}>
              <td className="p-2 border">{f.titulo}</td>
              <td className="p-2 border">{f.categoria}</td>
              <td className="p-2 border">{f.hora}</td>
              <td className="p-2 border">{f.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
