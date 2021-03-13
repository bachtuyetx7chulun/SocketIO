const ActiveUser = require('./mail/activeUser.job')
const NotifyJob = require('./cron/notify.cron')

module.exports = {
  ActiveUser,
  NotifyJob,
}
