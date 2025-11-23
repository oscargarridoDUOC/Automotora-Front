import VehiculosService from "../../services/VehiculosService";
import axios from "axios";

describe("VehiculosService", () => {

    beforeEach(() => {
        if (axios.get.and) {
            axios.get.and.stub();
        }
        spyOn(axios, "get");
    });

    it("getAllVehiculos retorna vehículos formateados", async () => {
        axios.get.and.returnValue(
            Promise.resolve({
                data: [
                    { id: 1, imagen: "img1.jpg" },
                    { id: 2, imagen: null }
                ]
            })
        );

        const result = await VehiculosService.getAllVehiculos();

        expect(result.length).toBe(2);
        expect(result[0].imagenUrl).toBe("img1.jpg");
        expect(result[1].imagenUrl).toBeDefined();
    });

    it("getVehiculoById retorna un vehículo", async () => {
        axios.get.and.returnValue(
            Promise.resolve({
                data: { id: 1, imagen: null }
            })
        );

        const result = await VehiculosService.getVehiculoById(1);

        expect(result.id).toBe(1);
    });
});
