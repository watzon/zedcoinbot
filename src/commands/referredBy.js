const { User } = require('../models/user')
const logger = require('../logger')
const { getUsername } = require('../helpers')

module.exports = (bot) => bot.command('referredby', async (ctx) => {
  const fromUser = ctx.message.from
  const referralCode = ctx.message.text.split(' ')[1]

  const username = getUsername(ctx)
  logger.info(`Command: ${username} -> /referredby ${referralCode}`)

  // Send a message if no referral code was included
  if (!referralCode) {
    logger.info('No referral code supplied')
    return ctx.reply('I need a referral code for whoever referred you.\nLike this: /referredby TDhdhvEs')
  }

  const referredUser = await User.findOne({ tgid: fromUser.id })
  const referredByUser = await User.findOne({ referral_code: referralCode })

  // Make sure the referral code matches a user
  if (!referredByUser) {
    logger.info('A user with that referral code doesn\'t exist')
    return ctx.reply(`A user with that referral code doesn't exist. Are you sure you got it right?`)
  }

  // Keep people from using their own referral code
  if (referredUser.id == referredByUser.id) {
    logger.info('Attempted to use their own code')
    return ctx.reply(`Sorry, but you can't use your own referral code.`)
  }

  // Make sure they don't try to add another referral
  if (referredUser.referred_by) {
    logger.info('Already referred')
    return ctx.reply('You can only be referred by one user.')
  }

  referredUser.referred_by = referredByUser
  await referredUser.save()

  await referredByUser.incrementReferralCount()

  logger.info(`@${referredByUser.username} successfully referred @${referredUser.username}`)
  ctx.reply(`Thank you @${referredByUser.username} for referring @${referredUser.username}`)
})
