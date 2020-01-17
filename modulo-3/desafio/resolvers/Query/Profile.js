/** @format */
const db = require("../../config/db")

module.exports = {
	profile(_, { filtre }) {
		if (!filtre) return null

		const { id, name } = filtre

		if (id) {
			return db("perfis")
				.where({ id })
				.first()
		} else if (name) {
			return db("perfis")
				.where({ nome: name })
				.first()
		} else {
			return null
		}
	},

	profiles() {
		return db("perfis")
	},
}
