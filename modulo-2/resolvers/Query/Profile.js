/** @format */

import { profiles } from "../../data/db"
import { indexProfile } from "../../function/validations"

export default {
	profile(_, { filtre }) {
		const profileIndex = indexProfile(filtre)
		if (profileIndex < 0) throw new Error("Perfil nao existe")

		return profiles[profileIndex]
	},
	profiles() {
		return profiles
	},
}
