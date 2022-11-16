const fs = require('fs');

let rawfile = fs.readFileSync('cp2077facts.json');
let parse = JSON.parse(rawfile);
let outputJson = []
let outputTxt = []

parse.forEach(element => {
    if (
        element['Key'].includes('sq012') ||
        element['Key'].includes('sq021') ||
        element['Key'].includes('river') ||
        element['Key'].includes('randy')
    ) {
        outputJson.push(element);
    }
});

outputJson.forEach(element => {
    outputTxt.push(`\n${element.Key}: ${element.Value}`)
})

const data = JSON.stringify(outputJson);
const data2 = outputTxt.toString()
console.log("Liczba obiektów w pliku wejściowym", parse.length);
console.log("Liczba obiektów w pliku wyjściowym", outputJson.length);
fs.writeFileSync('cp2077facts.output.json', data)
fs.writeFileSync('cp2077facts.output.txt', data2)
