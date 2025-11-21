import React, { useState, useEffect } from 'react';
import ReservasService from '../../../services/ReservasService';
import EstadosReservaService from '../../../services/EstadosReservaService';
import { generarMensaje } from '../../../utils/GenerarMensaje';
import Text from '../../../components/atoms/Text';
import Button from '../../../components/atoms/Button';

const ReservasList = () => {
    const [reservas, setReservas] = useState([]);
    const [estados, setEstados] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [reservasData, estadosData] = await Promise.all([
                ReservasService.getAllReservas(),
                EstadosReservaService.getAllEstadosReserva()
            ]);
            setReservas(reservasData.sort((a, b) => new Date(b.fechaReserva) - new Date(a.fechaReserva)));
            setEstados(estadosData);
        } catch (error) {
            console.error('Error loading data:', error);
            generarMensaje('Error al cargar las reservas', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleChangeEstado = async (reservaId, nuevoEstadoId) => {
        try {
            const reserva = reservas.find(r => r.id === reservaId);
            if (!reserva) return;

            const updatedReserva = {
                ...reserva,
                estado: { id: parseInt(nuevoEstadoId) }
            };

            await ReservasService.updateReserva(reservaId, updatedReserva);
            generarMensaje('Estado actualizado exitosamente', 'success');
            loadData();
        } catch (error) {
            console.error('Error updating estado:', error);
            generarMensaje('Error al actualizar el estado', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Está seguro que desea eliminar esta reserva?')) return;

        try {
            await ReservasService.deleteReserva(id);
            generarMensaje('Reserva eliminada exitosamente', 'success');
            loadData();
        } catch (error) {
            console.error('Error deleting reserva:', error);
            generarMensaje('Error al eliminar la reserva', 'error');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CL', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getEstadoBadgeColor = (estado) => {
        const estadoLower = estado?.toLowerCase() || '';
        if (estadoLower.includes('pendiente')) return 'bg-yellow-100 text-yellow-800';
        if (estadoLower.includes('confirmada') || estadoLower.includes('aprobada')) return 'bg-green-100  text-green-800';
        if (estadoLower.includes('cancelada')) return 'bg-red-100 text-red-800';
        if (estadoLower.includes('completada')) return 'bg-blue-100 text-blue-800';
        return 'bg-zinc-100 text-zinc-800';
    };



    if (loading) return <div className="p-8 text-center"><Text variant="p">Cargando...</Text></div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Text variant="h2" className="text-2xl font-bold text-gray-800">Gestión de Reservas</Text>
            </div>


            <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <Text variant="p" className="text-sm text-gray-500">Total</Text>
                    <Text variant="p" className="text-2xl font-bold text-gray-900">{reservas.length}</Text>
                </div>
                {estados.map(estado => {
                    const count = reservas.filter(r => r.estado?.id === estado.id).length;
                    return (
                        <div key={estado.id} className="bg-white p-4 rounded-lg border border-gray-200">
                            <Text variant="p" className="text-sm text-gray-500">{estado.estado}</Text>
                            <Text variant="p" className="text-2xl font-bold text-gray-900">{count}</Text>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600"><Text variant="span">ID</Text></th>
                                <th className="p-4 font-semibold text-gray-600"><Text variant="span">Usuario</Text></th>
                                <th className="p-4 font-semibold text-gray-600"><Text variant="span">Vehículo</Text></th>
                                <th className="p-4 font-semibold text-gray-600"><Text variant="span">F. Reserva</Text></th>
                                <th className="p-4 font-semibold text-gray-600"><Text variant="span">F. Entrega</Text></th>
                                <th className="p-4 font-semibold text-gray-600"><Text variant="span">Precio</Text></th>
                                <th className="p-4 font-semibold text-gray-600"><Text variant="span">Estado</Text></th>
                                <th className="p-4 font-semibold text-gray-600"><Text variant="span">Acciones</Text></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {reservas.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="p-8 text-center text-gray-500">
                                        No se encontraron reservas
                                    </td>
                                </tr>
                            ) : (
                                reservas.map((reserva) => (
                                    <tr key={reserva.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-500"><Text variant="span">#{reserva.id}</Text></td>
                                        <td className="p-4">
                                            <div>
                                                <Text variant="p" className="font-medium text-gray-900">{reserva.usuario?.nombre || 'N/A'}</Text>
                                                <Text variant="p" className="text-xs text-gray-500">{reserva.usuario?.correo || 'N/A'}</Text>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <Text variant="p" className="font-medium text-gray-900">
                                                    {reserva.vehiculo?.marca?.nombre || ''} {reserva.vehiculo?.modelo || 'N/A'}
                                                </Text>
                                                <Text variant="p" className="text-xs text-gray-500">Año: {reserva.vehiculo?.anio || 'N/A'}</Text>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-600 text-sm"><Text variant="span">{formatDate(reserva.fechaReserva)}</Text></td>
                                        <td className="p-4 text-gray-600 text-sm"><Text variant="span">{formatDate(reserva.fechaEntrega)}</Text></td>
                                        <td className="p-4 font-medium text-gray-900">
                                            <Text variant="span">${reserva.precioReserva?.toLocaleString() || '0'}</Text>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={reserva.estado?.id || ''}
                                                onChange={(e) => handleChangeEstado(reserva.id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-xs font-semibold border-0 ${getEstadoBadgeColor(reserva.estado?.estado)}`}
                                            >
                                                {estados.map(estado => (
                                                    <option key={estado.id} value={estado.id}>
                                                        {estado.estado}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <Button
                                                onClick={() => handleDelete(reserva.id)}
                                                className="text-red-600 hover:text-red-800 font-medium text-sm bg-transparent p-0"
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReservasList;
