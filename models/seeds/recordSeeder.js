const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const recordList = require('./record.json')
const bcrypt = require('bcryptjs')

const seed_user = {
  "name": "User_one",
  "email": "user1@example.com",
  "password": "12345678"
}

db.once('open', () => {
  console.log('Mongodb connected!')

  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(seed_user.password, salt))
    .then(hash => User.create({ ...seed_user, password: hash }))
    .then(newUser => {
      const userId = newUser._id
      return Promise.all(Array.from({ length: recordList.length },
        (_, i) => Record.create({
          ...recordList[i], userId
        }))
      )
    })
    .then(() => {
      console.log('The seeder is done.')
      process.exit()
    })
    .catch(error => {
      console.log(error)
      process.exit()

    })

})