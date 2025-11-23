import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../context/AuthContext";

function TestComponent() {
    const { user, login, logout, loading } = useAuth();

    return (
        <div>
            <div data-testid="loading">{loading ? "true" : "false"}</div>
            <div data-testid="user">{user ? user.nombre : "null"}</div>

            <button onClick={() => login({ nombre: "Ricardo" })}>login</button>
            <button onClick={logout}>logout</button>
        </div>
    );
}

describe("AuthContext", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it("login guarda usuario", async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText("login"));

        await waitFor(() =>
            expect(screen.getByTestId("user").textContent).toBe("Ricardo")
        );
    });

    it("logout elimina usuario", async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText("login"));

        await waitFor(() =>
            expect(screen.getByTestId("user").textContent).toBe("Ricardo")
        );

        fireEvent.click(screen.getByText("logout"));

        await waitFor(() =>
            expect(screen.getByTestId("user").textContent).toBe("null")
        );
    });

    it("login guarda el usuario en localStorage", async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText("login"));

        await waitFor(() => {
            const stored = JSON.parse(localStorage.getItem("user"));
            expect(stored.nombre).toBe("Ricardo");
        });
    });

    it("logout elimina el usuario de localStorage", async () => {
        localStorage.setItem("user", JSON.stringify({ nombre: "Ricardo" }));

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText("logout"));

        await waitFor(() => {
            expect(localStorage.getItem("user")).toBe(null);
        });
    });
});
