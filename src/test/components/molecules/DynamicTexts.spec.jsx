import React from 'react';
import { render, screen } from '@testing-library/react';
import DynamicTexts from '../../../components/molecules/DynamicTexts';

describe('DynamicTexts', () => {
    const texts = [
        { id: 1, variant: 'h1', content: 'Title', className: 'title-class' },
        { id: 2, variant: 'p', content: 'Description', className: 'desc-class' }
    ];

    it('renderiza todos los textos', () => {
        render(<DynamicTexts Texts={texts} />);
        expect(screen.getByRole('heading', { name: 'Title' })).toBeDefined();
        expect(screen.getByText('Description')).toBeDefined();
    });

    it('aplica las clases correctamente', () => {
        render(<DynamicTexts Texts={texts} />);
        const title = screen.getByRole('heading', { name: 'Title' });
        expect(title.className).toBe('title-class');
    });
});
