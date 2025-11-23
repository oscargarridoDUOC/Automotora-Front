import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image', () => {
    it('renderiza correctamente con src y alt', () => {
        const src = 'test.jpg';
        const alt = 'Test Image';
        render(<Image src={src} alt={alt} />);
        const img = screen.getByRole('img');
        expect(img.src).toContain(src);
        expect(img.alt).toBe(alt);
    });

    it('aplica className correctamente', () => {
        render(<Image src="test.jpg" alt="test" className="custom-class" />);
        const img = screen.getByRole('img');
        expect(img.className).toBe('custom-class');
    });
});
