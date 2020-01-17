/** @format */

const db = require("../config/db")

async function salvarUsuario(nome, email, senha) {
	const existUser = await db("usuarios")
		.where({ email })
		.first()

	if (existUser) {
		await db("usuarios")
			.where({ email })
			.update({ nome, email, senha })

		return await db("usuarios")
			.where({ email })
			.select("id")
			.first()
			.then(id => id.id)
	} else {
		const newUsuario = await db("usuarios")
			.insert({ nome, email, senha })
			.then(res => res[0])
			.then(id => id)

		return newUsuario
	}
}

async function salvarPerfil(nome, rotulo) {
	const existPerfil = await db("perfis")
		.where({ nome })
		.first()

	if (existPerfil) {
		await db("perfis")
			.where({ nome })
			.update({ nome, rotulo })

		return await db("perfis")
			.where({ nome })
			.select("id")
			.first()
			.then(id => id.id)
	} else {
		const newPerfil = await db("perfis")
			.insert({ nome, rotulo })
			.then(res => res[0])
			.then(id => id)

		return newPerfil
	}
}

async function adicionarPerfis(usuario, ...perfis) {
	//falhei aqui nao criei a validacao se o relacionamento ja existir
	for (perfil of perfis) {
		await db("usuarios_perfis").insert({
			usuario_id: usuario,
			perfil_id: perfil,
		})
	}

	return await db("usuarios_perfis").then(res => console.log(res))
}

async function execultar() {
	const usuario = await salvarUsuario("Ana", "ana@empresa.com.br", "123456")
	const perfilA = await salvarPerfil("rh", "Pessoal")
	const perfilB = await salvarPerfil("fin", "Financeiro")

	console.log(usuario)
	console.log(perfilA)
	console.log(perfilB)

	await adicionarPerfis(usuario, perfilA, perfilB)
}

execultar()
	.catch(err => console.log(err))
	.finally(() => db.destroy())
