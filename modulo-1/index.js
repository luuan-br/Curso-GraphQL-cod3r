/** @format */
import { ApolloServer } from "apollo-server"
import { importSchema } from "graphql-import"
import resolvers from "./resolvers"

// o resolver retorna os dados feito nas queries gql
// seja fazendo consulta em banco de dados ou em outras API

const server = new ApolloServer({
	typeDefs: importSchema("./schema/index.graphql"),
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Runner in ${url}`)
})
