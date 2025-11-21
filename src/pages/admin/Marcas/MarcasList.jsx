import React, { useState, useEffect } from 'react';
import MarcasService from '../../../services/MarcasService';
import CreateModal from '../../../components/organisms/CreateModal';
import Text from '../../../components/atoms/Text';
import Button from '../../../components/atoms/Button';

const createInputs = [
    { name: "nombre", type: "text", placeholder: "Nombre de la Marca", required: true },
];

const MarcasList = () => {
    const [marcas, setMarcas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editingMarca, setEditingMarca] = useState(null);

    useEffect(() => {
        loadMarcas();
    }, []);

    const loadMarcas = async () => {
        try {
            const data = await MarcasService.getAllMarcas();
            setMarcas(data);
        } catch (error) {
            console.error('Error loading marcas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (formData) => {
        setSubmitLoading(true);
        try {
            if (editingMarca) {
                await MarcasService.updateMarca(editingMarca.id, formData);
            } else {
                await MarcasService.createMarca(formData);
            }
            await loadMarcas();
            setIsModalOpen(false);
            setEditingMarca(null);
        } catch (error) {
            console.error('Error saving marca:', error);
            alert('Error al guardar la marca');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleOpenEdit = (marca) => {
        setEditingMarca(marca);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await MarcasService.deleteMarca(id);
            loadMarcas();
        } catch (error) {
            console.error('Error deleting marca:', error);
        }
    };

    if (loading) return <div className="p-8 text-center"><Text variant="p">Cargando...</Text></div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Text variant="h2" className="text-2xl font-bold text-gray-800">Gestión de Marcas</Text>
                <Button
                    onClick={() => {
                        setEditingMarca(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-black text-white hover:bg-gray-800"
                >
                    Nueva Marca
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <tr>
                                <th className="p-4 font-semibold text-gray-600"><Text variant="span">ID</Text></th>
                                <th className="p-4 font-semibold text-gray-600"><Text variant="span">Nombre</Text></th>
                                <th className="p-4 font-semibold text-gray-600"><Text variant="span">Acciones</Text></th>
                            </tr>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {marcas.map((marca) => (
                            <tr key={marca.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500"><Text variant="span">#{marca.id}</Text></td>
                                <td className="p-4 font-medium text-gray-900"><Text variant="span">{marca.nombre}</Text></td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleOpenEdit(marca)}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm bg-transparent p-0"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(marca.id)}
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
                    setEditingMarca(null);
                }}
                onSubmit={handleCreate}
                inputsConfig={createInputs}
                title={editingMarca ? "Editar Marca" : "Crear Nueva Marca"}
                submitText={editingMarca ? "Actualizar" : "Crear"}
                loading={submitLoading}
                initialData={editingMarca || {}}
            />
        </div>
    );
};

export default MarcasList;
