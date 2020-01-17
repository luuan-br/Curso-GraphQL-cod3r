/** @format */

const db = require("../config/db")

// chamando todos os dados do banco
// db("perfis")
// 	.then(res => console.log(res))
//   .finally(() => db.destroy())

// db("perfis")
// 	.map(perfil => perfil.nome) // chame o map diretamente no fluxo da promise
// 	.then(nomes => console.log(nomes))
// 	.finally(() => db.destroy())

// // Outra forma de fazer uma consulta no banco de dados
// db("perfis")
// 	.select("nome", "id")
// 	.then(res => console.log(res))
// 	.finally(() => db.destroy())

// Outra forma de fazer uma consulta no banco de dados
// db.select("nome", "id")
// 	.from("perfis")
// 	.limit(4)
// 	.offset(1) // deslocamento
// 	.then(res => console.log(res))
// 	.finally(() => db.destroy())

// filtrando os dados
db("perfis")
	.select("id", "nome") // traz so as colunas selecionadas
	// .where({ id: 2 })
	// .where('id', '=', 2)
	// .where("nome", "like", "%m%") // trazer algo em nome que tenha m em alguma parte
	// .whereNot({ id: 2 }) // trazer todos que nao sao o id 2
	.whereIn("id", [1, 2, 3]) // traz a todos que foram indicados
	// .first()
	.then(res => console.log(res))
	.finally(() => db.destroy())
