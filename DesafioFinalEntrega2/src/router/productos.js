import Router from 'express'
import productosDAOMongoose from '../DAOs/mongoose/productosDAOMongoose.js'
import productosDAOFirebase from '../DAOs/firebase/productosDAOFirebase.js'

const productos = new productosDAOMongoose();
//const productos = new productosDAOFirebase();

const routerProductos = Router();
const admin = true

routerProductos.get('/', (req, res) => {
    res.json(productos.getAll);
});

routerProductos.post('/', (req, res) => {
    if (admin) {
        productos.insert(req.body);
        res.json(req.body);
    } else {
        throw Error('No autorizado')
    }
});

routerProductos.get('/:id', (req, res) => {
    if (admin) {
        console.log("intento traerme uno "+ req.params.id)
        let elegido = productos.getById( req.params.id)
        res.json(elegido);
    } else {
        throw Error('No autorizado')
    }
});

routerProductos.delete('/:id', (req, res) => {
    if (admin) {
        console.log("intento borrar uno "+ req.params.id)
        let elegido = productos.getById( req.params.id)
        productos.deleteById(req.params.id)
        res.json(elegido);
    } else {
        throw Error('No autorizado')
    }
});

export default routerProductos