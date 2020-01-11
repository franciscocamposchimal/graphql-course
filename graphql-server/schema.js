import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        tipo: TipoCliente
        pedido: [Pedido]
    }
    type Pedido {
        producto: String
        precio: Int
    }
    enum TipoCliente {
        BASICO
        PREMIUM
    }   
    type Query {
        getCliente(id: ID): Cliente
    }
    input PedidoInput {
        producto: String
        precio: Int
    }
    input ClienteInput {
        id: ID
        nombre: String!
        apellido: String!
        empresa: String!
        tipo: TipoCliente
        pedido: [Pedido]
    }
    """ Descripción general """
    type Mutation {
        #Este es un comentario
        """ Descripción por acción """
        crearCliente(input: ClienteInput) : Cliente
    }
`);

export default schema;
