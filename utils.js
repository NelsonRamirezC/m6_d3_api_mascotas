const fs = require("fs");

const leerMascotas = () => {
    let mascotas = fs.readFileSync(__dirname + "/mascotas.json", "utf8");
    return mascotas;
};

const escribirMascotas = (data) => {
    fs.writeFileSync(
        __dirname + "/mascotas.json",
        JSON.stringify(data, null, 4),
        "utf8"
    );
    return true;
};

module.exports = {
    leerMascotas,
    escribirMascotas,
};
