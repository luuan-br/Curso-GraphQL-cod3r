/** @format */

const db = require("../config/db")

const novoUsuario = {
	nome: "Pedro",
	email: "pedro@empresa.com.br",
	senha: "123456789",
}

// update... db('...').where({...}).update({...})

// usando async/await

async function exercicios() {
	// count
	const { qtde } = await db("usuarios")
		.count("* as qtde")
		.first()

	// insert (se a tabela estiver vazia)
	if (qtde === 0) {
		await db("usuarios").insert(novoUsuario)
	}

	// consultar
	let { id } = await db("usuarios")
		.select("id")
		.limit(1)
		.first()

	// alteracao
	await db("usuarios")
		.where({ id })
		// .update({ nome: "Pedro Gracia" })
		.update({ email: "Pedro.gracia@mail.com", senha: "123" })

	// retornado dados
	return await db("usuarios")
		.where({ id })
		.first()
}

exercicios()
	.then(usuario => console.log(usuario))
	.finally(() => db.destroy())
