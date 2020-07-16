const path = require('path')

//PEGA O PARAMETRO FILE, BUSCA NA PASTA UPLOADS E RETORNA PARA O USER
class FileController {
  show (req, res) {
    const { file } = req.params

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      file
    )

    return res.sendFile(filePath)
  }
}

module.exports = new FileController()
