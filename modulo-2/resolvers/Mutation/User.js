/** @format */

import { users, nextID } from "../../data/db"
import { notExistOrError, indexUser } from "../../function/validations"

export default {
	newUser(_, { data }) {
		notExistOrError(users, data, "email", "E-mail cadastrado")

		const newUser = {
			id: nextID(),
			...data,
			profile_id: 2,
			status: "ACTIVE",
		}

		users.push(newUser)
		return newUser
	},

	deleteUser(_, { filtre }) {
		// const userIndex = existOrError(users, args, "id", "Usuario nao existe")
		const userIndex = indexUser(filtre)
		if (userIndex < 0) throw new Error("Usuario nao existe")

		const userDeleted = users.splice(userIndex, 1)
		return userDeleted[0]
	},

	changeUser(_, { filtre, data }) {
		const userIndex = indexUser(filtre)
		if (userIndex < 0) throw new Error("Usuario nao encontrado")

		const userUpdate = { ...users[userIndex], ...data }
		users[userIndex] = userUpdate

		return userUpdate
	},
}
