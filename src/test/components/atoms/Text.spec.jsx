import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text', () => {
    it('renderiza el contenido correctamente', () => {
        render(<Text>Hello World</Text>);
        expect(screen.getByText('Hello World')).toBeDefined();
    });

    it('renderiza con la variante p por defecto', () => {
        render(<Text>Paragraph</Text>);
        const element = screen.getByText('Paragraph');
        expect(element.tagName.toLowerCase()).toBe('p');
    });

    it('renderiza con la variante especificada', () => {
        render(<Text variant="h1">Heading</Text>);
        const element = screen.getByRole('heading', { name: 'Heading' });
        expect(element.tagName.toLowerCase()).toBe('h1');
    });

    it('aplica className', () => {
        render(<Text className="text-red-500">Colored Text</Text>);
        const element = screen.getByText('Colored Text');
        expect(element.className).toBe('text-red-500');
    });
});
