const mongoose = require('mongoose');
const { Schema } = mongoose;

const vagaSchema = new Schema({
    criador: {
        type: String,
        required: true,
        ref: 'Usuario'
    },
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    contato: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    user_image: {
        type: String,
    },
    link: {
        type: String,
        required: true
    },
    dataPublicacao: {
        type: Date,
        default: Date.now
    },
    dataEncerramento: {
        type: Date,
        default: () => new Date(+new Date() + 30*24*60*60*1000)
    }
});

const Vaga = mongoose.model('Vaga', vagaSchema);
module.exports = Vaga;

// (async () => {
//     try {
//         const vagaTeste = await Vaga.create({
//             criadorEmail: "teste@teste.com",
//             titulo: "Vaga Teste",
//             descricao: "Descrição da vaga teste",
//             contato: "contato@teste.com",
//             link: "https://www.teste.com"
//         });

//         console.log('Vaga de teste criada:', vagaTeste);
//     } catch (err) {
//         console.error('Erro ao criar vaga de teste:', err);
//     }
// })();
