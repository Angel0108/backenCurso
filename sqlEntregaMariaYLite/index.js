const { ContenedorSql } = require('./ContenedorSql.js')
const { options } = require('./options/mariaDB.js')

const sql = new ContenedorSql(options)

sql.crearTabla()
  .then(() => {

    console.log("1) tabla creada")

    const productos = [
      { title: 'naranja', price: '80', thumnail: 'url' },
      { title: 'manzana', price: '60', thumnail: 'url' },
      { title: 'pera', price: '150', thumnail: 'url' }
    ]
    return sql.insertarProductos(productos)
  })
  .then(() => {

    console.log("2) productos insertados")
    
    return sql.listarProductos()
  })
  .then(productos => {

    console.log("resultado total")

    console.table(productos)
  })
  .catch((err) => { console.log(err); throw err })
  .finally(() => {
    sql.close()
  })