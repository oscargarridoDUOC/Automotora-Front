import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import VehiculosService from "../../services/VehiculosService";

function VehiculoDetalle() {
    const { id } = useParams();
    const [vehiculo, setVehiculo] = useState(null);

    useEffect(() => {
        async function fetchVehiculo() {
            try {
                const data = await VehiculosService.getVehiculoById(id);
                setVehiculo(data);
            } catch (error) {
                console.error("Error cargando vehículo:", error);
            }
        }
        fetchVehiculo();
    }, [id]);

    if (!vehiculo)
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black dark:border-white"></div>
            </div>
        );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-black dark:hover:text-white mb-8 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver al catálogo
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="w-full">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
                            <img
                                src={vehiculo.imagenUrl}
                                alt={`${vehiculo.marca?.nombre} ${vehiculo.modelo}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-lg font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                {vehiculo.marca?.nombre}
                            </h2>
                            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mt-2 tracking-tight">
                                {vehiculo.modelo}
                            </h1>
                            <div className="text-3xl font-bold text-zinc-900 dark:text-white mt-4">
                                ${vehiculo.precio.toLocaleString()}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-6 border-y border-zinc-200 dark:border-zinc-800">
                            <div className="space-y-1">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Año</p>
                                <p className="text-lg font-medium text-zinc-900 dark:text-white">{vehiculo.anio}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Transmisión</p>
                                <p className="text-lg font-medium text-zinc-900 dark:text-white">{vehiculo.transmision?.tipo || 'N/A'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Combustible</p>
                                <p className="text-lg font-medium text-zinc-900 dark:text-white">{vehiculo.combustible?.tipo || 'N/A'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Concesionario</p>
                                <p className="text-lg font-medium text-zinc-900 dark:text-white">{vehiculo.concesionario?.nombre || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Descripción</h3>
                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                Este {vehiculo.marca?.nombre} {vehiculo.modelo} del año {vehiculo.anio} es una excelente oportunidad.
                                Cuenta con transmisión {vehiculo.transmision?.tipo?.toLowerCase()} y motor a {vehiculo.combustible?.tipo?.toLowerCase()}.
                                Disponible para ver en nuestra sucursal de {vehiculo.concesionario?.nombre}.
                            </p>
                        </div>

                        <div className="pt-6">
                            <button className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg">
                                Contactar Vendedor
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VehiculoDetalle;
