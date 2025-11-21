import React, { useState, useEffect } from 'react';
import ConcesionariosService from '../../../services/ConcesionariosService';
import CreateModal from '../../../components/organisms/CreateModal';
import Text from '../../../components/atoms/Text';
import Button from '../../../components/atoms/Button';

const createInputs = [
    { name: "nombre", type: "text", placeholder: "Nombre", required: true },
    { name: "direccion", type: "text", placeholder: "Dirección", required: true },
    { name: "telefono", type: "text", placeholder: "Teléfono", required: true },
    { name: "correo", type: "email", placeholder: "Correo", required: true },
    { name: "comunaId", type: "text", placeholder: "ID Comuna", required: true },
];

const ConcesionariosList = () => {
    const [concesionarios, setConcesionarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editingConcesionario, setEditingConcesionario] = useState(null);

    useEffect(() => {
        loadConcesionarios();
    }, []);

    const loadConcesionarios = async () => {
        try {
            const data = await ConcesionariosService.getAllConcesionarios();
            setConcesionarios(data);
        } catch (error) {
            console.error('Error loading concesionarios:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (formData) => {
        setSubmitLoading(true);
        try {
            const payload = {
                nombre: formData.nombre,
                direccion: formData.direccion,
                telefono: formData.telefono,
                correo: formData.correo,
                comuna: { id: parseInt(formData.comunaId) }
            };

            if (editingConcesionario) {
                await ConcesionariosService.updateConcesionario(editingConcesionario.id, payload);
            } else {
                await ConcesionariosService.createConcesionario(payload);
            }

            await loadConcesionarios();
            setIsModalOpen(false);
            setEditingConcesionario(null);
        } catch (error) {
            console.error('Error saving concesionario:', error);
            alert('Error al guardar el concesionario');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleOpenEdit = (concesionario) => {
        setEditingConcesionario({
            ...concesionario,
            comunaId: concesionario.comuna?.id
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await ConcesionariosService.deleteConcesionario(id);
            loadConcesionarios();
        } catch (error) {
            console.error('Error deleting concesionario:', error);
        }
    };

    if (loading) return <div className="p-8 text-center"><Text variant="p">Cargando...</Text></div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Text variant="h2" className="text-2xl font-bold text-gray-800">Gestión de Concesionarios</Text>
                <Button
                    onClick={() => {
                        setEditingConcesionario(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-black text-white hover:bg-gray-800"
                >
                    Nuevo Concesionario
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">ID</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">Nombre</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">Dirección</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">Comuna</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">Acciones</Text></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {concesionarios.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500"><Text variant="span">#{c.id}</Text></td>
                                <td className="p-4 font-medium text-gray-900"><Text variant="span">{c.nombre}</Text></td>
                                <td className="p-4 text-gray-600"><Text variant="span">{c.direccion}</Text></td>
                                <td className="p-4 text-gray-600"><Text variant="span">{c.comuna?.nombre}</Text></td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleOpenEdit(c)}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm bg-transparent p-0"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(c.id)}
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
                    setEditingConcesionario(null);
                }}
                onSubmit={handleCreate}
                inputsConfig={createInputs}
                title={editingConcesionario ? "Editar Concesionario" : "Crear Nuevo Concesionario"}
                submitText={editingConcesionario ? "Actualizar" : "Crear"}
                loading={submitLoading}
                initialData={editingConcesionario || {}}
            />
        </div>
    );
};

export default ConcesionariosList;
