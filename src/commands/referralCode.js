const { User } = require('../models/user')
const logger = require('../logger')
const { getUsername } = require('../helpers')

module.exports = (bot) => {
  bot.command('referralcode', async (ctx) => {
    const username = getUsername(ctx)
    logger.info(`Command: ${username} -> /referralcode`)

    const tguser = ctx.message.from
    const user = await User.findOne({ tgid: tguser.id })

    const referralCode = user.referral_code
    ctx.reply(`@${tguser.username} your referral code is ${referralCode}\n\nUse it to refer your friends to @ZEDNetworkInc! 🎉`)
  })
}
