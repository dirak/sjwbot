const USERS_AUTHORIZED = ['dirak_'];
var spongebob_mode = false;

exports.name = "spongebob-mode";

exports.chat = function(client, channel, message, userstate) {
    if(typeof message === "undefined" || typeof userstate === "undefined") {
        return;
    }
    if(!message.match(/^!spongebob-?mode\s*$/i)) {
        return;
    }
    console.log("here");
    if(!USERS_AUTHORIZED.includes(userstate['display-name'].toLowerCase())) {
        return;
    }
    spongebob_mode = !spongebob_mode;
}

exports.say = function(msg) {
    if(spongebob_mode) {
        msg = [...msg].map((v,k) => k % 2 == 0 ? v.toLowerCase() : v.toUpperCase()).join("");
    }
    return msg;
}