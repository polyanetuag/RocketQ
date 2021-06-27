const Database = require("../db/config")

module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password

    let roomId
    let isRoom = true

    while(isRoom) {
      /* Gera o número da sala */
      for(var i = 0; i < 6; i++) {
        i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
        roomId += Math.floor(Math.random() * 10).toString()
      }
      /*Verificar se o número da sala já existe */
      const roomsExistIds = await db.all(`SELECT id FROM rooms`)
      isRoom = roomsExistIds.some(roomsExistId => roomsExistId === roomId)
      
      // console.log(parseInt(roomId))
      if (!isRoom) {
        /*Insere a sala no banco de dados */
        await db.run(`INSERT INTO rooms (
          id,
          pass
        ) VALUES (
          ${parseInt(roomId)},
          ${pass}
        )`)
      }
    }

    await db.close()

    res.redirect(`/room/${roomId}`)
  }, 
  
  async open(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
    const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)

    res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead})
  }
}