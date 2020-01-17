/** @format */
const db = require("../../config/db")

module.exports = {
	users() {
		return db("usuarios")
	},

	user(_, { filtre }) {
		if (!filtre) return null

		const { id, email } = filtre

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
