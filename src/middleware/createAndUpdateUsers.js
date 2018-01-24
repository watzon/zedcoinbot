const { User } = require('../models/user')
const logger = require('../logger')
const { getUsername } = require('../helpers')

module.exports = async (ctx, next) => {
  if (ctx.message) {
    const tguser = ctx.message.from
    const username = getUsername(ctx)
    User.findOne({ tgid: tguser.id }).then(async (user) => {
      if (user) {
        logger.silly('User exists')
        if (username !== user.username) {
          logger.info(`Username changed from ${user.username} to ${username}`)
          user.username = username
          try {
            await user.save()
          } catch (e) {
            logger.error(`Failed to update username for '${username}': ${e}`)
          }
        }
      } else {
        logger.info(`Adding new user ${username}`)
        try {
          await User.create({
            tgid: tguser.id,
            username: username
          })
          logger.info('User added')
        } catch (e) {
          logger.error(`Failed to add user '${username}: ${e}'`)
        }
      }
    }).catch(e => {
      logger.error(e)
    })
  }
  await next()
}
