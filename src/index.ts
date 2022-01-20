/** @format */
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as cors from '@koa/cors'
const index = require('./router/index')
const feedback = require('./router/feedback')
const views = require('koa-views')

const app = new Koa()
app.use(bodyParser())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
    views(__dirname + '/views', {
        extension: 'pug',
    }),
)
// response
app.use(cors({credentials: true}))
app.use(index.routes())
app.use(feedback.routes()).use(feedback.allowedMethods())
app.listen(3001)
