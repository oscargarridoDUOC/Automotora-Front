import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReservaCard from '../../../components/molecules/ReservaCard';

describe('ReservaCard', () => {
    const mockReserva = {
        id: 1,
        vehiculo: {
            id: 101,
            marca: { nombre: 'Toyota' },
            modelo: 'Corolla',
            anio: 2022,
            imagenUrl: 'http://example.com/car.jpg'
        },
        estado: { estado: 'Confirmada' },
        fechaReserva: '2023-01-01',
        fechaEntrega: '2023-01-10',
        precioReserva: 50000
    };

    const renderWithRouter = (component) => {
        return render(<MemoryRouter>{component}</MemoryRouter>);
    };

    it('renderiza la información de la reserva correctamente', () => {
        renderWithRouter(<ReservaCard reserva={mockReserva} />);
        expect(screen.getByText('Toyota Corolla')).toBeDefined();
        expect(screen.getByText('Año 2022')).toBeDefined();
        expect(screen.getByText('Confirmada')).toBeDefined();
        expect(screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'p' && content.includes('$50,000');
        })).toBeDefined();
    });

    it('navega al detalle del vehículo al hacer clic', () => {
        const mockedNavigate = jasmine.createSpy('navigate');

        renderWithRouter(<ReservaCard reserva={mockReserva} />);
        const button = screen.getByRole('button', { name: /ver vehículo/i });
        expect(button).toBeDefined();
    });
});
