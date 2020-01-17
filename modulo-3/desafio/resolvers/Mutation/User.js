/** @format */
const db = require("../../config/db")
const { profile: getProfile } = require("../Query/Profile")
const { user: getUser } = require("../Query/User")

module.exports = {
	async newUser(_, { data }) {
		try {
			const idsProfiles = []

			if (data.profiles) {
				for (let profileFiltre of data.profiles) {
					const profile = await getProfile(_, { filtre: { ...profileFiltre } })

					if (profile) {
						idsProfiles.push(profile.id)
					}
				}
			}

			// delete data.profiles

			const [id] = await db("usuarios").insert({
				nome: data.name,
				email: data.email,
				senha: data.password,
			})

			for (let profile_id of idsProfiles) {
				await db("usuarios_perfis").insert({
					perfil_id: profile_id,
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

	async deleteUser(_, args) {
		try {
			const user = await getUser(_, args)

			if (user) {
				const { id } = user

				await db("usuarios_perfis")
					.where({ usuario_id: id })
					.delete()

				await db("usuarios")
					.where({ id })
					.delete()
			}

			return user
		} catch (e) {
			throw new Error(e.sqlMessage)
		}
	},

	async changeUser(_, { filtre, data }) {
		try {
			const user = await getUser(_, { filtre })

			if (user) {
				const { id } = user

				if (data.profiles) {
					await db("usuarios_perfis")
						.where({ usuario_id: id })
						.delete()

					for (let filtre of data.profiles) {
						const profile = await getProfile(_, { filtre })

						profile &&
							(await db("usuarios_perfis").insert({
								perfil_id: profile.id,
								usuario_id: id,
							}))
					}
				}

				await db("usuarios")
					.where({ id })
					.update({
						nome: data.name ? data.name : user.nome,
						email: data.email ? data.email : user.email,
						senha: data.password ? data.password : user.senha,
					})
			}

			return user
				? db("usuarios")
						.where({ id: user.id })
						.first()
				: null
		} catch (e) {
			throw new Error(e.sqlMessage)
		}
	},
}
