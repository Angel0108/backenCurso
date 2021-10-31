const { Router } = require('express');

const routerProductos = Router();

const productos = [];
const admin = true

routerProductos.get('/', (req, res) => {
    res.json(productos);
});

routerProductos.post('/', (req, res) => {
    if (admin) {
        productos.push(req.body);
        res.json(req.body);
    } else {
        throw Error('No autorizado')
    }
});

routerProductos.get('/:id', (req, res) => {
    if (admin) {
        console.log("intento traerme uno "+ req.params.id)
        let elegido
        productos.forEach(element => {
            if (element.id == req.params.id) {
                elegido = element
            }
        });
        res.json(elegido);
    } else {
        throw Error('No autorizado')
    }
});

routerProductos.delete('/:id', (req, res) => {
    if (admin) {
        console.log("intento borrar uno "+ req.params.id)
        let elegido
        productos.forEach(element => {
            if (element.id == req.params.id) {
                elegido = element
            }
        });
        productos.pop(elegido)
        res.json(elegido);
    } else {
        throw Error('No autorizado')
    }
});

exports.routerProductos = routerProductos;