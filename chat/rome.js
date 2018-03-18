var fs = require('fs');
var rand = require('random-item');

fs.readFile('./assets/rome.txt', 'utf8', (err, data) => {
	if (err) throw err;
	var rome_data = data.split('\n');
	module.exports.rome_data = rome_data;
});

module.exports = {
	chat : function(message, userstate) {
		if(typeof message != "undefined" && typeof userstate != "undefined") {
			var reason = rand(this.rome_data);
			return `The decline of Rome was because of ${reason}`;
		}
		return false;
	}
}