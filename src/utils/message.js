import moment from 'moment'

export const formatMessage = (username, text, room) => {
  return {
    username,
    text,
    room,
    time: moment().format('h:mm: a'),
  }
}
