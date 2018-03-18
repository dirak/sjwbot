var tmi = require("tmi.js"); //this is a twitch api
var fs = require("fs"); //for loading the modular files dynamically
var path = require("path"); //for getting our specific path
var joke = require("./chat/joke.js")

//load the chat modules
var normalized_path = path.join(__dirname, "chat");
var chat_modules = []
fs.readdirSync(normalized_path).forEach(file => {
	var mod = require("./chat/" + file);
	chat_modules.push(mod);
});

var options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "sjwbot_debug",
        password: "oauth:bt2ppgkg94slg7gt64o1vxjlbbhp4r"
    },
    channels: ["#dirak_"]
};

var client = new tmi.client(options);

client.connect();

client.on("connected", (address, port) => {
    for(let [i, _module] of chat_modules.entries()) {
        if(typeof _module.init != "undefined") {
            _module.init
        }
    }
});

client.on("chat", (channel, userstate, message, self) => {
    if(self) return;
    for(let [i, _module] of chat_modules.entries()) {
        if(typeof _module.chat != "undefined") {
            var response = _module.chat(client, channel, message, userstate);
        }
    }
});
