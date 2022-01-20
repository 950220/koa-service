/** @format */

import * as mongoose from 'mongoose'

const config = require('../config')
const FeedBackModel = require('./model').FeedbackModel
const mongodbUrl = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}?authSource=admin`
mongoose.connect(mongodbUrl)
const conn = mongoose.connection
conn.on('error', console.error.bind(console, '连接错误：'))
conn.once('open', callback => {
    console.log('MongoDB连接成功！！')
})
const utils: any = {}

utils.FeedBackModel = FeedBackModel

module.exports = utils
