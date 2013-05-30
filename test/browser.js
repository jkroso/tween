var mocha = require('mocha')

mocha.setup('bdd')

require('./tween.test.js')

mocha.run(function () {
	console.log('Done!')
})
