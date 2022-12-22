/*
node mongo.js yourpassword Anna 040-1234556
  to add
node mongo.js yourpassword
  to show all
*/


const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]


const url = `mongodb+srv://fullstack:${password}@cluster0.eapb1wk.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected')

      Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
          console.log(person.name, person.number)
        })

        mongoose.connection.close()
      })
    }).catch((err) => console.log(err))
}

else if (process.argv.length < 6) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected')

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })

      return person.save()
    })
    .then(() => {
      console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
      return mongoose.connection.close()
    }).catch((err) => console.log(err))
}
