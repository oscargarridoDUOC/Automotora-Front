import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../../pages/user/Home';
import VehiculosService from '../../../services/VehiculosService';
import MarcasService from '../../../services/MarcasService';

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

    const mockMarcas = [
        { id: 1, nombre: 'Toyota' },
        { id: 2, nombre: 'Chevrolet' }
    ];

    it('renderiza estado de carga inicialmente', () => {
        spyOn(VehiculosService, 'getAllVehiculos').and.returnValue(new Promise(() => { }));
        spyOn(MarcasService, 'getAllMarcas').and.returnValue(new Promise(() => { }));
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
        spyOn(MarcasService, 'getAllMarcas').and.returnValue(Promise.resolve(mockMarcas));
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getAllByText('Toyota')).toBeDefined();
            expect(screen.getByText('Corolla')).toBeDefined();
        });
    });

    it('renderiza mensaje de error cuando falla la carga', async () => {
        spyOn(console, 'error');
        spyOn(VehiculosService, 'getAllVehiculos').and.callFake(() => Promise.reject(new Error('Error')));
        spyOn(MarcasService, 'getAllMarcas').and.callFake(() => Promise.reject(new Error('Error')));

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const errorMsg = await screen.findByText(/No se pudieron cargar/i, {}, { timeout: 4000 });
        expect(errorMsg).toBeDefined();
    });
});
