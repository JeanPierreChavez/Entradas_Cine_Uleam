export function ConnectSupabaseSteps() {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
      <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
        ⚠️ Configuración requerida
      </h3>
      <p className="text-sm text-amber-800 dark:text-amber-300">
        Por favor, configura las variables de entorno de Supabase en tu archivo <code>.env.local</code>
      </p>
    </div>
  );
}

