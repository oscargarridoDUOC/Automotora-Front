import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('Button', () => {
    it('renderiza el texto correctamente', () => {
        render(<Button>Click aquí</Button>);
        const button = screen.getByRole('button', { name: /click aquí/i });
        expect(button).toBeDefined();
    });

    it('ejecuta onClick cuando se hace clic', () => {
        const handleClick = jasmine.createSpy('handleClick');
        render(<Button onClick={handleClick}>Enviar</Button>);
        fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
        expect(handleClick).toHaveBeenCalled();
    });

    it('aplica props correctamente', () => {
        render(<Button className="btn-danger">Eliminar</Button>);
        const button = screen.getByRole('button', { name: /eliminar/i });
        expect(button.className).toContain('btn-danger');
    });
});
