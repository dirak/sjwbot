exports.name = "joke";

exports.chat = function(client, channel, message, userstate) {
    if(typeof message === "undefined" || typeof userstate === "undefined") {
        return;
    }
    var re = /^tell me a joke about (\S.*)$/i;
    var match = re.exec(message);
    if(match === null || message.match(/(http|\.\S)/i)) {
        return;
    }
    // replace removes sentence-ending punctuation ("." or "!")
    var subject = match[1].trim().replace(/[.!]$/g, "").trim();
    var user = userstate['display-name'];
    client.modified_say(channel, `Did you hear about ${subject}, ${user}? It was destroyed.`);
}