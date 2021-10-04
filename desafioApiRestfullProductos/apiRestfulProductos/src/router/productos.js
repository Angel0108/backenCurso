const { Router } = require('express');
const { contenedor } = require("../contenedor/contenedor.js")

const routerProductos = Router();

routerProductos.get('/', (req, res) => {
    console.log("intento traerme todos")
    res.json(contenedor.leerTodosSync());
});

routerProductos.post('/', (req, res) => {
    contenedor.escribirSync(req.body);
    res.json(req.body);
});

routerProductos.get('/:id', (req, res) => {
    console.log("intento traerme uno "+ req.params.id)
    res.json(contenedor.getByIdSync(req.params.id));
});

routerProductos.delete('/:id', (req, res) => {
    console.log("intento borrar uno "+ req.params.id)
    res.json(contenedor.deleteByIdSync(req.params.id));
});


exports.routerProductos = routerProductos;