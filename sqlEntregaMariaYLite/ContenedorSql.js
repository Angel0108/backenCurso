const knexLib = require('knex')

class ContenedorSql {
  constructor(config) {
    this.knex = knexLib(config)
  }

  crearTabla() {
    return this.knex.schema.dropTableIfExists('productos')
      .finally(() => {
        return this.knex.schema.createTable('productos', table => {
          table.increments('id').primary();
          table.string('title', 50).notNullable();
          table.string('price', 20).notNullable();
          table.string('thumnail');
        })
      })
  }

  insertarProductos(productos) {
    return this.knex('productos').insert(productos)
  }

  listarProductos() {
    return this.knex('productos').select('*')
  }

  borrarArticuloPorId(id) {
    return this.knex.from('articulos').where('id', id).del()
  }

  actualizarProductoPorId(producto, id) {
    return this.knex.from('productos').where('id', id).update({ producto: producto })
  }

  close() {
    this.knex.destroy();
  }
}

exports.ContenedorSql = ContenedorSql