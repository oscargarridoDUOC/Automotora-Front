import React from 'react';
import { render, screen } from '@testing-library/react';
import DynamicInputs from '../../../components/molecules/DynamicInput';

describe('DynamicInputs', () => {
    const mockInputs = [
        {
            name: 'name',
            placeholder: 'Ingresa tu nombre',
            type: 'text',
        },
        {
            name: 'email',
            placeholder: 'Ingresa tu correo',
            type: 'email',
        },
        {
            name: 'mensaje',
            type: 'textarea',
            placeholder: 'Escribe tu mensaje',
        },
    ];

    it('renderiza todos los inputs', () => {
        render(<DynamicInputs Inputs={mockInputs} />);
        expect(screen.getByPlaceholderText('Ingresa tu nombre')).toBeDefined();
        expect(screen.getByPlaceholderText('Ingresa tu correo')).toBeDefined();
    });

    it('renderiza un textarea cuando el tipo es "textarea"', () => {
        render(<DynamicInputs Inputs={mockInputs} />);
        const textarea = screen.getByPlaceholderText('Escribe tu mensaje');
        expect(textarea.tagName.toLowerCase()).toBe('textarea');
    });
});
