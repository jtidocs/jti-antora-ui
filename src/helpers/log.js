'use strict'

module.exports = (...a) => {
  a.pop()
  console.log('log helper: ', ...a)
}
