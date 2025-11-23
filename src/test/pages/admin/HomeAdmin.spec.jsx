import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomeAdmin from '../../../pages/admin/HomeAdmin';

describe('HomeAdmin Page', () => {
    it('renderiza las tarjetas del dashboard', () => {
        render(
            <MemoryRouter>
                <HomeAdmin />
            </MemoryRouter>
        );

        expect(screen.getByText('Panel de Administración')).toBeDefined();
        expect(screen.getByText('Reservas')).toBeDefined();
        expect(screen.getByText('Vehículos')).toBeDefined();
        expect(screen.getByText('Marcas')).toBeDefined();
        expect(screen.getByText('Concesionarios')).toBeDefined();
        expect(screen.getByText('Usuarios')).toBeDefined();
    });
});
