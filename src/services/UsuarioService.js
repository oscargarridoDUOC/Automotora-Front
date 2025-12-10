import axios from './axiosConfig';

const BASE_URL = 'https://automotora-backend.onrender.com/api/v1/usuarios';

class UsuarioService {

    login(usuario) {
        return axios.post(`${BASE_URL}/login`, usuario);
    }

    createUsuario(usuario) {
        return axios.post(`${BASE_URL}`, usuario);
    }

    async getAllUsuarios() {
        const response = await axios.get(BASE_URL);
        return response.data;
    }

    getUsuarioById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }

    updateUsuario(id, usuario) {
        return axios.put(`${BASE_URL}/${id}`, usuario);
    }

    deleteUsuario(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }
}

export default new UsuarioService();
