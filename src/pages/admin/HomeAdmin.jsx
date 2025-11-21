import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../../components/atoms/Text';

const DashboardCard = ({ title, description, link, icon }) => (
    <Link to={link} className="block group">
        <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full">
            <div className="flex items-start justify-between mb-3">
                <div className="p-3 bg-zinc-100 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                    {icon}
                </div>
            </div>
            <Text variant="h3" className="text-xl font-bold text-gray-800 mb-2 group-hover:text-black transition-colors">{title}</Text>
            <Text variant="p" className="text-gray-500 text-sm">{description}</Text>
        </div>
    </Link>
);

const HomeAdmin = () => {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <Text variant="h1" className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</Text>
                <Text variant="p" className="text-gray-500 mb-8">Gestiona el inventario y configuración de la automotora.</Text>

                {/* Management Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DashboardCard
                        title="Reservas"
                        description="Gestionar reservas de vehículos y estados."
                        link="/admin/reservas"
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        }
                    />
                    <DashboardCard
                        title="Vehículos"
                        description="Gestionar inventario, precios y características."
                        link="/admin/vehiculos"
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                            </svg>
                        }
                    />
                    <DashboardCard
                        title="Marcas"
                        description="Administrar marcas y fabricantes disponibles."
                        link="/admin/marcas"
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        }
                    />
                    <DashboardCard
                        title="Concesionarios"
                        description="Gestionar sucursales y puntos de venta."
                        link="/admin/concesionarios"
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        }
                    />
                    <DashboardCard
                        title="Usuarios"
                        description="Administrar usuarios y roles del sistema."
                        link="/admin/usuarios"
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;