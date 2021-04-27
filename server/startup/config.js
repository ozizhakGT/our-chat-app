require('dotenv').config();

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  baseUrlApi: process.env.BASE_URL_API,
  newChatMessageEvent: process.env.NEW_MESSAGE_EVENT
}
