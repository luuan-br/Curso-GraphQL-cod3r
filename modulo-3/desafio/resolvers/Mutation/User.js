/** @format */
const db = require("../../config/db")
const { user: getUser } = require("../Query/User")

module.exports = {
	async newUser(_, { data }) {
		try {
			const idProfiles = []

			if (data.profiles) {
				for (const filtre of data.profiles) {
					const profile = await getUser(_, { filtre })

					if (profile) idProfiles.push(profile.id)
				}
			}

			const [id] = db("usuario").insert({
				nome: data.name,
				email: data.email,
				senha: data.password,
			})

			for (const perfil_id of idProfiles) {
				await db("usuarios_perfils").insert({
					perfil_id,
					usuario_id: id,
				})
			}

			return db("usuarios")
				.where({ id })
				.first()
		} catch (e) {
			throw new Error(e.sqlMessage)
		}
	},

	deleteUser(_, { filtre }) {},

	changeUser(_, { filtre, data }) {},
}
