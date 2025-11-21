import React, { useState, useEffect } from 'react';
import VehiculosService from '../../../services/VehiculosService';
import CreateModal from '../../../components/organisms/CreateModal';
import Text from '../../../components/atoms/Text';
import Button from '../../../components/atoms/Button';

const createInputs = [
    { name: "modelo", type: "text", placeholder: "Modelo", required: true },
    { name: "anio", type: "number", placeholder: "Año", required: true },
    { name: "precio", type: "number", placeholder: "Precio", required: true },
    { name: "marcaId", type: "text", placeholder: "ID Marca", required: true },
    { name: "transmisionId", type: "text", placeholder: "ID Transmisión", required: true },
    { name: "combustibleId", type: "text", placeholder: "ID Combustible", required: true },
    { name: "concesionarioId", type: "text", placeholder: "ID Concesionario", required: true },
    { name: "imagen", type: "file", placeholder: "Imagen del vehículo", required: false },
];

const VehiculosList = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editingVehiculo, setEditingVehiculo] = useState(null);

    useEffect(() => {
        loadVehiculos();
    }, []);

    const loadVehiculos = async () => {
        try {
            const data = await VehiculosService.getAllVehiculos();
            setVehiculos(data);
        } catch (error) {
            console.error('Error loading vehiculos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (formData) => {
        setSubmitLoading(true);
        console.log('FormData received:', formData);
        try {
            const payload = {
                modelo: formData.modelo,
                anio: parseInt(formData.anio),
                precio: parseInt(formData.precio),
                marca: { id: parseInt(formData.marcaId) },
                transmision: { id: parseInt(formData.transmisionId) },
                combustible: { id: parseInt(formData.combustibleId) },
                concesionario: { id: parseInt(formData.concesionarioId) },
                imagen: formData.imagen || null
            };
            console.log('Payload to send:', payload);

            if (editingVehiculo) {
                await VehiculosService.updateVehiculo(editingVehiculo.id, payload);
            } else {
                await VehiculosService.createVehiculo(payload);
            }

            await loadVehiculos();
            setIsModalOpen(false);
            setEditingVehiculo(null);
        } catch (error) {
            console.error('Error saving vehiculo:', error);
            alert('Error al guardar el vehículo');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleOpenEdit = (vehiculo) => {
        setEditingVehiculo({
            ...vehiculo,
            marcaId: vehiculo.marca?.id,
            transmisionId: vehiculo.transmision?.id,
            combustibleId: vehiculo.combustible?.id,
            concesionarioId: vehiculo.concesionario?.id,
            imagen: vehiculo.imagen
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await VehiculosService.deleteVehiculo(id);
            loadVehiculos();
        } catch (error) {
            console.error('Error deleting vehiculo:', error);
        }
    };

    if (loading) return <div className="p-8 text-center"><Text variant="p">Cargando...</Text></div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Text variant="h2" className="text-2xl font-bold text-gray-800">Gestión de Vehículos</Text>
                <Button
                    onClick={() => {
                        setEditingVehiculo(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-black text-white hover:bg-gray-800"
                >
                    Nuevo Vehículo
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">ID</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">Modelo</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">Marca</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">Año</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">Precio</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">Acciones</Text></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {vehiculos.map((vehiculo) => (
                            <tr key={vehiculo.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500"><Text variant="span">#{vehiculo.id}</Text></td>
                                <td className="p-4 font-medium text-gray-900"><Text variant="span">{vehiculo.modelo}</Text></td>
                                <td className="p-4 text-gray-600"><Text variant="span">{vehiculo.marca?.nombre}</Text></td>
                                <td className="p-4 text-gray-600"><Text variant="span">{vehiculo.anio}</Text></td>
                                <td className="p-4 text-gray-600"><Text variant="span">${vehiculo.precio.toLocaleString()}</Text></td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleOpenEdit(vehiculo)}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm bg-transparent p-0"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(vehiculo.id)}
                                            className="text-red-600 hover:text-red-800 font-medium text-sm bg-transparent p-0"
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CreateModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingVehiculo(null);
                }}
                onSubmit={handleCreate}
                inputsConfig={createInputs}
                title={editingVehiculo ? "Editar Vehículo" : "Crear Nuevo Vehículo"}
                submitText={editingVehiculo ? "Actualizar" : "Crear"}
                loading={submitLoading}
                initialData={editingVehiculo || {}}
            />
        </div>
    );
};

export default VehiculosList;
