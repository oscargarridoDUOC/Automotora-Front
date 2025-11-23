import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VehicleCard from '../../../components/molecules/VehicleCard';

describe('VehicleCard', () => {
    const mockVehicle = {
        id: 1,
        marca: { nombre: 'Ford' },
        modelo: 'Mustang',
        anio: 2024,
        precio: 45000000,
        transmision: { tipo: 'Manual' },
        combustible: { tipo: 'Gasolina' },
        imagenUrl: 'http://example.com/mustang.jpg'
    };

    const renderWithRouter = (component) => {
        return render(<MemoryRouter>{component}</MemoryRouter>);
    };

    it('renderiza la información del vehículo correctamente', () => {
        renderWithRouter(<VehicleCard vehicle={mockVehicle} />);
        expect(screen.getByText('Ford')).toBeDefined();
        expect(screen.getByText('Mustang')).toBeDefined();
        expect(screen.getByText('2024')).toBeDefined();
        expect(screen.getByText('Manual')).toBeDefined();
        expect(screen.getByText('Gasolina')).toBeDefined();
        expect(screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'div' && content.includes('$45,000,000');
        })).toBeDefined();
    });

    it('contiene enlace a los detalles', () => {
        renderWithRouter(<VehicleCard vehicle={mockVehicle} />);
        const link = screen.getByRole('link', { name: /ver detalles/i });
        expect(link.getAttribute('href')).toBe('/vehiculo/1');
    });
});
