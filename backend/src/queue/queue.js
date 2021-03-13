const { REDIS_NAME, REDIS_PORT } = require('../config')
const Queue = require('bull')
const jobs = require('./jobs')

const queues = Object.values(jobs).map(job => {
  return {
    bull: new Queue(job.jobName, `redis://${REDIS_NAME}:${REDIS_PORT}`),
    name: job.jobName,
    handle: job.jobHandle,
  }
})

module.exports = {
  queues,
  add: (name, data) => {
    const queue = queues.find(queue => queue.name === name)
    return queue.bull.add(data)
  },
  process: queues => {
    return queues.map(queue => {
      queue.bull.process(job => {
        queue.handle(job.data)
      })
      queue.bull.on('failed', (job, err) => {
        console.log(`Job failed: ${queue.key}:${job.data}`)
        console.log(err)
      })
    })
  },
}
