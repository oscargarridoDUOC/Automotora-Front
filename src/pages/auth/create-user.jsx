import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Forms from '../../components/templates/Forms';
import { generarMensaje } from '../../utils/GenerarMensaje';
import UsuarioService from '../../services/UsuarioService';

const CreateUser = () => {
    const [form, setForm] = useState({ nombre: "", rut: "", correo: "", contrasena: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nombre || !form.rut || !form.correo || !form.contrasena) {
            generarMensaje('Completa todos los campos', 'warning');
            return;
        }

        setLoading(true);

        try {
            const usuario = {
                "nombre": form.nombre,
                "rut": form.rut,
                "correo": form.correo,
                "contrasena": form.contrasena,
                "rol": {
                    "id": 3
                }
            }
            await UsuarioService.createUsuario(usuario);

            generarMensaje('Usuario creado exitosamente!', 'success');

            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || 'Error al crear usuario';
            generarMensaje(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    const Login = [
        {
            type: "text",
            text: [
                {
                    content: "Crear usuario",
                    variant: "h1",
                    className: "text-center text-4xl font-bold mb-10 text-zinc-900  tracking-tight",
                }
            ]
        },
        {
            type: "inputs",
            inputs: [
                {
                    type: "text",
                    placeholder: "Nombre",
                    name: "nombre",
                    value: form.nombre,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "off",
                    className: "w-full border-b-2 border-zinc-300 700 bg-transparent text-lg py-2 outline-none focus:border-black :border-white transition-colors text-zinc-900  placeholder-zinc-400 mb-4",
                },
                {
                    type: "text",
                    placeholder: "RUT",
                    name: "rut",
                    value: form.rut,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "off",
                    className: "w-full border-b-2 border-zinc-300 700 bg-transparent text-lg py-2 outline-none focus:border-black :border-white transition-colors text-zinc-900  placeholder-zinc-400 mb-4",
                },
                {
                    type: "email",
                    placeholder: "Correo Electrónico",
                    name: "correo",
                    value: form.correo,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "off",
                    className: "w-full border-b-2 border-zinc-300 700 bg-transparent text-lg py-2 outline-none focus:border-black :border-white transition-colors text-zinc-900  placeholder-zinc-400 mb-4",
                },
                {
                    type: "password",
                    placeholder: "Contraseña",
                    name: "contrasena",
                    value: form.contrasena,
                    onChange: handleChange,
                    required: true,
                    autoComplete: "current-password",
                    className: "w-full border-b-2 border-zinc-300 700 bg-transparent text-lg py-2 outline-none focus:border-black :border-white transition-colors text-zinc-900  placeholder-zinc-400",
                },
            ],
            className: "space-y-8"
        },
        {
            type: "button",
            text: loading ? "Creando..." : "Crear usuario",
            disabled: loading,
            className: "w-full mt-8 mb-4 py-4 bg-black  text-white  rounded-full font-bold hover:bg-zinc-800 :bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        },
        {
            type: "text",
            text: [
                {
                    content: (
                        <Link
                            to="/login"
                            className="text-zinc-500 hover:text-black :text-white underline transition-colors"
                        >
                            Ya tengo un usuario
                        </Link>
                    ),
                    variant: "p",
                    className: "text-center text-sm mt-4",
                },
            ],
        },
    ];
    return (
        <>
            <main className="flex min-h-screen items-center justify-center bg-zinc-50  p-4">
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-10 rounded-2xl bg-white 900 p-10 shadow-xl border border-zinc-200 800">
                    <Forms content={Login} />
                </form>
            </main>
        </>
    );
};

export default CreateUser;   