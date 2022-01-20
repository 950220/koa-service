/** @format */

import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

module.exports = new Schema({
    sysName: {
        type: String,
        required: true,
    },
    hostname: {
        type: String,
        required: true,
    },
    feedback_count: {
        type: Number,
        required: true,
    },
    feedback_date: {
        type: Date,
        required: true,
    },
    feedback_firstTime: {
        type: Date,
    },
    feedback_lastTime: {
        type: Date,
    },
})
