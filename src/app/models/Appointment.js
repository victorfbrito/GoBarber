module.exports = (sequelize, DataTypes) => {
  //DEFINE APPOINTMENT COMO DATA
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE
  })

  //ASSOCIA APPOINTMENT AO USUÁRIO E AO CABELEIREIRO
  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { foreignKey: 'user_id' })
    Appointment.belongsTo(models.User, { foreignKey: 'provider_id' })
  }

  return Appointment
}
