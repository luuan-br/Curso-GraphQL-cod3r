/** @format */
const db = require("../../config/db")
const { profile: getProfile } = require("../Query/Profile")

module.exports = {
	async newProfile(_, { data }) {
		try {
			const [id] = await db("perfis").insert({
				nome: data.name,
				rotulo: data.label,
			})

			return db("perfis")
				.where({ id })
				.first()
		} catch (error) {
			throw new Error(error.sqlMessage)
		}
	},

	async deleteProfile(_, args) {
		try {
			const profile = await getProfile(_, args)

			if (profile) {
				const { id } = profile
				await db("usuarios_perfis")
					.where({ perfil_id: id })
					.delete()

				await db("perfis")
					.where({ id })
					.delete()
			}

			return profile
		} catch (error) {
			throw new Error(error.sqlMessage)
		}
	},

	async changeProfile(_, { filtre, data }) {
		try {
			const profile = await getProfile(_, { filtre })

			if (profile) {
				const { id } = profile

				// sem validacao campo poderia vim em branco
				await db("perfis")
					.where({ id })
					.update({ nome: data.name, rotulo: data.label })
			}

			return await db("perfis")
				.where({ id: profile.id })
				.first()
		} catch (error) {
			throw new Error(error.sqlMessage)
		}
	},
}
