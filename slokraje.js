const fs = require('fs');
xlsxj = require("xlsx-to-json");
xlsxj({
    input: "slokraje.xlsx",
    output: "slokraje.json"
}, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});
let rawInput = fs.readFileSync('slokraje.json');
let input = JSON.parse(rawInput);
let inputOutput = []

input.forEach(element => {
    element.Popularnosc = Number(element.Popularnosc)
    element.sloKrajeId = Number(element.sloKrajeId)
    element.Uwagi = null
    inputOutput.push(element);
});

let diff = input.filter(x => !inputOutput.includes(x));
let inputOutputToFile = inputOutput.concat(diff);
const data = JSON.stringify(inputOutputToFile);
console.log("Liczba obiektów w pliku wejściowym", input.length);
console.log("Liczba obiektów w pliku wyjściowym", inputOutputToFile.length);
fs.writeFileSync('slokrajeOut.json', data)
