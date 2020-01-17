/** @format */

import { users, profiles } from "../data/db"

export function notExistOrError(array1, array2, comparator, message) {
	const exist = array1.some(
		element => element[comparator] === array2[comparator]
	)

	if (exist) {
		throw new Error(message)
	}
}

export function existOrError(array1, array2, comparator, message) {
	const index = array1.findIndex(
		element => element[comparator] === array2[comparator]
	)

	if (index < 0) {
		throw new Error(message)
	}

	return index
}

export function indexUser(filtre) {
	if (!filtre) return -1

	const { id, email } = filtre

	if (id) return users.findIndex(user => user.id === id)

	if (email) return users.findIndex(user => user.email === email)

	return -1
}

export function indexProfile(filtre) {
	if (!filtre) return -1

	const { id, name } = filtre

	if (id) return profiles.findIndex(profile => profile.id === id)

	if (name) return profiles.findIndex(profile => profile.name === name)

	return -1
}

export default { existOrError, notExistOrError, indexUser, indexProfile }
