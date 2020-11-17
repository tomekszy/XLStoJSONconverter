const fs = require('fs');

let rawstatuetki = fs.readFileSync('statuetki.json');
let statuetki = JSON.parse(rawstatuetki);
let statuetkiOutput = []

statuetki.forEach(element => {
    element.liczba = Number(element.liczba)
    element.wartosc = Number(element.wartosc)
    element.cenaZakupuNetto = Number(element.cenaZakupuNetto)
    element.cenaDetalicznaBrutto = Number(element.cenaDetalicznaBrutto)
    element.vat = Number(element.vat)
    element.wysokosc = Number(element.wysokosc)
    element.cenaExportEuro = Number(element.cenaExportEuro)
    statuetkiOutput.push(element);
});

let diff = statuetki.filter(x => !statuetkiOutput.includes(x));
let statuetkiOutputToFile = statuetkiOutput.concat(diff);
const data = JSON.stringify(statuetkiOutputToFile);
console.log("Liczba obiektów w pliku wejściowym", statuetki.length);
console.log("Liczba obiektów w pliku wyjściowym", statuetkiOutputToFile.length);
fs.writeFileSync('statuetkiOutput.json', data)
