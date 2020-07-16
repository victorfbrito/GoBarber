const moment = require('moment')
//OP = OPERADORES DO SEQUELIZE
const { Op } = require('sequelize')
const { Appointment } = require('../models')

class AvailableController {
  async index (req, res) {
    //PEGA A DATA EM NMR INTEIRO
    const date = moment(parseInt(req.query.date))

    //DEFINE AGENDAMENTOS
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format(),
          ]
        }
      }
    })

    //HORÁRIOS
    const schedule = [
      '8:00',
      '9:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ]

    //HORÁRIOS DISPONÍVEIS
    const available = schedule.map(time => {
      //NOMEIA A HORA COMO hour E MINUTO COMO minute
      const [hour, minute] = time.split(':')
      //CRIA value COMO FORMATO 2020-05-31 12:30:00
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0)

      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment()) &&
          !appointments.find(a => moment(a.date).format('HH:mm') === time)
      }
    })

    return res.render('available/index', { available })
  }
}

module.exports = new AvailableController()
