//BANCO DE DADOS
module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'gonodemodulo2',
  operatorAliases: false,
  define: {
    //timestamps cria campos created at e updated at
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
