import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Cliente {
        id: ID,
        nombre: String,
        apellido: String,
        empresa: String,
        tipo: TipoCliente
    }
    enum TipoCliente {
        BASICO
        PREMIUM
    }   
    type Query {
        getCliente(id: ID): Cliente
    }
    type ClienteInput {
        id: ID,
        nombre: String!,
        apellido: String!,
        empresa: String!,
        tipo: TipoCliente
    }
    type Mutation {
        crearCliente(input: ClienteInput) : Cliente
    }
`);

export default schema;
