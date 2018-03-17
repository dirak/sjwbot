module.exports = {
	chat : function(message, userstate) {
		if(typeof message != "undefined" && typeof userstate != "undefined") {
			if(message.startsWith("tell me a joke about")) {
				var subject = message.split("tell me a joke about")[1];
				var user = userstate['display-name'];
				return `Did you hear about ${subject}, ${user}? It was destroyed.`;
			}
		}
	}
}