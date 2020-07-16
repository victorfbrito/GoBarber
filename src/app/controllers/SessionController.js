const { User } = require('../models')

class SessionController {
  async create (req, res) {
    //PEGA HTML DA PAGINA
    return res.render('auth/signin')
  }

  //PROCURA USUARIO NO BANCO
  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email }})

    //USER NAO ENCONTRADO
    if (!user) {
      req.flash('error', 'Usuário não encontrado')
      return res.redirect('/')
    }

    //SENHA INCORRETA
    if (!(await user.checkPassword(password)))   {
      req.flash('error', 'Senha incorreta')
      return res.redirect('/')
    }
    //DEU TUDO CERTO

    req.session.user = user
    if (user.provider){
      return res.redirect('/app/provdashboard')
    }else{
      return res.redirect('/app/dashboard')
    }
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController
