const { User } = require('..\\models')
//deu erro aqui
class UserController {
  create (req, res) {
    //PEGA HTML DA PAGINA
    return res.render('auth/signup')
  }

  async store (req, res) {
    //SALVA USUARIO COM DADOS E FOTO
    const { filename: avatar } = req.file

    await User.create({ ... req.body, avatar})

    return res.redirect('/')
  }
}

module.exports = new UserController()
