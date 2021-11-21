import Router from 'express';
import carritoDAOMongoose from '../DAOs/mongoose/carritoDAOMongoose.js';
import productosDAOMongoose from '../DAOs/mongoose/productosDAOMongoose.js'
import carritoDAOFirebase from '../DAOs/firebase/carritoDAOFirebase.js';
import productosDAOFirebase from '../DAOs/firebase/productosDAOFirebase.js'

const routerCarrito = Router();

const carritos = new carritoDAOMongoose();
const productos = productosDAOMongoose
//const carritos = new carritoDAOFirebase();
//const productos = new productosDAOFirebase();

const admin = true

routerCarrito.get('/:id/productos', (req, res) => {

    temp = carritos.getById(req.params.id)
    res.json(temp)
});

routerCarrito.post('/', (req, res) => {
    
    let carritoNew = req.body;
    carritoNew.timestap = Date.now();

    carritos.insert(req.body);

    let productoNew = req.body.producto; 
    productoNew.idCarrito = req.body.id;
    productoNew.timestap = Date.now();
    productos.insert(productoNew)

    res.json(req.body);
});

routerCarrito.post('/:id/productos', (req, res) => {

    let carritosList = carritos.getAll()
    carritosList.forEach(element => {
        if (element.id == req.params.id) {
            req.body.idCarrito = element.id; 
            productos.insert(req.body);
        }
    });
    res.json(req.body);
});

routerCarrito.delete('/:id', (req, res) => {
    carritos.deleteById(req.params.id)
    res.json(carritos)
});

routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
    productos.getAll().forEach(element => {
        if (element.id == req.params.id) {
            productos.deleteById(id)
        }
    });
    res.json(carritos)
});

export default routerCarrito