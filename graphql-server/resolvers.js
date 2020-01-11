class Cliente {
	constructor(id, { 
        nombre, apellido, empresa, tipo, pedido }) {
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
        this.empresa = empresa;
        this.tipo = tipo;
        this.pedido = pedido;
	}
}

const clientesDB = {};

//resolver
const resolvers = {
	getCliente: ({id}) => {
        return new Cliente(id, clientesDB[id]);
	},
	crearCliente: ({input}) => {
		const id = 12344;
		clientesDB[id] = input;
		return new Cliente(id, input);
	}
};