require('dotenv').config()

const { User } = require('./models/user')
const Telegraf = require('telegraf')
const mongoose = require('mongoose')
const bot = new Telegraf(process.env.BOT_TOKEN)

// Connect mongoose to mongodb
mongoose.connect(process.env.DB_CONNECTION || 'mongodb://localhost/zedcoinbot')

const getUsername = (obj) => {
  if (obj.username) {
    return obj.username
  }

  return [obj.firstName, obj.lastName].filter(x => x !== null && x !== undefined).join(' ')
}

// Watch every incoming message and make sure all users
// are added to the list
bot.use(async (ctx, next) => {
  if (ctx.message) {
    const tguser = ctx.message.from
    User.findOne({ tgid: tguser.id }).then(async (user) => {
      if (user) {
        const username = getUsername(tguser)
        if (username !== user.username) {
          user.username = username
          await user.save()
        }
      } else {
        user = await User.create({
          tgid: tguser.id,
          username: tguser.username
        })
        console.log(user)
      }
    })
  }
  await next()
})

// Load commands
require('./commands')(bot)

bot.startPolling()
