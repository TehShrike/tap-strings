const parser = require('tap_parser')

module.exports = function parseLine(string) {
	return new Promise((resolve, reject) => {
		const stream = parser()

		stream.on('end', reject)
		stream.on('data', object => resolve(object))
		stream.end(string)
	})
}
