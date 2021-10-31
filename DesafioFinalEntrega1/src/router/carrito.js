const { Router } = require('express');

const routerCarrito = Router();

const carritos = [];
const productos = [];
const admin = true

routerCarrito.get('/:id/productos', (req, res) => {

    temp = []
    productos.forEach(element => {
        console.log("productos con idCarrito : " + element.idCarrito)
        if (element.idCarrito == req.params.id) {
            temp.push(element)
        }
    });
    res.json(temp)
});

routerCarrito.post('/', (req, res) => {
    
    let carritoNew = req.body;
    carritoNew.timestap = Date.now();
    carritos.push(req.body);

    let productoNew = req.body.producto; 
    productoNew.idCarrito = req.body.id;
    productoNew.timestap = Date.now();
    productos.push(productoNew)

    res.json(req.body);
});

routerCarrito.post('/:id/productos', (req, res) => {

    carritos.forEach(element => {
        if (element.id == req.params.id) {
            req.body.idCarrito = element.id; 
            productos.push(req.body);
        }
    });
    res.json(req.body);
});

routerCarrito.delete('/:id', (req, res) => {
    carritos.forEach(element => {
        if (element.id == req.params.id) {
            carritos.pop(element)
        }
    });
    res.json(carritos)
});

routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
    productos.forEach(element => {
        if (element.id == req.params.id) {
            productos.pop(element)
        }
    });
    res.json(carritos)
});

exports.routerCarrito = routerCarrito;