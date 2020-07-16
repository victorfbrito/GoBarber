module.exports = (req, res, next) => {
  // if (existe uma sessão && o usuário NÃO está logado)
  if (req.session && !req.session.user) {
    // permite que ele vá até a tela de login
    return next()
  }

  if (req.session.user.provider){
    return res.redirect('/app/provdashboard')
  }else{
    return res.redirect('/app/dashboard')
  }
}
