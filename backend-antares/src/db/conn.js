const mongoose = require('mongoose')
require('dotenv').config();

async function main () {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(`mongodb+srv://admin-antares:${process.env.ADMIN_DATABASE}@antares-cluster.t6traem.mongodb.net/?retryWrites=true&w=majority`)
            .then(() => {
                console.log('Conexão com Mongo Estabelecida com Sucesso.')
            })
            .catch((error) => {
                console.error('Erro de Conexão com Mongo: ' + error)
            })
    } catch (error) {
        console.error('Erro conn: ' + error)
    }
}

module.exports = main