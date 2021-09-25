const express = require('express')
const ej = require('fs')
const app = express()

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchandoe en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/productos', (req, res) => {
    res.json(leerTodos())
})

app.get('/productoRandom', (req, res) => {
    res.json(getById(getAleatorio(1, 3)))
})

function getAleatorio(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
      )
}

function leerTodos() {
    try {
        let contenido = ej.readFileSync('./productos.txt', 'utf-8')

        return JSON.parse(contenido)
    } catch (error) {
        console.log("Error de lectura : " + error)
    }
}

function getById(number) {
    let contenido = leerTodos();
    let elegido

    //forEach autogenerado
    contenido.forEach(element => {
        if (element.id === number) {
            elegido = element
        }
    });
    console.log(elegido)
    return elegido
}
