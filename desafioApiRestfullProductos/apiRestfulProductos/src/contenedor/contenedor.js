const ej = require('fs');
const { nextTick } = require('process');

class Contenedor {

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

    leerTodosSync() {
        try {
            console.log('inicio leer todos')
            let contenido = ej.readFileSync(this.nombre, 'utf-8')
            console.log("Contenido total : " + contenido)
    
            return JSON.parse(contenido)
        } catch (error) {
            console.log("Error de lectura : " + error)
        }
    }

    getByIdSync(number) {
        let contenido = this.leerTodosSync();
        let elegido
    
        //forEach autogenerado
        contenido.forEach(element => {
            if (element.id == number) {
                elegido = element
            }
        });
        return elegido
    }

    escribirSync(elem){
        let contenido = this.leerTodosSync();
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
                ej.writeFileSync(this.nombre, jsonElem)
                console.log('Guardé : ' + jsonElem)
            } catch(err) {
                console.log("Error : " + err)
            }
    }

    deleteByIdSync(number) {
        let contenido = this.leerTodosSync();
        let existe = 'false'

        //forEach autogenerado
        contenido.forEach(element => {
            if (element.id == number) {
                contenido.pop(element)
                existe = 'true'
            }
        });

        if (existe == 'false') {
            throw Error('producto no encontrado')
        }

        const jsonElem = JSON.stringify(contenido, null, 4)
            try {
                ej.writeFileSync(this.nombre, jsonElem)
                console.log('Borré : ' + jsonElem)
            } catch(err) {
                console.log("Error : " + err)
                next(err)
            }
    }
}

const contenedor = new Contenedor('./src/contenedor/productos.txt')

exports.contenedor = contenedor;