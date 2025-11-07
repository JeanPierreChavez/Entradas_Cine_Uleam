import Sidebar from '@/app/components/admin/Sidebar';

export const metadata = {
  title: 'Panel de Administración - Cinema System',
  description: 'Panel de control para gestionar películas, funciones y reservas',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950">
      <Sidebar />
      
      {/* Contenido principal */}
      <div className="ml-64">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}