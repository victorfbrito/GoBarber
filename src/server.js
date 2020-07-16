const express = require('express')
//para gerar aplicações web
const nunjucks = require('nunjucks')
//facilita entrada de variaveis js em html
const session = require('express-session')
//mantém logado
const FileStore = require('session-file-store')(session)
//Storage de login quando em teste/offline
const path = require('path')
//lida com barras invertidas de path
const flash = require('connect-flash')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()

  }

  middlewares () {
    //oculta os dados inseridos no forms
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(flash())
    this.express.use(
      session({
        name: 'root',
        secret: 'MyAppSecret',
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        saveUninitialized: true,
      })
    )
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
    //define formato padrao de view como njk
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
