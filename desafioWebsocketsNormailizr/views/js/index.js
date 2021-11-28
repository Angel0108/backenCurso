const socket = io.connect();

const input = document.getElementById('inputMsj')
const email = document.getElementById('inputEmail')
const nombre = document.getElementById('inputNombre')
const apellido = document.getElementById('inputApellido')
const edad = document.getElementById('inputEdad')
const alias = document.getElementById('inputalias')
const avatar = document.getElementById('inputAvatar')

document.getElementById('btnMsj').addEventListener('click', () => {
    console.log('Intento emitir mensaje')
    socket.emit('mensaje', { author: {
        id: email.value, 
        nombre: nombre.value, 
        apellido: apellido.value, 
        edad: edad.value, 
        alias: alias.value,
        avatar: avatar.value
    },
    mensaje: input.value
    });
})

socket.on('productos', msjs => {
    const productosTML = msjs
        .map(msj => `Title: ${msj.title} | Price: ${msj.price} | Thumnail : ${msj.thumnail}`)
        .join('<br>')
    document.getElementById('prods').innerHTML = productosTML
});

socket.on('mensajes', msjs => {
    const mensajesHTML = msjs
        .map(msj => `${msj.author.email} : ${msj.mensaje}`)
        .join('<br>')
    document.getElementById('msj').innerHTML = mensajesHTML
});