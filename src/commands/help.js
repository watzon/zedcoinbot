const helpMessage = `
Welcome to @ZEDCoinBot! I am the official bot for @ZEDNetworkInc.

Commands:

/help - Show this message
/faq - Display a list of common questions
/referralcode - Display your referral code
/referralcount - Show how many users you've referred
/referredby [code] - Use another user's referral code

I'm still being actively developed, so if you have any questions or want to report a bug just send a PM to @watzon.
`

module.exports = (bot) => bot.command(['help', 'start'], (ctx) => ctx.reply(helpMessage))
