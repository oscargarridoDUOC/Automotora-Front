import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { generarMensaje } from '../../utils/GenerarMensaje';
import UsuarioService from '../../services/UsuarioService';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';

const MiPerfil = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [fullUserData, setFullUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            fetchUserData();
        }
    }, [user]);

    const fetchUserData = async () => {
        try {
            const response = await UsuarioService.getUsuarioById(user.id);
            setFullUserData(response.data);
        } catch (error) {
            console.error("Error al cargar datos del usuario", error);
            generarMensaje('No se pudieron cargar todos los datos del perfil', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        generarMensaje('Sesión cerrada exitosamente', 'success');
        navigate('/login');
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    const displayUser = fullUserData || user;

    return (
        <div className="min-h-screen bg-zinc-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Text variant="h1" className="text-3xl font-bold text-zinc-900">Mi Perfil</Text>
                    <Text variant="p" className="text-zinc-500 mt-2">Administra tu información personal y configuración de cuenta</Text>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
                    <div className="p-8 space-y-6">
                        <div>
                            <Text variant="h3" className="text-lg font-semibold text-zinc-900 mb-4">Información Personal</Text>

                            {loading ? (
                                <div className="animate-pulse space-y-4">
                                    <div className="h-4 bg-zinc-200 rounded w-1/4"></div>
                                    <div className="h-4 bg-zinc-200 rounded w-1/2"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-500 mb-2">
                                            Nombre Completo
                                        </label>
                                        <div className="flex items-center gap-2">

                                            <Text variant="p" className="text-zinc-900 font-medium">{displayUser.nombre}</Text>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-500 mb-2">
                                            Correo Electrónico
                                        </label>
                                        <div className="flex items-center gap-2">

                                            <Text variant="p" className="text-zinc-900 font-medium">{displayUser.correo || 'No disponible'}</Text>
                                        </div>
                                    </div>

                                    {displayUser.rut && (
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-500 mb-2">
                                                RUT
                                            </label>
                                            <div className="flex items-center gap-2">

                                                <Text variant="p" className="text-zinc-900 font-medium">{displayUser.rut}</Text>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-500 mb-2">
                                            Rol de Usuario
                                        </label>
                                        <div className="flex items-center gap-2">

                                            <Text variant="p" className="text-zinc-900 font-medium">{displayUser.rol?.nombre || displayUser.rol || 'Usuario'}</Text>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-zinc-200"></div>

                        <div>
                            <Text variant="h3" className="text-lg font-semibold text-zinc-900 mb-4">Acciones de Cuenta</Text>
                            <Button
                                onClick={handleLogout}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >

                                Cerrar Sesión
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiPerfil;
