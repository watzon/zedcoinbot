const { User } = require('../models/user')

const getUsername = (obj) => {
  if (obj.username) {
    return obj.username
  }

  return [obj.firstName, obj.lastName].filter(x => !!x).join(' ')
}

module.exports = async (ctx, next) => {
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
}
