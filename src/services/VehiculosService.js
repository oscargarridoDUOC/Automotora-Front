import axios from 'axios';

const BASE_URL = 'https://automotora-backend.onrender.com/api/v1/vehiculos';
const DEFAULT_IMAGE = 'https://www.hola.com/horizon/landscape/ec878ddab16b-cuidardgatito-t.jpg?im=Resize=(960),type=downsize';

class VehiculosService {
    async getAllVehiculos() {
        try {
            const response = await axios.get(BASE_URL);
            // Use backend image if available, otherwise use default
            return response.data.map(v => ({ ...v, imagenUrl: v.imagen || DEFAULT_IMAGE }));
        } catch (error) {
            console.error('Error fetching vehiculos:', error);
            throw error;
        }
    }

    async getVehiculoById(id) {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return { ...response.data, imagenUrl: response.data.imagen || DEFAULT_IMAGE };
        } catch (error) {
            console.error(`Error fetching vehiculo ${id}:`, error);
            throw error;
        }
    }

    async createVehiculo(vehiculo) {
        try {
            const response = await axios.post(BASE_URL, vehiculo);
            return response.data;
        } catch (error) {
            console.error('Error creating vehiculo:', error);
            throw error;
        }
    }

    async updateVehiculo(id, vehiculo) {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, vehiculo);
            return response.data;
        } catch (error) {
            console.error(`Error updating vehiculo ${id}:`, error);
            throw error;
        }
    }

    async deleteVehiculo(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting vehiculo ${id}:`, error);
            throw error;
        }
    }
}

export default new VehiculosService();
