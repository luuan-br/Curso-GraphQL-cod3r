/** @format */

import { users, profiles } from "../data/db"

// resolver para consultas
export default {
	hello() {
		return "Welcome in GraphQL"
	},
	hourNow() {
		return new Date()
	},
	userLogged() {
		return {
			id: 1,
			name: "luan",
			email: "luuan.br@live.com",
			age: 26,
			salary: "7320.25",
			is_vip: true, // nome nao bate com o da consulta deve ser resolvido com um resolver para o Type User
		}
	},
	productSpotlight() {
		return {
			name: "Caneta",
			price: 12.89,
			discount: 0.15,
		}
	},
	numbers() {
		// return [4, 8, 13, 27, 33, 54]
		const growing = (a, b) => a - b

		return Array(6)
			.fill(0)
			.map(() => parseInt(Math.random() * 61))
			.sort(growing)
	},
	usersList() {
		return users
	},
	user(_, { id }) {
		const selections = users.filter(user => user.id == id)
		return selections ? selections[0] : null
	},
	profile(_, { id }) {
		const selection = profiles.filter(profile => profile.id === id)
		return selection ? selection[0] : null
	},
	profiles() {
		return profiles
	},
}
