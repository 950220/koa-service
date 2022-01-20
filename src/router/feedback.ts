/** @format */

import {getDateStr, dateTimeFormat} from '../utils'
const feedbackRouter = require('koa-router')()
const FeedbackModel = require('../models').FeedBackModel

feedbackRouter.prefix('/feedback')

feedbackRouter.get('/', function (ctx: any, next: any) {
    ctx.body = 'this is a feedback record response!'
})

feedbackRouter.post('/report', async (ctx: any, next: any) => {
    const body = ctx.request.body
    const {sysName, hostname} = body
    const nowDateStr = getDateStr()
    try {
        const record = await FeedbackModel.find({
            feedback_date: {
                $gt: new Date(nowDateStr + ' 00:00:00'),
                $lt: new Date(nowDateStr + ' 23:59:59'),
            },
            hostname,
        })
        if (record && record.length) {
            await FeedbackModel.updateOne(
                {_id: record[0]._id},
                {
                    feedback_count: record[0].feedback_count + 1,
                    feedback_lastTime: new Date(),
                },
            )
        } else {
            const newRecord = new FeedbackModel({
                sysName,
                hostname,
                feedback_count: 1,
                feedback_date: new Date(),
                feedback_firstTime: new Date(),
                feedback_lastTime: new Date(),
            })
            await newRecord.save()
        }
        ctx.body = {
            code: 200,
            message: '上报成功',
        }
    } catch (error) {
        console.log(error)
        ctx.status = 500
        ctx.body = {
            code: 500,
            message: '上报失败',
        }
    }
})

feedbackRouter.get('/result', async (ctx: any, next: any) => {
    const query = ctx.query
    let condition: any = {}
    if (query.start || query.end) {
        condition = {
            feedback_date: {},
        }
        if (query.start) {
            condition.feedback_date.$gt = new Date(query.start + ' 00:00:00')
        }
        if (query.end) {
            condition.feedback_date.$lt = new Date(query.end + ' 23:59:59')
        }
    }
    if (query.hostname) {
        condition.hostname = query.hostname
    }
    try {
        const records = await FeedbackModel.find(condition)
        await ctx.render('result', {
            records:
                records.map((record: any) => ({
                    id: record._id,
                    sysName: record.sysName,
                    hostname: record.hostname,
                    feedback_count: record.feedback_count,
                    feedback_date: getDateStr(record.feedback_date),
                    feedback_firstTime: dateTimeFormat(record.feedback_firstTime),
                    feedback_lastTime: dateTimeFormat(record.feedback_lastTime),
                })) || [],
        })
    } catch (error) {
        console.log(error)
        ctx.body = '请求出错, 请检查参数'
    }
})

module.exports = feedbackRouter
