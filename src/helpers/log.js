'use strict'

module.exports = (...a) => {
  let b = a.pop()
  console.log('log helper: ', ...a)
}
