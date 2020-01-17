/** @format */

const db = require("../config/db")

// const novoPerfil = {
// 	nome: "visitante",
// 	rotulo: "Visitante",
// }

// db("perfis")
// 	.insert(novoPerfil)
// 	.then(res => console.log(res))
// 	.catch(err => console.log(err.sqlMessage))
// 	.finally(() => db.destroy())

const perfilSU = {
	nome: "root" + Math.random(),
	rotulo: "Super usuario",
}

// SQL
// insert into perfis
// (nome, rotulo) values ('...', '...')
// segunda forma muito mais parecida como SQL
db.insert(perfilSU)
	.into("perfis")
	.then(res => res[0])
	.then(id => `O codigo gerado foi ${id}`)
	.then(string => console.log(string))
	.catch(err => console.log(err.sqlMessage))
	.finally(() => db.destroy())
