/** @format */

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Feedback = require('./feedback')

module.exports = {
    FeedbackModel: mongoose.model('Record', Feedback, 'record'),
}
