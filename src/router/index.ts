/** @format */

const router = require('koa-router')()

router.get('/', async (ctx: any, next: any) => {
    ctx.body = 'hello feedback record'
})

module.exports = router
