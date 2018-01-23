const helpMessage = `
Welcome to @ZEDCoinBot! Let me tell you what I can do.

Commands:

/help - Show this message
/referralcode - Display your referral code
/referralcount - Show how many users you've referred
/referredby [code] - Use another user's referral code

I'm still being actively developed, so if you have any questions or want to report a bug just send a PM to @watzon.
`

module.exports = (bot) => bot.command('help', (ctx) => ctx.reply(helpMessage))
