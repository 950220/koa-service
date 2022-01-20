/** @format */

/**
 * 获取日期
 */
export function getDateStr(time?: Date) {
    const date = time ? new Date(time) : new Date()
    const y = date.getFullYear()
    const m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return `${y}-${m}-${d}`
}

/**
 * date --> YYYY-MM-DD HH:mm:ss
 */
export function dateTimeFormat(date: Date) {
    date = new Date(date)
    const y = date.getFullYear()
    const m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return `${y}-${m}-${d} ${h}:${min}:${sec}`
}
