import React, { useState, useEffect } from 'react';
import UsuarioService from '../../../services/UsuarioService';
import RolesService from '../../../services/RolesService';
import CreateModal from '../../../components/organisms/CreateModal';
import { generarMensaje } from '../../../utils/GenerarMensaje';
import Text from '../../../components/atoms/Text';
import Button from '../../../components/atoms/Button';

const createInputs = [
    { name: "nombre", type: "text", placeholder: "Nombre", required: true },
    { name: "rut", type: "text", placeholder: "RUT", required: true },
    { name: "correo", type: "email", placeholder: "Correo", required: true },
    { name: "rolId", type: "text", placeholder: "ID Rol", required: true },
];

const UsuariosList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editingUsuario, setEditingUsuario] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [usuariosData, rolesData] = await Promise.all([
                UsuarioService.getAllUsuarios(),
                RolesService.getAllRoles()
            ]);
            setUsuarios(usuariosData);
            setRoles(rolesData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeRol = async (usuarioId, nuevoRolId) => {
        try {
            const usuario = usuarios.find(u => u.id === usuarioId);
            if (!usuario) return;

            const payload = {
                nombre: usuario.nombre,
                rut: usuario.rut,
                correo: usuario.correo,
                rol: { id: parseInt(nuevoRolId) }
            };

            await UsuarioService.updateUsuario(usuarioId, payload);
            generarMensaje('Rol actualizado exitosamente', 'success');
            loadData();
        } catch (error) {
            console.error('Error updating rol:', error);
            generarMensaje('Error al actualizar el rol', 'error');
        }
    };

    const handleUpdate = async (formData) => {
        setSubmitLoading(true);
        try {
            const payload = {
                nombre: formData.nombre,
                rut: formData.rut,
                correo: formData.correo,
                rol: { id: parseInt(formData.rolId) }
            };

            await UsuarioService.updateUsuario(editingUsuario.id, payload);
            await loadData();
            setIsModalOpen(false);
            setEditingUsuario(null);
            generarMensaje('Usuario actualizado exitosamente', 'success');
        } catch (error) {
            console.error('Error saving usuario:', error);
            generarMensaje('Error al guardar el usuario', 'error');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleOpenEdit = (usuario) => {
        const rolId = typeof usuario.rol === 'object' ? usuario.rol?.id : usuario.rol;
        setEditingUsuario({
            ...usuario,
            rolId: rolId
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Está seguro que desea eliminar este usuario?')) return;

        try {
            await UsuarioService.deleteUsuario(id);
            generarMensaje('Usuario eliminado exitosamente', 'success');
            loadData();
        } catch (error) {
            console.error('Error deleting usuario:', error);
            generarMensaje('Error al eliminar el usuario', 'error');
        }
    };

    const getRoleBadgeColor = (rolNombre) => {
        const rolLower = rolNombre?.toLowerCase() || '';
        if (rolLower === 'admin') return 'bg-purple-100 text-purple-800';
        if (rolLower === 'vendedor') return 'bg-blue-100 text-blue-800';
        if (rolLower === 'cliente') return 'bg-zinc-100 text-zinc-800';
        return 'bg-zinc-100 text-zinc-800';
    };

    if (loading) return <div className="p-8 text-center"><Text variant="p">Cargando...</Text></div>;

    return (
        <div className="p-6">
            <div className="mb-6">
                <Text variant="h2" className="text-2xl font-bold text-gray-800">Gestión de Usuarios</Text>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">ID</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">Nombre</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">RUT</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">Correo</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">Rol</Text></th>
                            <th className="p-4 font-semibold text-gray-600"><Text variant="span">Acciones</Text></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-gray-500"><Text variant="span">#{usuario.id}</Text></td>
                                <td className="p-4 font-medium text-gray-900"><Text variant="span">{usuario.nombre}</Text></td>
                                <td className="p-4 text-gray-600"><Text variant="span">{usuario.rut}</Text></td>
                                <td className="p-4 text-gray-600"><Text variant="span">{usuario.correo}</Text></td>
                                <td className="p-4">
                                    <select
                                        value={usuario.rol?.id || ''}
                                        onChange={(e) => handleChangeRol(usuario.id, e.target.value)}
                                        className={`px-3 py-1 rounded-full text-xs font-semibold border-0 ${getRoleBadgeColor(usuario.rol?.nombre)}`}
                                    >
                                        {roles.map(rol => (
                                            <option key={rol.id} value={rol.id}>
                                                {rol.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleOpenEdit(usuario)}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm bg-transparent p-0"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(usuario.id)}
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

            {editingUsuario && (
                <CreateModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingUsuario(null);
                    }}
                    onSubmit={handleUpdate}
                    inputsConfig={createInputs}
                    title="Editar Usuario"
                    submitText="Actualizar"
                    loading={submitLoading}
                    initialData={editingUsuario}
                />
            )}
        </div>
    );
};

export default UsuariosList;
