const express = require('express')
const app = express()

const PORT = 8080
let cant = 0

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchandoe en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

/*app.get('/', (req, res) => {
    res.send({mensaje: 'hola mundo'})
})*/

app.get('/', (req, res) => {
    res.send('<h style="color:blue;">Bienvenidos a Express</h1>')
})

app.get('/visitas', (req, res) => {
    cant ++
    res.send({mensaje: `La cantidad de visitas es ${cant}`})
    
})

app.get('/fyh', (req, res) => {
    res.send({fyh: new Date().toLocaleString()})
})