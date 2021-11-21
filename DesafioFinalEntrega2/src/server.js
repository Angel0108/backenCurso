import express  from 'express'
import routerProductos from '../src/router/productos.js'
import routerCarrito from '../src/router/carrito.js'

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