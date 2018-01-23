require('dotenv').config()

const Telegraf = require('telegraf')
const mongoose = require('mongoose')
const bot = new Telegraf(process.env.BOT_TOKEN)

// Connect mongoose to mongodb
mongoose.connect(process.env.DB_CONNECTION || 'mongodb://localhost/zedcoinbot')

// Watch every incoming message and make sure all users
// are added to the list
bot.use(require('./middleware/createAndUpdateUsers'))

// Load commands
require('./commands')(bot)

bot.startPolling()
