const Sequelize =  require('sequelize')

const connection = new Sequelize('guiaperguntas', 'root', '#Ovofrito2', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;