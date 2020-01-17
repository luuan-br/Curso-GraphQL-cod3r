/** @format */
const db = require("../../config/db")

module.exports = {
	profiles(user) {
		return db("perfis")
			.join("usuarios_perfis", "perfis.id", "usuarios_perfis.perfil_id")
			.where({ usuario_id: user.id })
	},

	//resolvendo name do type porque no banco esta nome
	name(user) {
		return user.nome
	},
}
