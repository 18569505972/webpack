const autoprefixer = require("autoprefixer")
module.exports = {
	plugin: [
		autoprefixer({
			grid: 'autoplace',
			browsers: [
				'>1%',
				'last 3 version',
				'android 4.2',
				'ie 8'
			]
		})
	]
}