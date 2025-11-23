import axios from 'axios';

const BASE_URL = 'https://automotora-backend.onrender.com/api/v1/contacto';

class ContactoService {
    async getAllContactos() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error obteniendo contactos:', error);
            throw error;
        }
    }

    async enviarContacto(contacto) {
        try {
            const response = await axios.post(BASE_URL, contacto);
            return response.data;
        } catch (error) {
            console.error('Error enviando contacto:', error);
            throw error;
        }
    }

    async deleteContacto(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true;
        } catch (error) {
            console.error('Error eliminando contacto:', error);
            throw error;
        }
    }
}

export default new ContactoService();
