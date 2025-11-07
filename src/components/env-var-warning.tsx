export function EnvVarWarning() {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2 text-xs">
      <p className="text-red-800 dark:text-red-300">
        ⚠️ Variables de entorno faltantes
      </p>
    </div>
  );
}

