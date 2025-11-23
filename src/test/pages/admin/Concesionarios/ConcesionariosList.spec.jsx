import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ConcesionariosList from "../../../../pages/admin/Concesionarios/ConcesionariosList";
import ConcesionariosService from "../../../../services/ConcesionariosService";

describe("ConcesionariosList", () => {
    beforeEach(() => {
        spyOn(ConcesionariosService, "getAllConcesionarios").and.returnValue(
            Promise.resolve([
                {
                    id: 1,
                    nombre: "Sucursal Test",
                    direccion: "Av 123",
                    comuna: { id: 10, nombre: "Santiago" }
                }
            ])
        );

        spyOn(ConcesionariosService, "createConcesionario").and.returnValue(
            Promise.resolve({})
        );

        spyOn(ConcesionariosService, "updateConcesionario").and.returnValue(
            Promise.resolve({})
        );

        spyOn(ConcesionariosService, "deleteConcesionario").and.returnValue(
            Promise.resolve({})
        );
    });

    it("muestra loading inicialmente", () => {
        render(<ConcesionariosList />);

        expect(screen.getByText("Cargando...")).toBeTruthy();
    });

    it("carga y muestra concesionarios en la tabla", async () => {
        render(<ConcesionariosList />);

        expect(await screen.findByText("Sucursal Test")).toBeTruthy();
        expect(screen.getByText("Santiago")).toBeTruthy();
    });

    it("abre modal con datos al presionar 'Editar'", async () => {
        render(<ConcesionariosList />);

        await screen.findByText("Sucursal Test");

        fireEvent.click(screen.getByText("Editar"));

        await waitFor(() => {
            expect(screen.getByDisplayValue("Sucursal Test")).toBeTruthy();
        });
    });

    it("llama a deleteConcesionario al presionar 'Eliminar'", async () => {
        render(<ConcesionariosList />);

        await screen.findByText("Sucursal Test");

        fireEvent.click(screen.getByText("Eliminar"));

        expect(ConcesionariosService.deleteConcesionario).toHaveBeenCalledWith(1);
    });
});
