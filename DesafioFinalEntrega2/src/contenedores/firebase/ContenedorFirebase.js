import admin from "firebase-admin"
import fs from 'fs'

const serviceAccount = JSON.parse(fs.readFileSync('../src/contenedores/firebase/db/codehouse-3b8b2-firebase-adminsdk-1y6v3-1dfd56793f.json', 'utf8'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    //,
    //databaseURL: "https://carbon-nucleus-264418.firebaseio.com"
});

class ContenedorFirebase {

    constructor() {
        this.db = admin.firestore();
        this.collection = db.collection('ecommerce')
    }

    async getAll() {
        return this.collection.get()
    }

    async getById(id) {
        return this.collection.getById(id)
    }

    async insert(element) {
        this.collection.add(element)
    }

    async deleteById(id) {
        this.collection.deleteById(id)
    }



}
export default ContenedorFirebase