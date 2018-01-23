const randomstring = require('randomstring')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  tgid: String,
  username: String,
  referral_code: String,
  referral_count: String,
  referred_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

userSchema.methods.incrementReferralCount = async function () {
  this.referral_count++
  await this.save()
}

userSchema.pre('save', function (next) {
  // Generate a referral code if one isn't set
  if (!this.referral_code) {
    this.referral_code = randomstring.generate({ length: 8, readable: true })
    this.referral_count = 0
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = {
  userSchema,
  User
}
