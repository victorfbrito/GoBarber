const { User, Appointment } = require('../models')
const moment = require('moment')
//OP = OPERADORES DO SEQUELIZE
const { Op } = require('sequelize')

class ProvdashboardController {
  async index (req, res) {
    //separa os usuários que são PROVIDERS
    const user = res.locals.user
    const now =  moment(new Date()).format("YYYY-MM-DD")
    // user.now = now.toLocaleDateString()
    const appointments = await Appointment.findAll({ where:{ provider_id: user.id }} )
    for (const appointment of appointments) {
      const client = await User.findOne({ where: { id: appointment.user_id }} )
      appointment.client=client
      appointment.hour = appointment.date.toLocaleTimeString()
      appointment.date2 = appointment.date.toLocaleDateString()
      const mzero = now.charAt(5)
      if (mzero == "0"){
        appointment.today = now.slice(0,5) + now.slice(6)
      }

    }
    user.now =  moment(new Date()).format ("DD/MM/YYYY")
    return res.render('provdashboard', { user, appointments, appointments })
  }

}

module.exports = new ProvdashboardController()
