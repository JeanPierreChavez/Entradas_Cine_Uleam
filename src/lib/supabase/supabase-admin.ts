import { supabase } from './supabasee';

// Importar getPeliculas y supabase desde el archivo original
export { getPeliculas, supabase } from './supabasee';

// ============= ESTADÍSTICAS =============

export async function getEstadisticasGenerales() {
  try {
    const hoy = new Date().toISOString().split('T')[0];
    const ahora = new Date().toTimeString().split(' ')[0].substring(0, 5);

    // Total de reservas
    const { count: totalReservas } = await supabase
      .from('reservas')
      .select('*', { count: 'exact', head: true });

    // Reservas usadas (asistieron)
    const { count: asistieron } = await supabase
      .from('reservas')
      .select('*', { count: 'exact', head: true })
      .eq('usado', true);

    // Reservas no usadas y con función pasada (no se presentaron)
    const { data: reservasData } = await supabase
      .from('reservas')
      .select(`
        usado,
        funciones (
          fecha,
          hora
        )
      `);

    const noPresentados = reservasData?.filter((r: any) => {
      if (r.usado) return false;
      const fechaFuncion = r.funciones?.fecha;
      const horaFuncion = r.funciones?.hora?.substring(0, 5);
      if (!fechaFuncion) return false;
      const esPasada = fechaFuncion < hoy || (fechaFuncion === hoy && horaFuncion && horaFuncion < ahora);
      return esPasada;
    }).length || 0;

    // Reservas pendientes (funciones futuras sin usar)
    const pendientes = reservasData?.filter((r: any) => {
      if (r.usado) return false;
      const fechaFuncion = r.funciones?.fecha;
      const horaFuncion = r.funciones?.hora?.substring(0, 5);
      if (!fechaFuncion) return false;
      const esFutura = fechaFuncion > hoy || (fechaFuncion === hoy && horaFuncion && horaFuncion >= ahora);
      return esFutura;
    }).length || 0;

    // Total de películas
    const { count: totalPeliculas } = await supabase
      .from('peliculas')
      .select('*', { count: 'exact', head: true });

    // Total de funciones
    const { count: totalFunciones } = await supabase
      .from('funciones')
      .select('*', { count: 'exact', head: true });

    // Total de entradas reservadas
    const { data: entradasData } = await supabase
      .from('reservas')
      .select('cantidad_entradas');
    
    const totalEntradas = entradasData?.reduce((sum, r) => sum + r.cantidad_entradas, 0) || 0;

    // Ocupación promedio (entradas reservadas / capacidad total)
    const { data: funcionesData } = await supabase
      .from('funciones')
      .select('capacidad_total');
    
    const capacidadTotal = funcionesData?.reduce((sum, f) => sum + (f.capacidad_total || 0), 0) || 1;
    const ocupacionPromedio = capacidadTotal > 0 ? (totalEntradas / capacidadTotal * 100) : 0;

    return {
      totalReservas: totalReservas || 0,
      asistieron: asistieron || 0,
      noPresentados: noPresentados,
      pendientes: pendientes,
      totalPeliculas: totalPeliculas || 0,
      totalFunciones: totalFunciones || 0,
      totalEntradas,
      tasaAsistencia: totalReservas ? Number(((asistieron || 0) / totalReservas * 100).toFixed(1)) : 0,
      ocupacionPromedio: Number(ocupacionPromedio.toFixed(1))
    };
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    throw error;
  }
}

// Reservas por película (para gráficos)
export async function getReservasPorPelicula() {
  try {
    const { data, error } = await supabase
      .from('reservas')
      .select(`
        cantidad_entradas,
        funciones (
          peliculas (
            titulo
          )
        )
      `);

    if (error) throw error;

    // Agrupar por película
    const grouped = data.reduce((acc: any, reserva: any) => {
      const titulo = reserva.funciones?.peliculas?.titulo || 'Sin título';
      if (!acc[titulo]) {
        acc[titulo] = 0;
      }
      acc[titulo] += reserva.cantidad_entradas;
      return acc;
    }, {});

    return Object.entries(grouped).map(([titulo, cantidad]) => ({
      titulo,
      cantidad
    }));
  } catch (error) {
    console.error('Error obteniendo reservas por película:', error);
    throw error;
  }
}

// Reservas por día (para gráfico de líneas)
export async function getReservasPorDia() {
  try {
    const { data, error } = await supabase
      .from('reservas')
      .select('created_at, cantidad_entradas')
      .order('created_at', { ascending: true });

    if (error) throw error;

    // Agrupar por día
    const grouped = data.reduce((acc: any, reserva: any) => {
      const fecha = new Date(reserva.created_at).toLocaleDateString('es-ES');
      if (!acc[fecha]) {
        acc[fecha] = 0;
      }
      acc[fecha] += reserva.cantidad_entradas;
      return acc;
    }, {});

    return Object.entries(grouped).map(([fecha, cantidad]) => ({
      fecha,
      cantidad
    }));
  } catch (error) {
    console.error('Error obteniendo reservas por día:', error);
    throw error;
  }
}

// Películas más populares (por número de reservas)
export async function getPeliculasPopulares() {
  try {
    const { data, error } = await supabase
      .from('reservas')
      .select(`
        cantidad_entradas,
        funciones (
          peliculas (
            titulo
          )
        )
      `);

    if (error) throw error;

    // Agrupar por película
    const grouped = data.reduce((acc: any, reserva: any) => {
      const titulo = reserva.funciones?.peliculas?.titulo || 'Sin título';
      if (!acc[titulo]) {
        acc[titulo] = 0;
      }
      acc[titulo] += reserva.cantidad_entradas;
      return acc;
    }, {});

    // Calcular total para porcentajes
    const total = Object.values(grouped).reduce((sum: number, val: any) => sum + val, 0);

    // Convertir a array y calcular porcentajes
    const peliculas = Object.entries(grouped)
      .map(([titulo, total_reservas]: [string, any]) => ({
        titulo,
        total_reservas,
        porcentaje: total > 0 ? Number(((total_reservas / total) * 100).toFixed(1)) : 0
      }))
      .sort((a, b) => b.total_reservas - a.total_reservas);

    return peliculas;
  } catch (error) {
    console.error('Error obteniendo películas populares:', error);
    throw error;
  }
}

// ============= PELÍCULAS =============

export async function crearPelicula(pelicula: {
  titulo: string;
  descripcion: string;
  duracion: number;
  imagen_url: string;
}) {
  const { data, error } = await supabase
    .from('peliculas')
    .insert([pelicula])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function actualizarPelicula(id: string, pelicula: any) {
  const { data, error } = await supabase
    .from('peliculas')
    .update(pelicula)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function eliminarPelicula(id: string) {
  const { error } = await supabase
    .from('peliculas')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ============= FUNCIONES =============

export async function crearFuncion(funcion: {
  pelicula_id: string;
  fecha: string;
  hora: string;
  sala: string;
  capacidad_total: number;
}) {
  const { data, error } = await supabase
    .from('funciones')
    .insert([{
      ...funcion,
      entradas_disponibles: funcion.capacidad_total
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function actualizarFuncion(id: string, funcion: any) {
  const { data, error } = await supabase
    .from('funciones')
    .update(funcion)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function eliminarFuncion(id: string) {
  const { error } = await supabase
    .from('funciones')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getAllFunciones() {
  const { data, error } = await supabase
    .from('funciones')
    .select(`
      *,
      peliculas (
        titulo,
        imagen_url
      )
    `)
    .order('fecha', { ascending: true })
    .order('hora', { ascending: true });

  if (error) throw error;
  return data;
}

// ============= RESERVAS =============

export async function getAllReservas() {
  const { data, error } = await supabase
    .from('reservas')
    .select(`
      *,
      funciones (
        fecha,
        hora,
        sala,
        peliculas (
          titulo
        )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getReservasPorEstado(usado: boolean) {
  const { data, error } = await supabase
    .from('reservas')
    .select(`
      *,
      funciones (
        fecha,
        hora,
        sala,
        peliculas (
          titulo
        )
      )
    `)
    .eq('usado', usado)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Obtener las últimas N reservas
export async function getUltimasReservas(limite: number = 10) {
  try {
    const { data, error } = await supabase
      .from('reservas')
      .select(`
        id,
        nombre_estudiante,
        email_estudiante,
        cantidad_entradas,
        usado,
        created_at,
        funciones (
          fecha,
          hora,
          sala,
          peliculas (
            titulo
          )
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limite);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error obteniendo últimas reservas:', error);
    throw error;
  }
}

// Exportar reservas a CSV
export function exportarReservasCSV(reservas: any[]) {
  const headers = ['ID', 'Nombre', 'Email', 'Película', 'Fecha', 'Hora', 'Sala', 'Entradas', 'Estado', 'Fecha Reserva'];
  
  const rows = reservas.map(r => [
    r.id,
    r.nombre_estudiante,
    r.email_estudiante,
    r.funciones?.peliculas?.titulo || 'N/A',
    r.funciones?.fecha || 'N/A',
    r.funciones?.hora || 'N/A',
    r.funciones?.sala || 'N/A',
    r.cantidad_entradas,
    r.usado ? 'Asistió' : 'No asistió',
    new Date(r.created_at).toLocaleString('es-ES')
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `reservas_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
}