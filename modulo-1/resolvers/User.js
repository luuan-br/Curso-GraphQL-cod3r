/** @format */
import { profiles } from "../data/db"

export default {
	// resolver do nome is_vip
	vip(user) {
		return user.is_vip
	},
	profile({ profile_id }) {
		const selection = profiles.filter(profile => profile.id === profile_id)
		return selection ? selection[0] : null
	},
}
