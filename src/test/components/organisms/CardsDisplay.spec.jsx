import React from 'react';
import { render, screen } from '@testing-library/react';
import CardsDisplay from '../../../components/organisms/CardsDisplay';

describe('CardsDisplay', () => {
    const content = [
        {
            card: [
                { type: 'image', src: 'img1.jpg', alt: 'Image 1' },
                { type: 'text', variant: 'h3', content: 'Title 1' }
            ]
        },
        {
            card: [
                { type: 'image', src: 'img2.jpg', alt: 'Image 2' },
                { type: 'text', variant: 'h3', content: 'Title 2' }
            ]
        }
    ];

    it('renderiza las tarjetas correctamente', () => {
        render(<CardsDisplay content={content} />);
        expect(screen.getByAltText('Image 1')).toBeDefined();
        expect(screen.getByText('Title 1')).toBeDefined();
        expect(screen.getByAltText('Image 2')).toBeDefined();
        expect(screen.getByText('Title 2')).toBeDefined();
    });

    it('renderiza en modo lista cuando isCardList es true', () => {
        const { container } = render(<CardsDisplay content={content} isCardList={true} />);
        expect(container.querySelector('.flex-col.gap-6')).toBeDefined();
    });
});
