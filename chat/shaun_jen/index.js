var rand = require("random-item");
var rhymes = require("./rhymes.js");

const CENSORED_JEN = [
    /^degenera[ct]/i, /^eugenic/i, /^genital/i, /^genocid/i,
    // this would just become JEN, which is (probably) not funny
    /^gen$/i,
    // Jen-like names
    /^jen/i, /^bruntjen$/i, /-jen$/i,
    // other proper names (surnames, companies, etc)
    /^amgen$/i, /^ampligen$/i, /^argenta$/i, /^argentieri$/i, /^biogen$/i,
    /^cytogen$/i, /^degennaro$/i, /^digennaro$/i, /^digenova$/i, /^dolgen$/i,
    /^energen$/i, /^epogen$/i, /^fulgencio$/i, /^gena$/i, /^gencarelli$/i,
    /^gencor$/i, /^gencorp$/i, /^gendler$/i, /^gendron$/i, /^genego$/i,
    /^genelab/i, /^genelabs$/i, /^genemedicine$/i, /^genencor$/i,
    /^genentech$/i, /^generali$/i, /^genesco$/i, /^genesee$/i, /^genevieve$/i,
    /^genex$/i, /^genicom$/i, /^genisco$/i, /^genlyte$/i, /^genmar$/i,
    /^genna$/i, /^gennadi$/i, /^gennett$/i, /^gennifer$/i, /^genovese$/i,
    /^genovesi$/i, /^genovise$/i, /^genpharm$/i, /^genrad$/i, /^gensia$/i,
    /^genske$/i, /^genson$/i, /^genstar$/i, /^genter$/i, /^genthner$/i,
    /^gentian$/i, /^gentner$/i, /^gentz$/i, /^gentzler$/i, /^genung$/i,
    /^genz$/i, /^genzyme$/i, /^girgenti$/i, /^ingenito$/i, /^jeansonne$/i,
    /^neupogen$/i, /^nexgen$/i, /^powergen$/i, /^regeneron$/i,
    /^snydergeneral$/i, /^somatogen$/i, /^synergen$/i, /^taligent$/i,
    /^tecogen$/i, /^urgen$/i
];

const WORDS_JEN = rhymes.infix(["JH", "EH", "N"] /* "jen" */).map(word => {
    return word.word;
}).filter(word => {
    return !CENSORED_JEN.some(re => re.test(word));
}).map(word => {
    const re = /gen/gi;
    if (!re.test(word)) {
        console.error(`unexpected Jen-word ${word} does not match ${re}`);
        process.exit(1);
    }
    re.lastIndex = 0;
    return word.replace(re, "JEN");
});
console.log(`jen words (${WORDS_JEN.length}): ${WORDS_JEN.join(", ")}`);

const CENSORED_SHAUN = [
    /^abortifacient/i, /abortion/i, /^degenerat/i, /^ejaculation$/i,
    /^erection/i, /^masterbation$/i, /^masturbation$/i, /^menstruation$/i,
    /^molestation$/i, /^prostitution$/i, /^retardation$/i, /^stalinization$/i,
    // these would just be SHAUN
    /^shun/i,
    // Shaun-like names
    /^shaun/i, /^sean/i,
    // other proper names
    /^anshan$/i, /^ashenberg$/i, /^ashenfelter$/i, /^bancorporation$/i,
    /^bocian$/i, /^boeschenstein$/i, /^boschen$/i, /^britian$/i, /^cashen$/i,
    /^cashon$/i, /^cistercian$/i, /^deshane$/i, /^deshon$/i, /^doordarshan$/i,
    /^eischen/i, /^eschen$/i, /^eschenburg$/i, /^forshan$/i, /^gershon$/i,
    /^grosshans$/i, /^henschen$/i, /^herschensohn$/i, /^hessian$/i,
    /^hoeschen$/i, /^kirschenbaum$/i, /^kirschenmann$/i, /^kirshenbaum$/i,
    /^kocian$/i, /^manasion$/i, /^mccuistion$/i, /^mcglashan$/i, /^mcmansion$/i,
    /^meishan$/i, /^mershon$/i, /^paschen$/i, /^pinshan$/i, /^rauschenberg$/i,
    /^schundler$/i, /^shanansky$/i, /^shenice$/i, /^shooshan$/i, /^shunto$/i,
    /^tieszen$/i, /^titian$/i, /^welshans$/i, /^wishon$/i
]

const WORDS_SHAUN = rhymes.infix(["SH", "AH", "N"] /* "shaun" */).map(word => {
    return word.word;
}).filter(word => {
    return !CENSORED_SHAUN.some(re => re.test(word));
}).map(word => {
    const regexes = [
        {re: /cean/gi, replace: "SHAUN"},
        {re: /(fi)cen(t)/gi, replace: "$1SHAUN$2"},
        {re: /chan(el)/gi, replace: "SHAUN$1"},
        {re: /(ma)chin(e)/gi, replace: "$1SHAUN$2"},
        {re: /chion/gi, replace: "SHAUN"},
        {re: /cian/gi, replace: "SHAUN"},
        {re: /(.*)cien(.*)/gi, replace: (match, p1, p2, offset, string) => {
            if ((/scien[ct]/gi).test(match)) {
                return match;
            }
            return `${p1}SHAUN${p2}`;
        }},
        {re: /cion/gi, replace: "SHAUN"},
        {re: /shan/gi, replace: "SHAUN"},
        {re: /shen/gi, replace: "SHAUN"},
        {re: /shion/gi, replace: "SHAUN"},
        {re: /sian/gi, replace: "SHAUN"},
        {re: /sion/gi, replace: "SHAUN"},
        {re: /(.*)tian/gi, replace: (match, p1, offset, string) => {
            if ((/chris$/i).test(p1)) {
                return match;
            }
            return `${p1}SHAUN`;
        }},
        {re: /tien/gi, replace: "SHAUN"},
        {re: /tion/gi, replace: "SHAUN"},
        {re: /(na)ton(al)/gi, replace: "$1SHAUN$2"},
        {re: /xion/gi, replace: "SHAUN"}
    ];
    let success = false;
    for (let re of regexes) {
        if (re.re.test(word)) {
            re.re.lastIndex = 0;
            word = word.replace(re.re, re.replace);
            success = true;
        }
    }
    if (!success) {
        console.error(`unexpected Shaun-word ${word} does not match any of:`);
        console.error(` ${regexes.map(re => re.re)}`);
        process.exit(1);
    }
    return word;
});

const CENSORED_PJW = [
    /^cock$/i,
    // there are lots of names ending with bach, it can become quite repetitive
    /bach$/i
];

const WORDS_PJW = rhymes.suffix(["AA", "K"] /* "ock" in "shock" */).map(word => {
    return word.word;
}).filter(word => {
    return !CENSORED_PJW.some(re => re.test(word));
});

exports.name = "shaun-jen";

exports.chat = function(client, channel, message, userstate) {
    if (typeof message === "undefined" || typeof userstate === "undefined") {
        return;
    }
    if (message.match(/^!jen\s*$/i)) {
        command_jen(client, channel);
    } else if (message.match(/^!shaun\s*$/i)) {
        command_shaun(client, channel);
    } else if(message.match(/^!pjw\s*$/i)) {
        command_pjw(client, channel);
    } else if(message.match(/^!pete\s*$/i)) {
        command_pete(client, channel);
    }
}

function command_jen(client, channel) {
    let word = rand(WORDS_JEN);
    client.modified_say(channel, word);
}

function command_shaun(client, channel) {
    let word = rand(WORDS_SHAUN);
    client.modified_say(channel, word);
}

function command_pjw(client, channel) {
    let word = rand(WORDS_PJW);
    client.modified_say(channel, `Imagine my ${word}`);
}

function command_pete(client, channel) {
    client.modified_say(channel, `༼ ༎ຶ ෴ ༎ຶ༽`);
}