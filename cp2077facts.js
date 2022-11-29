const fs = require('fs');

// let keyName = 'FactName'
let keyName = 'Key'
let inputFileName = 'cp2077facts-1471'
let rawfile = fs.readFileSync(inputFileName + '.json');
let parse = JSON.parse(rawfile);
let outputJson = []
let outputTxt = []

parse.forEach(element => {
    if (
        element[keyName].includes('sq012') ||
        element[keyName].includes('sq021') ||
        element[keyName].includes('river') ||
        element[keyName].includes('randy')
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
fs.writeFileSync(inputFileName + '.output.json', data)
fs.writeFileSync(inputFileName + '.output.txt', data2)
