import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DynamicTable from '../../../components/molecules/DynamicTable';

describe('DynamicTable', () => {
    const columns = ['ID', 'Nombre', 'Rol', 'Acciones'];
    const data = [
        { id: 1, nombre: 'Juan', rol: 'Admin' },
        { id: 2, nombre: 'Pedro', rol: 'User' }
    ];

    it('renderiza los encabezados correctamente', () => {
        render(<DynamicTable columns={columns} data={data} />);
        columns.forEach(col => {
            expect(screen.getByText(col)).toBeDefined();
        });
    });

    it('renderiza las filas de datos correctamente', () => {
        render(<DynamicTable columns={columns} data={data} />);
        expect(screen.getByText('Juan')).toBeDefined();
        expect(screen.getByText('Pedro')).toBeDefined();
        expect(screen.getByText('Admin')).toBeDefined();
    });

    it('renderiza mensaje vacío cuando no hay datos', () => {
        render(<DynamicTable columns={columns} data={[]} emptyMessage="No hay nada" />);
        expect(screen.getByText('No hay nada')).toBeDefined();
    });

    it('renderiza botones de acciones cuando existe la columna "Acciones"', () => {
        const handleEdit = jasmine.createSpy('handleEdit');
        const handleDelete = jasmine.createSpy('handleDelete');
        const dataWithActions = [
            { id: 1, nombre: 'Juan', rol: 'Admin', onEdit: handleEdit, onDelete: handleDelete }
        ];

        render(<DynamicTable columns={columns} data={dataWithActions} />);

        const editBtns = screen.getAllByRole('button', { name: /editar/i });
        const deleteBtns = screen.getAllByRole('button', { name: /eliminar/i });

        expect(editBtns.length).toBeGreaterThan(0);
        expect(deleteBtns.length).toBeGreaterThan(0);

        fireEvent.click(editBtns[0]);
        expect(handleEdit).toHaveBeenCalled();

        fireEvent.click(deleteBtns[0]);
        expect(handleDelete).toHaveBeenCalled();
    });
});
