import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Cliente {
        id: ID,
        nombre: String,
        apellido: String,
        empresa: String
    }   
    type Query {
        cliente: Cliente
    }
    type ClienteInput {
        id: ID,
        nombre: String!,
        apellido: String!,
        empresa: String!
    }
    type Mutation {
        crearCliente(input: ClienteInput) : Cliente
    }
`);

export default schema;
