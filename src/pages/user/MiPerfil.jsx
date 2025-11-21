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

    // Usamos fullUserData si está disponible, si no, usamos los datos básicos del contexto
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
                                            <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <Text variant="p" className="text-zinc-900 font-medium">{displayUser.nombre}</Text>
                                        </div>
                                    </div>

                                    {/* Correo */}
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-500 mb-2">
                                            Correo Electrónico
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <Text variant="p" className="text-zinc-900 font-medium">{displayUser.correo || 'No disponible'}</Text>
                                        </div>
                                    </div>

                                    {displayUser.rut && (
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-500 mb-2">
                                                RUT
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <Text variant="p" className="text-zinc-900 font-medium">{displayUser.rut}</Text>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-500 mb-2">
                                            Rol de Usuario
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
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
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
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
