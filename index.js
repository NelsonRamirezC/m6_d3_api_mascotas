const express = require("express");
const { v4: uuid } = require("uuid");
const cors = require("cors");
const { leerMascotas, escribirMascotas } = require("./utils.js");

//instancia de express
const app = express();
//PROCESA LOS JSON QUE MANDEN MEDIANTE MÉTODOS COMO POST, PUT.
app.use(express.json());
app.use(cors());

//LEVANTAMOS SERVIDOR ESCUCHANDO EN PUERTO 3000
app.listen(3000, () =>
    console.log("servidor escuchando en http://localhost:3000")
);

//RUTA PRINCIPAL - DOCUMENTACIÓN DE CÓMO USAR LA API
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

//ENDPOINTS
//DEVOLVER TODAS LAS MASCOTAS.
app.get("/api/mascotas", (req, res) => {
    let data = JSON.parse(leerMascotas());
    data.cantidad = data.mascotas.length;
    res.send({ data: data });
});

//ENDPOINT FILTRAR MASCOTA POR ID
app.get("/api/mascotas/:id", (req, res) => {
    try {
        let idMascota = req.params.id;
        let data = JSON.parse(leerMascotas());
        let mascota = data.mascotas.find((mascota) => mascota.id == idMascota);
        if (mascota) {
            res.send({ data: mascota });
        } else {
            res.status(404).send({ message: "Mascota no encontrada." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error al buscar la mascota." });
    }
});

//ENDOINT FILTA MASCOTAS POR NOMBRE
app.get("/api/mascotas/name/:name", (req, res) => {
    try {
        let nameMascota = req.params.name;
        let data = JSON.parse(leerMascotas());
        let mascota = data.mascotas.filter((mascota) =>
            mascota.nombre.toLowerCase().includes(nameMascota.toLowerCase())
        );
        if (mascota.length > 0) {
            res.send({ data: mascota });
        } else {
            res.status(404).send({
                message: `Error al buscar mascotas que incluyan el la palabra '${nameMascota}'`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: `Error al buscar las mascotas.`,
        });
    }
});

//ENDPOINT PARA CREAR UNA NUEVA MASCOTA
app.post("/api/mascotas", (req, res) => {
    try {
        let { nombre, mascota, animal, edadHumana } = req.body;
        let nuevaMascota = {
            id: uuid().slice(0, 6),
            nombre,
            mascota,
            animal,
            edadHumana,
        };

        let data = JSON.parse(leerMascotas());
        data.mascotas.push(nuevaMascota);
        escribirMascotas(data);
        res.send({
            message: "Mascota agregada correctamente.",
            mascota: nuevaMascota,
        });
    } catch (error) {
        res.status(500).send({ error: "Error agregar la mascota." });
    }
});

//ENDPOINT ELIMINAR MASCOTA POR ID

//ENDPOINT DE ACTUALIZAR MASCOTA POR ID
