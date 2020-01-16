/** @format */
import { profiles } from "../data/db"

export default {
	profile({ profile_id }) {
		const selection = profiles.filter(profile => profile.id === profile_id)
		return selection ? selection[0] : null
	},
}
