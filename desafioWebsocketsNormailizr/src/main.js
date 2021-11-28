const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const { normalize, schema } = require("normalizr");
const faker = require('faker')
faker.locale = 'es'

const productos = [{title: 'manzana', price: '2', thumnail: 'url'}]
const mensajes = []

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.urlencoded({ extended: true }))

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('views'))


// Definimos esquemas hijos
const author = new schema.Entity('author');
const mensaje = new schema.Entity('mensaje');

// Definimos esquema principal
const chat = new schema.Entity('chat', {
    author: author,
    mensaje: mensaje
});

const chats = new schema.Entity('chats', {
    chats: [chat]
});

const util = require('util')
function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}


//Sockets
io.on('connection', socket => {
    console.log('Nuevo cliente conectado!')

    /* Envio los mensajes al cliente que se conectó */
    socket.emit('mensajes', mensajes)

    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('mensaje', data => {
        console.log('Escuché un  msj desde el servidor: ' + data.mensaje)
        mensajes.push(data)
        normalize(mensajes, chats)
        print(mensajes)
        io.sockets.emit('mensajes', mensajes)
    }) 
})

function generarNProductos(cant) {
    for (let i = 0; i < cant; i++) {
        productos.push({
            title: faker.name.firstName(),
            price: faker.datatype.number({ min: 10, max: 50}),
            thumnail: faker.name.title()
        })
    }
    return productos
}

app.get('/productos-test', (req, res) => {
    generarNProductos(5)
    res.render('inicio-test', { productos });
});

app.get('/productos', (req, res) => {
    res.render('inicio', { productos });
});

app.post('/productos', (req, res) => {
    productos.push(req.body)
    console.log('Recibo POST productos : ' + productos)
    res.redirect('/productos')
});

const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))














