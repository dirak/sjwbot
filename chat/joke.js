module.exports = {
	chat : function(client, channel, message, userstate) {
		if(typeof message != "undefined" && typeof userstate != "undefined") {
			if(message.match(/^tell me a joke about/i)) {
				var subject = message.replace(/^tell me a joke about/i, '');
				var user = userstate['display-name'];
				client.say(channel, `Did you hear about ${subject}, ${user}? It was destroyed.`);
			}
		}
	}
}