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

                                        <div>
                                            <Text variant="p" className="font-semibold text-zinc-900">{vehiculo.concesionario.nombre}</Text>
                                        </div>
                                    </div>
                                    {vehiculo.concesionario.direccion && (
                                        <div className="flex items-start gap-3">

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

                                            <p className="text-zinc-700">{vehiculo.concesionario.telefono}</p>
                                        </div>
                                    )}
                                    {vehiculo.concesionario.correo && (
                                        <div className="flex items-center gap-3">

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
                                Reservar Ahora
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
