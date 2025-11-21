import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import VehiculosService from "../../services/VehiculosService";
import { useAuth } from '../../context/AuthContext';
import ReservaModal from '../../components/organisms/ReservaModal';
import Image from '../../components/atoms/Image';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';

function VehiculoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [vehiculo, setVehiculo] = useState(null);
    const [showReservaModal, setShowReservaModal] = useState(false);

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


    const handleReservar = () => {
        if (!user) {
            navigate('/login');
        } else {
            setShowReservaModal(true);
        }
    };

    if (!vehiculo)
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 ">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black "></div>
            </div>
        );

    return (
        <div className="min-h-screen bg-zinc-50  pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-black :text-white mb-8 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver al catálogo
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="w-full">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 800">
                            <Image
                                src={vehiculo.imagenUrl}
                                alt={`${vehiculo.marca?.nombre} ${vehiculo.modelo}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <Text variant="h2" className="text-lg font-medium text-zinc-500 400 uppercase tracking-wider">
                                {vehiculo.marca?.nombre}
                            </Text>
                            <Text variant="h1" className="text-4xl md:text-5xl font-bold text-zinc-900  mt-2 tracking-tight">
                                {vehiculo.modelo}
                            </Text>
                            <Text variant="div" className="text-3xl font-bold text-zinc-900  mt-4">
                                ${vehiculo.precio.toLocaleString()}
                            </Text>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-6 border-y border-zinc-200 800">
                            <div className="space-y-1">
                                <Text variant="p" className="text-sm text-zinc-500 400">Año</Text>
                                <Text variant="p" className="text-lg font-medium text-zinc-900 ">{vehiculo.anio}</Text>
                            </div>
                            <div className="space-y-1">
                                <Text variant="p" className="text-sm text-zinc-500 400">Transmisión</Text>
                                <Text variant="p" className="text-lg font-medium text-zinc-900 ">{vehiculo.transmision?.tipo || 'N/A'}</Text>
                            </div>
                            <div className="space-y-1">
                                <Text variant="p" className="text-sm text-zinc-500 400">Combustible</Text>
                                <Text variant="p" className="text-lg font-medium text-zinc-900 ">{vehiculo.combustible?.tipo || 'N/A'}</Text>
                            </div>
                            <div className="space-y-1">
                                <Text variant="p" className="text-sm text-zinc-500 400">Concesionario</Text>
                                <Text variant="p" className="text-lg font-medium text-zinc-900 ">{vehiculo.concesionario?.nombre || 'N/A'}</Text>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Text variant="h3" className="text-xl font-bold text-zinc-900 ">Descripción</Text>
                            <Text variant="p" className="text-zinc-600 300 leading-relaxed">
                                {vehiculo.descripcion || `Este ${vehiculo.marca?.nombre} ${vehiculo.modelo} del año ${vehiculo.anio} es una excelente oportunidad. Cuenta con transmisión ${vehiculo.transmision?.tipo?.toLowerCase()} y motor a ${vehiculo.combustible?.tipo?.toLowerCase()}. Disponible para ver en nuestra sucursal de ${vehiculo.concesionario?.nombre}.`}
                            </Text>
                        </div>

                        {vehiculo.concesionario && (
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                                <h3 className="text-xl font-bold text-zinc-900 mb-4">Información del Concesionario</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-zinc-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <div>
                                            <Text variant="p" className="font-semibold text-zinc-900">{vehiculo.concesionario.nombre}</Text>
                                        </div>
                                    </div>
                                    {vehiculo.concesionario.direccion && (
                                        <div className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-zinc-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <div>
                                                <Text variant="p" className="text-zinc-700">{vehiculo.concesionario.direccion}</Text>
                                                <Text variant="p" className="text-sm text-zinc-500">
                                                    {vehiculo.concesionario.comuna?.nombre || 'N/A'}
                                                    {vehiculo.concesionario.comuna?.region?.nombre &&
                                                        `, ${vehiculo.concesionario.comuna.region.nombre}`
                                                    }
                                                </Text>
                                            </div>
                                        </div>
                                    )}
                                    {vehiculo.concesionario.telefono && (
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <p className="text-zinc-700">{vehiculo.concesionario.telefono}</p>
                                        </div>
                                    )}
                                    {vehiculo.concesionario.correo && (
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <Text variant="p" className="text-zinc-700">{vehiculo.concesionario.correo}</Text>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="pt-6">
                            <Button
                                onClick={handleReservar}
                                className="w-full py-4 bg-black text-white rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
                            >
                                🚗 Reservar Ahora
                            </Button>
                            <Text variant="p" className="text-xs text-zinc-500 text-center mt-3">
                                Precio de reserva: $100,000
                            </Text>
                        </div>
                    </div>
                </div>
            </div>

            <ReservaModal
                vehiculo={vehiculo}
                isOpen={showReservaModal}
                onClose={() => setShowReservaModal(false)}
            />
        </div>
    );
}

export default VehiculoDetalle;
