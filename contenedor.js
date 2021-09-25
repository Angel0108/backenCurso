const ej = require('fs')

class Contenedor {

    Contenedor (nombre) {
        this.nombre = nombre
    }

    constructor (nombre) {
        this.nombre = nombre
    }

    async escribir(elem){
        let contenido = await this.leerTodos();
        console.log("Primero leo contenido : " + contenido)

        //forEach autogenerado
        let cont = 0
        contenido.forEach(element => {
            cont ++
        });
        
        //agrego id
        elem.id = cont + 1
        contenido.push(elem)

        //piso todo el archivo con el array completo
        const jsonElem = JSON.stringify(contenido, null, 4)
            try {
                await ej.promises.writeFile('./' + this.nombre, jsonElem)
                console.log('Guardé : ' + jsonElem)
            } catch(err) {
                console.log("Error : " + err)
            }
    }
    

    async getById(number) {
        let contenido = await this.leerTodos();

        //forEach autogenerado
        contenido.forEach(element => {
            if (element.id === number) {
                console.log("getById " + number +": " + JSON.stringify(element))
                return element
            }
        });
    }

    async leerTodos() {
        try {
            let contenido = await ej.promises.readFile('./' + this.nombre, 'utf-8')
            console.log("Contenido todal : " + contenido)

            return JSON.parse(contenido)
        } catch (error) {
            console.log("Error de lectura : " + error)
        }
    }

    async deleteById(number) {
        let contenido = await this.leerTodos();

        //forEach autogenerado
        contenido.forEach(element => {
            if (element.id === number) {
                console.log("getById " + number +": " + JSON.stringify(element))
                contenido.pop(element)
                
            }
        });

        const jsonElem = JSON.stringify(contenido, null, 4)
            try {
                await ej.promises.writeFile('./' + this.nombre, jsonElem)
                console.log('Guardé : ' + jsonElem)
            } catch(err) {
                console.log("Error : " + err)
            }
    }

    async deleteAll() {
        try {
            await ej.promises.writeFile('./' + this.nombre, '[]')
            console.log('Borré todo..')
        } catch(err) {
            console.log("Error : " + err)
        }
    }
}

//let contenedor = new Contenedor('productos.txt')
//contenedor.escribir({title: 'manzana', price: '123', thumnail: 'aaa'})
//contenedor.escribir({title: 'pera', price: '321', thumnail: 'bbb'})

//contenedor.getById(2)
//contenedor.deleteById(2)
//contenedor.deleteAll()
