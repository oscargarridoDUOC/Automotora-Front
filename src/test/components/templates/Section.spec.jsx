import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Section from '../../../components/templates/Section';

describe('Section', () => {
    const content = [
        { type: 'text', text: [{ id: 1, variant: 'h2', content: 'Section Title' }] },
        { type: 'image', src: 'img.jpg', alt: 'Section Image' },
        { type: 'cards', cards: [{ card: [{ type: 'text', variant: 'p', content: 'Card Text' }] }] }
    ];

    it('renderiza el contenido de la sección correctamente', () => {
        render(
            <MemoryRouter>
                <Section content={content} />
            </MemoryRouter>
        );
        expect(screen.getByRole('heading', { name: 'Section Title' })).toBeDefined();
        expect(screen.getByAltText('Section Image')).toBeDefined();
        expect(screen.getByText('Card Text')).toBeDefined();
    });
});
