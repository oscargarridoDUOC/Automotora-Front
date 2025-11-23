import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputFile from '../../../components/atoms/InputFile';

describe('InputFile', () => {
    it('renderiza el input de archivo correctamente', () => {
        render(<InputFile />);
        expect(screen.getByText('Seleccionar imagen')).toBeDefined();
    });

    it('muestra previsualización cuando se proporciona', () => {
        const previewUrl = 'http://example.com/preview.jpg';
        render(<InputFile preview={previewUrl} />);
        const img = screen.getByAltText('Previsualización');
        expect(img.src).toBe(previewUrl);
    });

    it('llama a onChange cuando se selecciona un archivo', () => {
        const handleChange = jasmine.createSpy('handleChange');
        render(<InputFile onChange={handleChange} />);

        const container = screen.getByText('Seleccionar imagen').closest('div').parentElement;
        const input = container.querySelector('input[type="file"]');

        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
        fireEvent.change(input, { target: { files: [file] } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('muestra "Subiendo..." cuando está deshabilitado', () => {
        render(<InputFile disabled={true} />);
        expect(screen.getByText('Subiendo...')).toBeDefined();
    });
});
