import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/Input';

describe('Input', () => {
    it('renderiza el elemento input correctamente', () => {
        render(<Input placeholder="Enter text" />);
        const input = screen.getByPlaceholderText('Enter text');
        expect(input.tagName.toLowerCase()).toBe('input');
    });

    it('renderiza textarea cuando el tipo es textarea', () => {
        render(<Input type="textarea" placeholder="Enter description" />);
        const textarea = screen.getByPlaceholderText('Enter description');
        expect(textarea.tagName.toLowerCase()).toBe('textarea');
    });

    it('maneja el evento onChange', () => {
        const handleChange = jasmine.createSpy('handleChange');
        render(<Input onChange={handleChange} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'New Value' } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('aplica el estado disabled', () => {
        render(<Input disabled={true} />);
        const input = screen.getByRole('textbox');
        expect(input.disabled).toBe(true);
        expect(input.className).toContain('cursor-not-allowed');
    });
});
