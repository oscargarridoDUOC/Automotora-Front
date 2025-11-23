import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../../pages/user/Home';
import VehiculosService from '../../../services/VehiculosService';

describe('Home Page', () => {
    const mockVehiculos = [
        {
            id: 1,
            marca: { nombre: 'Toyota' },
            modelo: 'Corolla',
            anio: 2022,
            precio: 20000000,
            imagenUrl: 'http://example.com/car.jpg'
        }
    ];

    it('renderiza estado de carga inicialmente', () => {
        spyOn(VehiculosService, 'getAllVehiculos').and.returnValue(new Promise(() => { }));
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const spinner = document.querySelector('.animate-spin');
        expect(spinner).toBeDefined();
    });

    it('renderiza vehículos después de la carga', async () => {
        spyOn(VehiculosService, 'getAllVehiculos').and.returnValue(Promise.resolve(mockVehiculos));
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Toyota')).toBeDefined();
            expect(screen.getByText('Corolla')).toBeDefined();
        });
    });

    it('renderiza mensaje de error al fallar', async () => {
        spyOn(VehiculosService, 'getAllVehiculos').and.returnValue(Promise.reject('Error'));
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText((content) => content.includes('No se pudieron cargar los vehículos'))).toBeDefined();
        });
    });
});
