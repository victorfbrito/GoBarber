module.exports = (req, res, next) => {
  // if (existe uma sessão && o usuário está logado)
  if (req.session && req.session.user) {
    //res.locals.user envia todas as informações do usuario pra qualquer uma das views em que tiver {{ user }}
    res.locals.user = req.session.user

    return next()
  }

  return res.redirect('/')
}
