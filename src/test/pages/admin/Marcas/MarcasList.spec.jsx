import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MarcasList from "../../../../pages/admin/Marcas/MarcasList";
import MarcasService from "../../../../services/MarcasService";

describe("MarcasList", () => {

    beforeEach(() => {
        spyOn(MarcasService, "getAllMarcas").and.returnValue(
            Promise.resolve([
                { id: 1, nombre: "Toyota" },
                { id: 2, nombre: "Mazda" }
            ])
        );

        spyOn(MarcasService, "deleteMarca").and.returnValue(Promise.resolve());
        spyOn(MarcasService, "createMarca").and.returnValue(Promise.resolve());
        spyOn(MarcasService, "updateMarca").and.returnValue(Promise.resolve());
    });

    it("muestra 'Cargando...' inicialmente", () => {
        render(<MarcasList />);
        expect(screen.getByText("Cargando...")).toBeTruthy();
    });

    it("carga y muestra las marcas en la tabla", async () => {
        render(<MarcasList />);

        await waitFor(() => {
            expect(screen.getByText("Toyota")).toBeTruthy();
            expect(screen.getByText("Mazda")).toBeTruthy();
        });
    });

    it("llama a deleteMarca al presionar 'Eliminar'", async () => {
        render(<MarcasList />);

        await waitFor(() => {
            expect(screen.getByText("Toyota")).toBeTruthy();
        });

        const deleteBtn = screen.getAllByText("Eliminar")[0];
        fireEvent.click(deleteBtn);

        expect(MarcasService.deleteMarca).toHaveBeenCalledWith(1);
    });

    it("abre el modal al presionar 'Nueva Marca'", async () => {
        render(<MarcasList />);

        await waitFor(() => {
            expect(screen.getByText("Toyota")).toBeTruthy();
        });

        const newBtn = screen.getByText("Nueva Marca");
        fireEvent.click(newBtn);

        expect(screen.getByText("Crear Nueva Marca")).toBeTruthy();
    });
});
