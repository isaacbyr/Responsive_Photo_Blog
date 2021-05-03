const express = require('express')
const app = express()
const path = require('path')
const engine = require('ejs-mate')
const mongoose = require('mongoose')
const Newsletter = require('./models/newsletter')
const session = require('express-session')
const flash = require('connect-flash')

mongoose.connect('mongodb://localhost/photo_blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error'))
db.once('open', () => {
  console.log('Database Connected')
})

app.use(flash())
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true },
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.url = req.url
  next()
})

app.get('/home', (req, res) => {
  res.render('home')
})

app.get('/contact', async (req, res) => {
  const numUsers = await Newsletter.countDocuments({})
  res.render('contact', { numUsers })
})

app.post('/contact', async (req, res) => {
  const email = req.body
  const sign_up = await new Newsletter(email)
  console.log(sign_up)
  await sign_up.save()
  req.flash('success', 'Thanks for signing up!')
  res.redirect('/contact')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.listen(3000, () => {
  console.log('LISTENING ON PORT 3000')
})
