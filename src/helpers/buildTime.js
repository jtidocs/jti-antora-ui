'use strict'

const now = new Date()
const date = now.toLocaleDateString('en-CA')
const time = now.toLocaleTimeString('en-US', { timeZone: 'America/Vancouver', timeStyle: 'long' })
const report = `${date} ${time}`

module.exports = () => report
