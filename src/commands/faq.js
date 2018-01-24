const logger = require('../logger')
const { getUsername } = require('../helpers')

const faqMessage = `
ZED Network FAQ

Q: What is the ZED Network website?
A: The website is http://zed.network

Q: What is ZED?
A: ZED Network is a platform as a service (PaaS) for connecting global money transfer operators. It's purpose is similar to that of SWIFT, but ZED operates independently of banks and instead favors a global, distributed network based on Blockchain technology.

Q: Is ZED a currency?
A: ZED is a platform that contains a currency, wallet, and apps for handling transactions.

Q: Can I mine ZED?
A: ZED, unlike the majority of crypto currencies, does not require mining to perform transactions. ZED transactions are also deliberately low cost.

Q: If I can't mine ZED how can I get it?
A: ZED will be available during an upcoming token sale. It can be purchased with BTC, ETH, and XLM.

Q: What is the block supply for ZED?
A: ZED will have a total token supply of 100,000,000 (one hundred billion). 21,000,000 of those will be available for the pre-sale.

Q: When will the pre-sale be?
A: The pre-sale should be happening Q1/2018 with the product launch and ICO happening Q2.

Q: Is there a whitepaper I can look at?
A: There sure is. http://bit.ly/zedwhitepaper
`

module.exports = (bot) => {
  bot.command('faq', (ctx) => {
    const username = getUsername(ctx)
    logger.info(`Command: ${username} -> /faq`)
    ctx.reply(faqMessage)
  })
}
