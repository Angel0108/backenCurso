const express = require('express')
const session = require('express-session')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')


/* ------------------ PASSPORT -------------------- */
const passport = require('passport');
const { Strategy: FacebookStrategy } = require('passport-facebook');

const FACEBOOK_CONSUMER_KEY = 'XXXXXXXXXXXXXXXXXXXXXXX';
const FACEBOOK_CONSUMER_SECRET = 'XXXXXXXXXXXXXXXXXXXXXXX';

passport.use(new FacebookStrategy({
    consumerKey: FACEBOOK_CONSUMER_KEY,
    consumerSecret: FACEBOOK_CONSUMER_SECRET,
    callbackURL: '/auth/facebook/callback',
}, (token, tokenSecret, userProfile, done) => {
    console.log(userProfile)
    return done(null, userProfile);
}));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

/* ------------------------------------------------ */


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
app.use(session({
    /* ----------------------------------------------------- */
    /*           Persistencia por redis database             */
    /* ----------------------------------------------------- */
    store: MongoStore.create({
        //En Atlas connect App :  Make sure to change the node version to 2.2.12:
        mongoUrl: 'mongodb://localhost:27017/ecommerce',
        //mongoOptions: advancedOptions
    }),
    /* ----------------------------------------------------- */

    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false/* ,
    cookie: {
        maxAge: 40000
    } */
}))

/* ------------------ PASSPORT -------------------- */
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/datos')
    } else {
        res.redirect('/login')
    }
})

/* --------- LOGIN ---------- */
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/faillogin'
}));

app.get('/faillogin', (req, res) => {
    res.render('login-error', {});
})

/* --------- DATOS ---------- */
app.get('/datos', (req, res) => {
    if (req.isAuthenticated()) {
        //reinicio contador
        if (!req.user.contador) req.user.contador = 0
        req.user.contador++
        res.render('datos', {
            nombre: req.user.displayName,
            username: req.user.username,
            foto: req.user.photos[0].value,
            contador: req.user.contador
        });
    } else {
        res.redirect('/login')
    }
})

/* --------- LOGOUT ---------- */
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

/* ------------------------------------------------ */

let contador = 0
app.get('/sin-session', (req, res) => {
    res.send({ contador: ++contador })
})

app.get('/con-session', (req, res) => {
    if (req.session.contador) {
        req.session.contador++
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`)
    } else {
        req.session.contador = 1
        res.send('Bienvenido!')
    }
})


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
    
});

const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))














