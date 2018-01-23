const { User } = require('../models/user')

const countMessage = (num) => {
  num = parseInt(num)
  switch (num) {
    case 0:
      return 'SPREAD THE ZED! 🎉'
      break
    case (num < 5):
      return 'Keep up the good work! 👍'
      break
    default:
      return `You're on fire! 🔥`
      break
  }
}

module.exports = (bot) => bot.command('referralcount', async (ctx) => {
  const tguser = ctx.message.from
  const user = await User.findOne({ tgid: tguser.id })

  const referralCount = user.referral_count
  ctx.reply(`@${tguser.username} your referral count is ${referralCount}\n\n${countMessage(referralCount)}`)
})
