var cmu_dict = require("cmu-pronouncing-dictionary");

var words_added = new Set();

var cmu_words = [];
Object.keys(cmu_dict).forEach(key => {
    // convert key from database representation to human-readable word
    let word = key.split("(")[0].replace("_", " ");
    // skip words with undesired characters (the database contains no accented
    // characters (é, ï, etc) so we need not account for that)
    const re = /^[-A-Za-z ]+$/;
    if (!re.test(word)) {
        return;
    }
    // no duplicates
    if (words_added.has(word)) {
        return;
    }
    words_added.add(word);
    // remove any trailing digit, indicating the stress, from each phone
    let phones = cmu_dict[key].split(" ").map(phone => phone.split(/\d/)[0]);
    cmu_words.push({word, phones});
});

exports.suffix = function(suffix) {
    return cmu_words.filter(word => {
        let phones = word.phones;
        if (phones.length < suffix.length) {
            return false;
        }
        for (let i = 1; i <= suffix.length; i++) {
            if (phones[phones.length - i] !== suffix[suffix.length - i]) {
                return false;
            }
        }
        return true;
    });
}

exports.infix = function(infix) {
    return cmu_words.filter(word => {
        let phones = word.phones;
        if (phones.length < infix.length) {
            return false;
        }
        outer_loop:
        for (let i = 0; i <= phones.length - infix.length; i++) {
            for (let j = 0; j < infix.length; j++) {
                if (phones[i + j] !== infix[j]) {
                    continue outer_loop;
                }
            }
            return true;
        }
        return false;
    });
}