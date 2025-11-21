const loginData = [
    {
        type: "text",
        text: [
            {
                content: "Inicio de Sesión",
                variant: "h1",
                className: "text-center text-4xl font-bold mb-10 text-zinc-900  tracking-tight",
            }
        ]
    },
    {
        type: "inputs",
        inputs: [
            {
                type: "email",
                placeholder: "Correo Electrónico",
                name: "correo",
                required: true,
                autoComplete: "off",
                className: "w-full border-b-2 border-zinc-300 700 bg-transparent text-lg py-2 outline-none focus:border-black :border-white transition-colors text-zinc-900  placeholder-zinc-400",
            },
            {
                type: "password",
                placeholder: "Contraseña",
                name: "contrasena",
                required: true,
                autoComplete: "current-password",
                className: "w-full border-b-2 border-zinc-300 700 bg-transparent text-lg py-2 outline-none focus:border-black :border-white transition-colors text-zinc-900  placeholder-zinc-400",
            },
        ],
        className: "space-y-8"
    },
    {
        type: "button",
        text: "Iniciar Sesión",
        className: "w-full mt-8 mb-4 py-4 bg-black  text-white  rounded-full font-bold hover:bg-zinc-800 :bg-zinc-200 transition-colors",
    },
    {
        type: "text",
        text: [
            {
                content: (
                    <button
                        type="button"
                        onClick={() => window.location.href = '/create-user'}
                        className="text-zinc-500 hover:text-black :text-white underline transition-colors"
                    >
                        Crear usuario
                    </button>
                ),
                variant: "p",
                className: "text-center text-sm mt-4",
            },
        ],
    },
];

export default loginData;