var fs = require('fs');
var rand = require('random-item');

var rhymes_with = function(word, rhyme_list) {
	for(let rhyme of rhyme_list) {
		if(word.endsWith(rhyme)) return true;
	}
	return false;
}

var english_data = fs.readFileSync('./assets/english.txt', 'utf8').split("\r\n");
var pjw_data = english_data.filter( word => rhymes_with(word, ['ock']) );

exports.name = "pjw";

exports.chat = function(client, channel, message, userstate) {
		if(typeof message === "undefined" || typeof userstate === "undefined") {
				return;
		}
		if(message.match(/^!pjw\s*$/i)) {
			var reason = rand(pjw_data).toLowerCase();
			client.modified_say(channel, `Imagine my ${reason}.`);
		}
}