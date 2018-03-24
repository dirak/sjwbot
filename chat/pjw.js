var rand = require("random-item");
var rhymes = require("../rhymes.js");

const CENSORED = [
    /^cock$/i,
    // there are lots of names ending with bach, it can become quite repetitive
    /bach$/i
];

const WORDS = rhymes.suffix(["AA", "K"] /* "ock" in "shock" */).map(word => {
    return word.word;
}).filter(word => {
    return !CENSORED.some(re => re.test(word));
});
console.log(`pjw words (${WORDS.length}): ${WORDS.join(", ")}`);

exports.name = "pjw";

exports.chat = function(client, channel, message, userstate) {
    if (typeof message === "undefined" || typeof userstate === "undefined") {
        return;
    }
    if (!message.match(/^!pjw\s*$/i)) {
        return;
    }
    let word = rand(WORDS);
    client.modified_say(channel, `Imagine my ${word}`);
}