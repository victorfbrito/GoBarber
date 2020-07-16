const express = require('express')

const multerConfig = require('./config/multer')

//FAZ UPLOAD DA FOTO
const upload = require('multer')(multerConfig)

const routes = express.Router()


//Middleware de autenticação
const authMiddleware = require('./app/middlewares/auth')

//Middleware de login
const guestMiddleware = require('./app/middlewares/guest')

//IMPORTA OS CONTROLADORES DAS TELAS
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const ProvdashboardController = require('./app/controllers/ProvdashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')

//PASSA OS DADOS DE MSGS EM FLASH (ERRO E SUCESSO) PARA TODAS AS ROTAS
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

//TELA DE ARQUIVO(IMG)
routes.get('/files/:file', FileController.show)

//TELA DE LOGIN
routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

//TELA DE REGISTRO
routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'),  UserController.store)

//TODAS AS ROTAS INICIADAS COM APP ESTÃO PROTEGIDAS POR LOGIN
routes.use('/app', authMiddleware)

//SAI DA SESSÃO
routes.get('/app/logout', SessionController.destroy)

//TELA DE DASHBOARD
routes.get('/app/dashboard', DashboardController.index)
routes.get('/app/provdashboard', ProvdashboardController.index)

//TELA DE APONTAMENTO DE HORARIO
routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)
routes.get('/app/available/:provider', AvailableController.index)

module.exports = routes
