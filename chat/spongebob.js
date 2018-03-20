module.exports = {
	name : "spongebob-mode",
	spongebob_mode : false,
	chat : function(client, channel, message, userstate) {
		if(typeof message != "undefined" && typeof userstate != "undefined") {
			if(message.match(/^!spongebobmode(\s+((?!\S)$)|$)/i)) {
				console.log("here");
				if(userstate['display-name'] == 'dirak_') {
					this.spongebob_mode = !this.spongebob_mode;
				}
			}
		}
	},
	say : function(msg) {
		if(this.spongebob_mode) {
			msg = [...msg].map((v,k) => k % 2 == 0 ? v.toLowerCase() : v.toUpperCase()).join("");
		}
		return msg;
	}
}