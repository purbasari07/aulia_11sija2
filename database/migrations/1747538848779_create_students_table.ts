import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('class_name').notNullable()
table.dateTime('created_at').notNullable().defaultTo(this.now())
      table.dateTime('updated_at').notNullable().defaultTo(this.now())

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}