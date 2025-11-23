import React, { useState, useEffect } from 'react';
import ContactoService from '../../../services/ContactoService';
import { generarMensaje } from '../../../utils/GenerarMensaje';
import Text from '../../../components/atoms/Text';
import Button from '../../../components/atoms/Button';

const ContactosList = () => {
    const [contactos, setContactos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContactos();
    }, []);

    const loadContactos = async () => {
        try {
            const data = await ContactoService.getAllContactos();
            setContactos(data.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)));
        } catch (error) {
            console.error('Error loading contactos:', error);
            generarMensaje('Error al cargar los contactos', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Está seguro que desea eliminar este contacto?')) return;

        try {
            await ContactoService.deleteContacto(id);
            generarMensaje('Contacto eliminado exitosamente', 'success');
            loadContactos();
        } catch (error) {
            console.error('Error deleting contacto:', error);
            generarMensaje('Error al eliminar el contacto', 'error');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CL', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Text variant="h1" className="text-3xl font-bold text-zinc-900">
                        Gestión de Contactos
                    </Text>
                    <Text variant="p" className="text-zinc-600 mt-2">
                        Visualiza y gestiona los mensajes de contacto recibidos
                    </Text>
                </div>

                {contactos.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <Text variant="p" className="text-zinc-500">
                            No hay contactos registrados
                        </Text>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-zinc-200">
                                <thead className="bg-zinc-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                            Nombre
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                            Teléfono
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                            Mensaje
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                            Fecha
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-zinc-200">
                                    {contactos.map((contacto) => (
                                        <tr key={contacto.id} className="hover:bg-zinc-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                                                {contacto.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                                                {contacto.nombre}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                                                {contacto.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                                                {contacto.telefono}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-zinc-600 max-w-xs truncate">
                                                {contacto.mensaje}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                                                {formatDate(contacto.fechaCreacion)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <Button
                                                    onClick={() => handleDelete(contacto.id)}
                                                    className="bg-red-600 text-white hover:bg-red-700 px-3 py-1 text-sm"
                                                >
                                                    Eliminar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactosList;
