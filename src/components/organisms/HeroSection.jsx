import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <div className="relative bg-zinc-900 text-white py-24 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <Image
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Text variant="h1" className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                    Encuentra tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">Vehículo Ideal</span>
                </Text>
                <Text variant="p" className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
                    Explora nuestra selección premium de vehículos. Calidad, garantía y el mejor servicio post-venta del mercado.
                </Text>
                <div className="flex justify-center gap-4">
                    <Button
                        text="Ver Catálogo"
                        onClick={() => {
                            document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-white text-black hover:bg-zinc-200"
                    />
                    <Button
                        text="Contáctanos"
                        onClick={() => navigate('/contacto')}
                        className="border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
