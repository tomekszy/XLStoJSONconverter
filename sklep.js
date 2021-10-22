const fs = require('fs');

let rawsklep = fs.readFileSync('MLG.sklep.json');
let sklep = JSON.parse(rawsklep);
let sklepOutput = []

sklep.forEach(element => {
    element.daneSpecyficzne.forEach(element2 => {
        if (!element2.cenaDetalicznaBrutto) {
            element2.vat = 23;
            element2.cenaDetalicznaBrutto = Number((element2.cenaDetalicznaNetto * (1.23)).toFixed(2));
            console.log('brak brutto ' + element2.nazwaRozmiaru)
        }
        if (!element2.cenaDetalicznaNetto) {
            element2.vat = 23;
            element2.cenaDetalicznaNetto = Number((element2.cenaDetalicznaBrutto / (1.23)).toFixed(2));
            console.log('brak netto ' + element2.nazwaRozmiaru)
        }
        if (!element2.vat) {
            element2.vat = 23;
            console.log('brak vat ' + element2.nazwaRozmiaru)
        }
    })
    sklepOutput.push(element);
});

let diff = sklep.filter(x => !sklepOutput.includes(x));
let sklepOutputToFile = sklepOutput.concat(diff);
const data = JSON.stringify(sklepOutputToFile);
console.log("Liczba obiektów w pliku wejściowym", sklep.length);
console.log("Liczba obiektów w pliku wyjściowym", sklepOutputToFile.length);
fs.writeFileSync('sklepOutput.json', data)
