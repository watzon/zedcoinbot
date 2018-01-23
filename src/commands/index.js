module.exports = (bot) => {
  require('./help')(bot)
  require('./referralCode')(bot),
  require('./referralCount')(bot),
  require('./referredBy')(bot),
  require('./faq')(bot)
}
