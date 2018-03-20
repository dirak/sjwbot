var fs = require('fs');
var rand = require('random-item');

var rome_data = [];
fs.readFile('./assets/rome.txt', 'utf8', (err, data) => {
    if (err) throw err;
    rome_data = data.split('\n');
});

exports.name = "rome";

exports.chat = function(client, channel, message, userstate) {
    if(typeof message === "undefined" || typeof userstate === "undefined") {
        return;
    }
    if(!message.match(/^!rome\s*$/i)) {
        return;
    }
    var reason = rand(rome_data);
    client.modified_say(channel, `The decline of Rome was because of ${reason}`);
}