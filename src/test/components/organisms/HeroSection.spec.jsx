import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '../../../components/organisms/HeroSection';

describe('HeroSection', () => {
    it('renderiza los textos principales correctamente', () => {
        render(<HeroSection />);
        expect(screen.getByText((text) => text.includes('Encuentra tu'))).toBeDefined();
        expect(screen.getByText((text) => text.includes('Vehículo Ideal'))).toBeDefined();
        expect(screen.getByText((text) => text.includes('Explora nuestra selección premium'))).toBeDefined();
    });

    it('renderiza los botones de acción', () => {
        render(<HeroSection />);
        expect(screen.getByRole('button', { name: /ver catálogo/i })).toBeDefined();
        expect(screen.getByRole('button', { name: /contáctanos/i })).toBeDefined();
    });
});
