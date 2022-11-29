const fs = require('fs');

const facts1FileName = 'cp2077factsNexus'
const facts2FileName = 'cp2077facts-1474'

const facts1file = fs.readFileSync(facts1FileName + '.json');
const facts2file = fs.readFileSync(facts2FileName + '.json');
const facts1 = JSON.parse(facts1file);
const facts2 = JSON.parse(facts2file);
console.log("Liczba obiektów w pliku 1", facts1.length);
console.log("Liczba obiektów w pliku 2", facts2.length);
let keyName = 'Key'
let valName = 'Value'
let diff = []

facts1.forEach(fact1 => {
    facts2.forEach(fact2 => {
        if (fact1[keyName] === fact2[keyName]) {
            let factDiff = {
                [keyName]: fact1[keyName],
                Value1: fact1[valName],
                Value2: fact2[valName],
            }
            if (factDiff.Value1 !== factDiff.Value2) {
                diff.push(factDiff)
            }
        }
    })
});

const data = JSON.stringify(diff);
console.log("Liczba obiektów w pliku wyjściowym", diff.length);
fs.writeFileSync(facts1FileName + '_' + facts2FileName + '_diff.json', data)



