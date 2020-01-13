import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const urlDB = 'mongodb+srv://franko:campos@cluster0-bgsj4.mongodb.net/test?retryWrites=true&w=majority'; 

mongoose.connect(urlDB, { useUnifiedTopology: true, useNewUrlParser: true });

const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    email: String,
    edad: Number,
    tipo: String,
    pedidos: Array
});

const Clientes = mongoose.model('clientes', clientesSchema);

export { Clientes };