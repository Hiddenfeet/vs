
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./vvs-config.cjs.production.min.js')
} else {
  module.exports = require('./vvs-config.cjs.development.js')
}
