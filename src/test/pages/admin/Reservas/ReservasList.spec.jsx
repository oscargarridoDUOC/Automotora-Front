import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ReservasList from "../../../../pages/admin/Reservas/ReservasList";
import ReservasService from "../../../../services/ReservasService";
import EstadosReservaService from "../../../../services/EstadosReservaService";
import { generarMensaje } from "../../../../utils/GenerarMensaje";

describe("ReservasList", () => {

    beforeEach(() => {
        spyOn(window, "confirm").and.returnValue(true);
        spyOn(generarMensaje, "apply");

        spyOn(ReservasService, "getAllReservas").and.returnValue(
            Promise.resolve([
                {
                    id: 1,
                    usuario: { nombre: "Juan", correo: "juan@test.com" },
                    vehiculo: {
                        marca: { nombre: "Mazda" },
                        modelo: "3",
                        anio: 2021
                    },
                    fechaReserva: "2025-01-01",
                    fechaEntrega: "2025-01-10",
                    precioReserva: 15000000,
                    estado: { id: 1, estado: "Pendiente" }
                }
            ])
        );

        spyOn(EstadosReservaService, "getAllEstadosReserva").and.returnValue(
            Promise.resolve([
                { id: 1, estado: "Pendiente" },
                { id: 2, estado: "Confirmada" }
            ])
        );

        spyOn(ReservasService, "updateReserva").and.returnValue(Promise.resolve());
        spyOn(ReservasService, "deleteReserva").and.returnValue(Promise.resolve());
    });

    it("muestra 'Cargando...' inicialmente", () => {
        render(<ReservasList />);
        expect(screen.getByText("Cargando...")).toBeTruthy();
    });

    it("carga y muestra reservas en la tabla", async () => {
        render(<ReservasList />);

        await waitFor(() => {
            expect(screen.getByText("Juan")).toBeTruthy();
            expect(screen.getByText("Mazda 3")).toBeTruthy();
            expect(screen.getByText("31 dic 2024")).toBeTruthy();

        });
    });

    it("cambia el estado de una reserva", async () => {
        render(<ReservasList />);

        await waitFor(() => {
            expect(screen.getByText("Juan")).toBeTruthy();
        });

        const estadoSelect = screen.getByDisplayValue("Pendiente");
        fireEvent.change(estadoSelect, { target: { value: "2" } });

        expect(ReservasService.updateReserva).toHaveBeenCalled();
    });
});
