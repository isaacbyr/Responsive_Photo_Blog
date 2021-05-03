const mongoose = require('mongoose')
const Schema = mongoose.Schema
const faker = require('faker')

const photo_newsletter = new Schema({
  email: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})

const newsletter = mongoose.model('Newsletter', photo_newsletter)

// Seed Function
// async function seedFunction() {
//   for (let i = 0; i < 400; i++) {
//     const newEmail = faker.internet.email()
//     const newUser = await new newsletter({ email: newEmail })
//     await newUser.save()
//   }
// }
// seedFunction()

module.exports = newsletter
