/** @format */

import { profiles } from "../../data/db"
import { indexProfile, notExistOrError } from "../../function/validations"

export default {
	newProfile(_, { data }) {
		notExistOrError(profiles, data, "name", "perfil ja existe")

		const newProfile = { ...data }
		profiles.push(newProfile)

		return newProfile
	},

	deleteProfile(_, { filtre }) {
		const profileIndex = indexProfile(filtre)
		if (profileIndex < 0) throw new Error("Prefil nao existe")

		const profileDeleted = profiles.splice(profileIndex, 1)
		return profileDeleted[0]
	},

	changeProfile(_, { filtre, data }) {
		const profileIndex = indexProfile(filtre)
		if (profileIndex < 0) throw new Error("Perfil nao existe")

		const profileUpdated = { ...profiles[profileIndex], ...data }
		profiles[profileIndex] = profileUpdated

		return profileUpdated
	},
}
