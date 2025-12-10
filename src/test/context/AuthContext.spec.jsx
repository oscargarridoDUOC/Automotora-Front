import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../context/AuthContext";

function TestComponent() {
    const { user, token, login, logout, loading } = useAuth();

    return (
        <div>
            <div data-testid="loading">{loading ? "true" : "false"}</div>
            <div data-testid="user">{user ? user.nombre : "null"}</div>
            <div data-testid="token">{token || "null"}</div>

            <button onClick={() => login({ nombre: "Ricardo" }, "test-jwt-token")}>login</button>
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

    it("login guarda el usuario y token en localStorage", async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText("login"));

        await waitFor(() => {
            const stored = JSON.parse(localStorage.getItem("user"));
            expect(stored.nombre).toBe("Ricardo");
            expect(localStorage.getItem("token")).toBe("test-jwt-token");
        });
    });

    it("logout elimina el usuario y token de localStorage", async () => {
        localStorage.setItem("user", JSON.stringify({ nombre: "Ricardo" }));
        localStorage.setItem("token", "test-jwt-token");

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText("logout"));

        await waitFor(() => {
            expect(localStorage.getItem("user")).toBe(null);
            expect(localStorage.getItem("token")).toBe(null);
        });
    });
});
