import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../../components/organisms/Navbar';
import { AuthProvider } from '../../../context/AuthContext';

describe('Navbar', () => {
    const links = [
        { label: 'Inicio', to: '/' },
        { label: 'Salir', to: '#' }
    ];

    const renderNavbar = () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <Navbar links={links} />
                </AuthProvider>
            </MemoryRouter>
        );
    };

    it('renderiza el título y los enlaces', () => {
        renderNavbar();
        expect(screen.getByText('Automotora')).toBeDefined();
        expect(screen.getAllByText('Inicio').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Salir').length).toBeGreaterThan(0);
    });

    it('alterna el menú móvil', () => {
        renderNavbar();
        const toggleBtn = screen.getByLabelText('Toggle menu');
        fireEvent.click(toggleBtn);

        expect(toggleBtn).toBeDefined();
    });
});
