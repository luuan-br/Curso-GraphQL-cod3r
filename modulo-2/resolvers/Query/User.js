/** @format */

import { users } from "../../data/db"
import { indexUser } from "../../function/validations"

export default {
	users() {
		return users
	},
	user(_, { filtre }) {
		const userIndex = indexUser(filtre)

		if (userIndex < 0) throw new Error("Usuario nao encontrado")

		return users[userIndex]
	},
}
