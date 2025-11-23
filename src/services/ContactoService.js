import axios from 'axios';

const BASE_URL = 'https://automotora-backend.onrender.com/api/v1/contacto';

class ContactoService {
    async enviarContacto(contacto) {
        try {
            const response = await axios.post(BASE_URL, contacto);
            return response.data;
        } catch (error) {
            console.error('Error enviando contacto:', error);
            throw error;
        }
    }
}

export default new ContactoService();
