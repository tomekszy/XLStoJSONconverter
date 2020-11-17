const fs = require('fs');
xlsxj = require("xlsx-to-json");
xlsxj({
    input: "users.xlsx",
    output: "users.json"
}, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});
xlsxj({
    input: "karty.xlsx",
    output: "karty.json"
}, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});

let rawUsers = fs.readFileSync('users.json');
let users = JSON.parse(rawUsers);
let rawKarty = fs.readFileSync('karty.json');
let karty = JSON.parse(rawKarty);
let usersOutput = []

users.forEach(user => {
    karty.forEach(karta => {
        if (user.login == karta.login) {
            user.nrKarty = karta.nrKarty
            usersOutput.push(user);
        }
    });
});

let diff = users.filter(x => !usersOutput.includes(x));
let usersOutputToFile = usersOutput.concat(diff);
const data = JSON.stringify(usersOutputToFile);
fs.writeFileSync('usersOutput.json', data)
