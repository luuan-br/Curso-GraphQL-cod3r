/** @format */

exports.up = function(knex) {
	return knex.schema
		.createTable("usuarios", table => {
			table.increments("id").primary()
			table.string("nome").notNull()
			table
				.string("email")
				.notNull()
				.unique()
			table.string("senha", 60).notNull()
			table
				.boolean("ativo")
				.notNull()
				.defaultTo(true)
			table.timestamp("data_criacao").defaultTo(knex.fn.now())
		})
		.then(() => {
			return knex("usuarios").insert([
				{ nome: "Joao", email: "joao@mail.com", senha: "123546" },
				{ nome: "Pedro", email: "pedro@mail.com", senha: "123546" },
				{ nome: "Maria", email: "Maria@mail.com", senha: "123546" },
			])
		})
}

exports.down = function(knex) {
	return knex.schema.dropTable("usuarios")
}
