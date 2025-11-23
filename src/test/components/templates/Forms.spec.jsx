import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Forms from '../../../components/templates/Forms';

describe('Forms', () => {
    const content = [
        { type: 'text', text: [{ id: 1, variant: 'h1', content: 'Form Title' }] },
        { type: 'inputs', inputs: [{ name: 'field1', placeholder: 'Field 1' }] },
        { type: 'button', text: 'Submit', onClick: jasmine.createSpy('onClick') }
    ];

    it('renderiza todos los componentes según el contenido', () => {
        render(<Forms content={content} />);
        expect(screen.getByRole('heading', { name: 'Form Title' })).toBeDefined();
        expect(screen.getByPlaceholderText('Field 1')).toBeDefined();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeDefined();
    });

    it('maneja el clic en el botón', () => {
        render(<Forms content={content} />);
        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
        expect(content[2].onClick).toHaveBeenCalled();
    });
});
