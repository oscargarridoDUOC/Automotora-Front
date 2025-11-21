import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ReservasService from '../../services/ReservasService';
import ReservaCard from '../../components/molecules/ReservaCard';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';

const MisReservas = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Si no hay usuario autenticado, redirigir a login
        if (!user) {
            navigate('/login');
            return;
        }
        fetchReservas();
    }, [user, navigate]);

    const fetchReservas = async () => {
        if (!user) return;

        try {
            const data = await ReservasService.getReservasByUsuarioId(user.id);
            // Ordenar por fecha de reserva (más recientes primero)
            const sortedData = data.sort((a, b) =>
                new Date(b.fechaReserva) - new Date(a.fechaReserva)
            );
            setReservas(sortedData);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching reservas:', err);
            setError('No se pudieron cargar las reservas. Por favor intente más tarde.');
            setLoading(false);
        }
    };



    const getEstadoCounts = () => {
        return {
            total: reservas.length,
            pendiente: reservas.filter(r => r.estado?.estado?.toLowerCase().includes('pendiente')).length,
            confirmada: reservas.filter(r => r.estado?.estado?.toLowerCase().includes('confirmada')).length,
            cancelada: reservas.filter(r => r.estado?.estado?.toLowerCase().includes('cancelada')).length,
            completada: reservas.filter(r => r.estado?.estado?.toLowerCase().includes('completada')).length,
        };
    };

    const counts = getEstadoCounts();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Header */}
            <div className="bg-black text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Text variant="h1" className="text-4xl font-bold mb-2">Mis Reservas</Text>
                    <Text variant="p" className="text-zinc-400">Gestiona todas tus reservas de vehículos</Text>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="p-4 rounded-xl border-2 bg-white text-zinc-900 border-zinc-200">
                        <Text variant="p" className="text-2xl font-bold">{counts.total}</Text>
                        <Text variant="p" className="text-sm text-zinc-600">Total</Text>
                    </div>
                    <div className="p-4 rounded-xl border-2 bg-white text-zinc-900 border-zinc-200">
                        <Text variant="p" className="text-2xl font-bold">{counts.pendiente}</Text>
                        <Text variant="p" className="text-sm text-zinc-600">Pendiente</Text>
                    </div>
                    <div className="p-4 rounded-xl border-2 bg-white text-zinc-900 border-zinc-200">
                        <Text variant="p" className="text-2xl font-bold">{counts.confirmada}</Text>
                        <Text variant="p" className="text-sm text-zinc-600">Confirmada</Text>
                    </div>
                    <div className="p-4 rounded-xl border-2 bg-white text-zinc-900 border-zinc-200">
                        <Text variant="p" className="text-2xl font-bold">{counts.cancelada}</Text>
                        <Text variant="p" className="text-sm text-zinc-600">Cancelada</Text>
                    </div>
                    <div className="p-4 rounded-xl border-2 bg-white text-zinc-900 border-zinc-200">
                        <Text variant="p" className="text-2xl font-bold">{counts.completada}</Text>
                        <Text variant="p" className="text-sm text-zinc-600">Completada</Text>
                    </div>
                </div>

                {error ? (
                    <div className="text-center py-12 text-red-500">{error}</div>
                ) : reservas.length === 0 ? (
                    <div className="text-center py-16">
                        <svg className="w-24 h-24 mx-auto text-zinc-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <Text variant="h3" className="text-2xl font-bold text-zinc-900 mb-2">
                            No tienes reservas aún
                        </Text>
                        <Text variant="p" className="text-zinc-500 mb-6">
                            Explora nuestro catálogo y reserva tu vehículo ideal
                        </Text>
                        <Button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                            Ver Catálogo
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {reservas.map(reserva => (
                            <ReservaCard key={reserva.id} reserva={reserva} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MisReservas;
