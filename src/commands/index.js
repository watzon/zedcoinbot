module.exports = (bot) => {
  require('./help')(bot)
  require('./start')(bot)
  require('./referralCode')(bot),
  require('./referralCount')(bot),
  require('./referredBy')(bot)
}
