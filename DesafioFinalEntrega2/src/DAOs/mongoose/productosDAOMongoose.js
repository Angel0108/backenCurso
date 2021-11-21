import ContenedorMongoose from '../../contenedores/mongoose/ContenedorMongoose.js'

const schema = {
    title: { type: String, required: true },
    price: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    thumnail: { type: String, required: true },
}

class ProductosDAOMongoose extends ContenedorMongoose {

    constructor() {
        super('productos', schema)
    }

    insertProductos (elements) {
        super.insert(elements)
    };

    connect(url) {
        super.connect(url)
    }
}

export default ProductosDAOMongoose


/*
const dao = new ProductosDAOMongoose();
dao.connect('mongodb://localhost:27017/ecommerce')

console.log('tengo dao, procedo a insertar')
dao.insertProductos({
    title: 'manzana', price: 100, thumnail: 'url', id: 100
})

console.log('insert ok')
*/