const http = require('http')

const server =  http.createServer((peticion, respuesta) => {
    respuesta.end('Hola Mundo')
})

const connectServer = server.listen(8080, () => {
    console.log(`Servidor http escuchandoe en puerto ${connectServer.address().port}`)
})