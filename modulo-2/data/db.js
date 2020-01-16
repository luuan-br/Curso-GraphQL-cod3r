/** @format */
let id = 1
export function nextID() {
	return id++
}

export const users = [
	{
		id: nextID(),
		name: "Joao Silva",
		email: "jsilva@mail.com",
		age: 29,
		profile_id: 1,
		status: "ACTIVE",
	},
	{
		id: nextID(),
		name: "Rafael Junior",
		email: "rjunior@mail.com",
		age: 31,
		profile_id: 2,
		status: "INACTIVE",
	},
	{
		id: nextID(),
		name: "Daniela Smith",
		email: "daniSmith@mail.com",
		age: 24,
		profile_id: 2,
		status: "BLOCKED",
	},
]

export const profiles = [
	{ id: 1, name: "admin" },
	{ id: 2, name: "commun" },
]
