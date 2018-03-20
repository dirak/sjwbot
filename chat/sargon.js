https = require('https');
const SARGON_UNIT = 5.0;

module.exports = {
	name : "sargon-uptime",
	chat : function(client, channel, message, userstate) {
		if(typeof message != "undefined" && typeof userstate != "undefined") {
			if(message.match(/^!uptime(\s+((?!\S)$)|$)/i)) {
				https.get(`https://beta.decapi.me/twitch/uptime/${channel}`, res => {
					res.setEncoding("utf8");
					let body = "";
					res.on("data", data => { //this is a stream so we need to just append
						body += data;
					});
					res.on("end", () => {
						if(body.includes("is offline")) {
							client.say(channel, body);
						} else {
							let times = body.split(',');
							let sargons = 0.0;
							for(let time of times) {
								time = time.trim();
								if(time.includes("hour")) {
									var chunk_unit = (60/SARGON_UNIT);
								} else if(time.includes("minute")) {
									var chunk_unit = (1/SARGON_UNIT);
								} else if(time.includes("second")) {
									var chunk_unit = (1/60) * (1/SARGON_UNIT);
								}
								let chunk = time.split(" ")[0];
								console.log(chunk_unit, chunk, chunk * chunk_unit);
								sargons += chunk * chunk_unit;
							}
							client.say(channel, `The stream has been live for ${sargons.toFixed(2)} sargons ( ${body} )`);
						}
					});
				});
			}
		}
	}
}