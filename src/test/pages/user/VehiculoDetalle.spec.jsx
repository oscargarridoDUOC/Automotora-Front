import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import VehiculoDetalle from '../../../pages/user/VehiculoDetalle';
import VehiculosService from '../../../services/VehiculosService';
import { AuthProvider } from '../../../context/AuthContext';

describe('VehiculoDetalle', () => {
    const mockVehiculo = {
        id: 1,
        modelo: 'Model S',
        precio: 90000000,
        anio: 2023,
        marca: { nombre: 'Tesla' },
        transmision: { tipo: 'Automática' },
        combustible: { tipo: 'Eléctrico' },
        concesionario: { nombre: 'Tesla Chile', comuna: { nombre: 'Santiago' } },
        descripcion: 'Un auto eléctrico',
        imagenUrl: 'http://example.com/image.jpg'
    };

    beforeEach(() => {
        spyOn(VehiculosService, 'getVehiculoById').and.returnValue(Promise.resolve(mockVehiculo));
    });

    const renderWithRoute = (id) => {
        render(
            <MemoryRouter initialEntries={[`/vehiculos/${id}`]}>
                <AuthProvider>
                    <Routes>
                        <Route path="/vehiculos/:id" element={<VehiculoDetalle />} />
                    </Routes>
                </AuthProvider>
            </MemoryRouter>
        );
    };

    it('renderiza correctamente el vehículo si existe', async () => {
        renderWithRoute('1');

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /model s/i })).toBeDefined();
            expect(screen.getByText((content, element) => {
                return element.tagName.toLowerCase() === 'div' && content.includes('$90,000,000');
            })).toBeDefined();
        });
    });
});
