const express = require('express')
const { routerProductos } = require("./router/productos")

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

/* ------------------------------------------------------ */
/* Cargo los routers */

app.use('/api/productos', routerProductos)

app.use((err, req, res, next) => {
    if (err.message == 'producto no encontrado') {
        res.status(500).json({error: 'producto no encontrado'})
    } else {
        next(err)
    }
})

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8082
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))