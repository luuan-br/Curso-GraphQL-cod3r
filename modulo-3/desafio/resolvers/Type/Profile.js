/** @format */
const db = require("../../config/db")

module.exports = {
	name(profile) {
		return profile.nome
	},

	label(profile) {
		return profile.rotulo
	},

	users(profile) {
		return db("usuarios")
			.join("usuarios_perfis", "usuarios.id", "usuarios_perfis.usuario_id")
			.where({ perfil_id: profile.id })
	},
}
