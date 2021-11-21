import ContenedorMongoose from '../../contenedores/mongoose/ContenedorMongoose.js'

const schema = {
    producto: { type: Object, required: true },
    id: { type: String, required: true, unique: true }
}

class CarritoDAOMongoose extends ContenedorMongoose {

    constructor() {
        super('carrito', schema)
    }

    connect(url) {
        super.connect(url)
    }
}

export default CarritoDAOMongoose