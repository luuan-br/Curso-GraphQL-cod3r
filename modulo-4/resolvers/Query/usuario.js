/** @format */

const db = require("../../config/db")
const bcrypt = require("bcrypt-nodejs")
const { getUsuarioLogado } = require("../Comum/Usuario")

module.exports = {
	async login(_, { dados }) {
		const usuario = await db("usuarios")
			.where({ email: dados.email })
			.first()

		if (!usuario) {
			throw new Error("Usuario/Senha invalida")
		}

		const sapIguais = bcrypt.compareSync(dados.senha, usuario.senha)

		if (!sapIguais) {
			throw new Error("Usuario/Senha invalida")
		}

		return getUsuarioLogado(usuario)
	},
	usuarios(parent, args, ctx) {
		ctx && ctx.validarAdmin()

		return db("usuarios")
	},
	usuario(_, { filtro }, ctx) {
		ctx && ctx.validarUsuarioFitro()

		if (!filtro) return null
		const { id, email } = filtro
		if (id) {
			return db("usuarios")
				.where({ id })
				.first()
		} else if (email) {
			return db("usuarios")
				.where({ email })
				.first()
		} else {
			return null
		}
	},
}
