import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import VehiculosList from "../../../../pages/admin/Vehiculos/VehiculosList";
import VehiculosService from "../../../../services/VehiculosService";

describe("VehiculosList", () => {

    beforeEach(() => {
        spyOn(VehiculosService, "getAllVehiculos").and.returnValue(
            Promise.resolve([
                { id: 1, marca: { nombre: "Mazda" }, modelo: "3", anio: 2021, precio: 15000000 },
                { id: 2, marca: { nombre: "Toyota" }, modelo: "Corolla", anio: 2020, precio: 12000000 }
            ])
        );
    });

    it("muestra vehículos en la tabla", async () => {
        render(<VehiculosList />);

        await waitFor(() => {
            expect(screen.getByText("Mazda")).toBeTruthy();
            expect(screen.getByText("Toyota")).toBeTruthy();
        });
    });

    it("llama a eliminar vehículo al presionar 'Eliminar'", async () => {
        spyOn(VehiculosService, "deleteVehiculo").and.returnValue(Promise.resolve());

        render(<VehiculosList />);

        await waitFor(() => screen.getByText("Mazda"));

        fireEvent.click(screen.getAllByText("Eliminar")[0]);

        expect(VehiculosService.deleteVehiculo).toHaveBeenCalled();
    });
});
