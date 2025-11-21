import React, { useState, useEffect } from 'react';
import VehiculosService from '../../services/VehiculosService';
import VehicleCard from '../../components/VehicleCard';
import HeroSection from '../../components/HeroSection';

const Home = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVehiculos();
    }, []);

    const fetchVehiculos = async () => {
        try {
            const data = await VehiculosService.getAllVehiculos();
            setVehiculos(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching vehiculos:', err);
            setError('No se pudieron cargar los vehículos. Por favor intente más tarde.');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            <HeroSection />

            <main id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-zinc-900">Catálogo Disponible</h2>
                        <p className="text-zinc-500 mt-2">Explora nuestros últimos vehículos disponibles</p>
                    </div>
                    <div className="hidden md:flex gap-2">
                        {/* Filter buttons could go here */}
                    </div>
                </div>

                {error ? (
                    <div className="text-center py-12 text-red-500">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {vehiculos.map(vehiculo => (
                            <VehicleCard key={vehiculo.id} vehicle={vehiculo} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;