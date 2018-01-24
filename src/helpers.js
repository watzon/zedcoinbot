const getUsername = (ctx) => {
  const from = ctx.message.from

  if (from.username) {
    return from.username
  }

  return [from.first_name, from.last_name].filter(x => !!x).join(' ')
}

module.exports = {
  getUsername
}
