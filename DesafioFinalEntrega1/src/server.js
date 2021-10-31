const express = require('express')
const { routerProductos } = require("./router/productos")
const { routerCarrito } = require("./router/carrito")

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use((err, req, res, next) => {
    if (err.message == 'producto no encontrado') {
        res.status(500).json({error: 'producto no encontrado'})
    } else if(err.message == 'No autorizado') {
        res.status(401).json({
            error: '-1',
            descripcion: 'No autorizado'
        })
    } 
    else {
        next(err)
    }
})


/* ------------------------------------------------------ */
/* Cargo los routers */

app.use('/api/productos', routerProductos)

app.use('/api/carrito', routerCarrito)

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))