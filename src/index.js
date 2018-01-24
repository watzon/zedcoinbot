require('dotenv').config()

const Telegraf = require('telegraf')
const mongoose = require('mongoose')
const logger = require('./logger')
const bot = new Telegraf(process.env.BOT_TOKEN, { username: 'ZEDCoinBot' })

// Connect mongoose to mongodb
mongoose.connect(process.env.DB_CONNECTION || 'mongodb://localhost/zedcoinbot')

// Watch every incoming message and make sure all users
// are added to the list
bot.use(require('./middleware/createAndUpdateUsers'))

// Load commands
require('./commands')(bot)

logger.info('Bot polling')
bot.startPolling()
