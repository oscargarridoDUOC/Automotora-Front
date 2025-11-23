import React, { useState } from 'react';
import ContactoService from '../../services/ContactoService';
import Text from '../../components/atoms/Text';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';

const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensaje({ tipo: '', texto: '' });

        try {
            await ContactoService.enviarContacto(formData);
            setMensaje({
                tipo: 'success',
                texto: 'Mensaje enviado correctamente. Nos contactaremos contigo pronto.'
            });
            setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
        } catch (error) {
            setMensaje({
                tipo: 'error',
                texto: 'Error al enviar el mensaje. El endpoint aún no está disponible en el backend.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <Text variant="h1" className="text-4xl font-bold text-zinc-900 mb-4">
                        Contáctanos
                    </Text>
                    <Text variant="p" className="text-zinc-600">
                        Completa el formulario y nos pondremos en contacto contigo
                    </Text>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-zinc-700 mb-2">
                                Nombre completo
                            </label>
                            <Input
                                id="nombre"
                                name="nombre"
                                type="text"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Tu nombre"
                                required
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                                required
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="telefono" className="block text-sm font-medium text-zinc-700 mb-2">
                                Teléfono
                            </label>
                            <Input
                                id="telefono"
                                name="telefono"
                                type="tel"
                                value={formData.telefono}
                                onChange={handleChange}
                                placeholder="+56 9 1234 5678"
                                required
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="mensaje" className="block text-sm font-medium text-zinc-700 mb-2">
                                Mensaje
                            </label>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                rows="5"
                                value={formData.mensaje}
                                onChange={handleChange}
                                placeholder="Escribe tu mensaje aquí..."
                                required
                                className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                            />
                        </div>

                        {mensaje.texto && (
                            <div className={`p-4 rounded-md ${
                                mensaje.tipo === 'success'
                                    ? 'bg-green-50 text-green-800 border border-green-200'
                                    : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                                {mensaje.texto}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white hover:bg-zinc-800 disabled:bg-zinc-400"
                        >
                            {loading ? 'Enviando...' : 'Enviar mensaje'}
                        </Button>
                    </form>
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <Text variant="h3" className="text-lg font-semibold text-zinc-900 mb-2">
                                Teléfono
                            </Text>
                            <Text variant="p" className="text-zinc-600">
                                +56 9 1234 5678
                            </Text>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <Text variant="h3" className="text-lg font-semibold text-zinc-900 mb-2">
                                Email
                            </Text>
                            <Text variant="p" className="text-zinc-600">
                                contacto@automotora.cl
                            </Text>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <Text variant="h3" className="text-lg font-semibold text-zinc-900 mb-2">
                                Dirección
                            </Text>
                            <Text variant="p" className="text-zinc-600">
                                Santiago, Chile
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
