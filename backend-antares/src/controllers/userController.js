const fs = require('fs');
const path = require('path');

const getAllUsers = (_req, res) => {
    const favUsersDB = require('../data/db.json')
    return res.status(200).json(favUsersDB)
}

const addUser = (req, res) => {
    console.log("req body:\n" + req.body)
    const newUser = req.body;
    const dbPath = path.join(__dirname, '../data/db.json');
    const favUsersDB = require(dbPath);
  
    // Adiciona o novo usuário à lista de usuários favoritos
    favUsersDB.push(newUser);
  
    // Atualiza o arquivo db.json com a nova lista de usuários favoritos
    fs.writeFileSync(dbPath, JSON.stringify(favUsersDB));
  
    // Retorna uma resposta de sucesso
    res.status(201).json({ message: 'Usuário adicionado com sucesso' });
}

const deleteUser = (req, res) => {
    const userLogin= req.params.login;  // Assume que o ID do usuário está vindo como um parâmetro de rota
    const dbPath = path.join(__dirname, '../data/db.json');
    const favUsersDB = require(dbPath);
  
    // Encontra o índice do usuário no array usando o ID
    const userIndex = favUsersDB.findIndex(user => user.login === userLogin);
  
    // Se o usuário não foi encontrado, retorna um erro
    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  
    // Remove o usuário do array
    favUsersDB.splice(userIndex, 1);
  
    // Atualiza o arquivo db.json com a nova lista de usuários favoritos
    fs.writeFileSync(dbPath, JSON.stringify(favUsersDB));
  
    // Retorna uma resposta de sucesso
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
}

const toggle_star = (req, res) => {
    const favUsersDB = require('../data/db.json')
    let updatedUsers = favUsersDB.map(user => {
        if (user.login === req.params.login) {
            return { ...user, fav: true };
        } else {
            return { ...user, fav: false };
        }
    });
    
    fs.writeFileSync(path.join(__dirname, '../data/db.json'), JSON.stringify(updatedUsers, null, 2));
    
    res.status(200).json({ message: 'Usuário atualizado com sucesso' })
    return updatedUsers;
}

module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    toggle_star
}