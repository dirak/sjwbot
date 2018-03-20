var https = require('https');
const SARGON_UNIT = 5.0;

function parse_uptime(body) {
    if(body.includes("is offline")) {
        return body;
    }
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
    return `The stream has been live for ${sargons.toFixed(2)} sargons ( ${body} )`;
}

exports.name = "sargon-uptime";
exports.chat = function(client, channel, message, userstate) {
    if(typeof message === "undefined" || typeof userstate === "undefined") {
        return;
    }
    if(!message.match(/^!uptime\s*$/i)) {
        return;
    }
    https.get(`https://beta.decapi.me/twitch/uptime/${channel}`, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => { //this is a stream so we need to just append
            body += data;
        });
        res.on("end", () => {
            client.modified_say(channel, parse_uptime(body));
        });
    });
}