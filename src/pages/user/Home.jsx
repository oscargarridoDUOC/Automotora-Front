import React, { useState, useEffect } from 'react';
import VehiculosService from '../../services/VehiculosService';
import MarcasService from '../../services/MarcasService';
import VehicleCard from '../../components/molecules/VehicleCard';
import HeroSection from '../../components/organisms/HeroSection';
import Text from '../../components/atoms/Text';

const Home = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [selectedMarca, setSelectedMarca] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [vehiculosData, marcasData] = await Promise.all([
                VehiculosService.getAllVehiculos(),
                MarcasService.getAllMarcas()
            ]);
            setVehiculos(vehiculosData);
            setMarcas(marcasData);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('No se pudieron cargar los datos. Por favor intente más tarde.');
            setLoading(false);
        }
    };

    const filteredVehiculos = selectedMarca
        ? vehiculos.filter(v => v.marca?.id === parseInt(selectedMarca) || v.marca === parseInt(selectedMarca))
        : vehiculos;

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
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <Text variant="h2" className="text-3xl font-bold text-zinc-900">Catálogo Disponible</Text>
                        <Text variant="p" className="text-zinc-500 mt-2">Explora nuestros últimos vehículos disponibles</Text>
                    </div>
                    <div className="w-full md:w-64">
                        <label htmlFor="marca-filter" className="block text-sm font-medium text-zinc-700 mb-1">Filtrar por Marca</label>
                        <select
                            id="marca-filter"
                            value={selectedMarca}
                            onChange={(e) => setSelectedMarca(e.target.value)}
                            className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                        >
                            <option value="">Todas las marcas</option>
                            {marcas.map(marca => (
                                <option key={marca.id} value={marca.id}>
                                    {marca.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {error ? (
                    <div className="text-center py-12 text-red-500"><Text variant="p">{error}</Text></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredVehiculos.map(vehiculo => (
                            <VehicleCard key={vehiculo.id} vehicle={vehiculo} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;