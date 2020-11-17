const fs = require('fs');
xlsxj = require("xlsx-to-json");
xlsxj({
    input: "podwyzszenia.xlsx",
    output: "podwyzszenia.json"
}, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        // console.log(result);
    }
});

let rawPodwyzszenia = fs.readFileSync('podwyzszenia.json');
let podwyzszenia = JSON.parse(rawPodwyzszenia);
let podwyzszeniaOutput = []

podwyzszenia.forEach(element => {
    element.liczba = Number(element.liczba)
    element.wartosc = Number(element.wartosc)
    element.cenaZakupuNetto = Number(element.cenaZakupuNetto)
    element.cenaZakupuBrutto = Number(element.cenaZakupuBrutto)
    element.vat = Number(element.vat)
    element.wysokosc = Number(element.wysokosc)
    element.cenaExportEuro = Number(element.cenaExportEuro)
    podwyzszeniaOutput.push(element);
});

let diff = podwyzszenia.filter(x => !podwyzszeniaOutput.includes(x));
let podwyzszeniaOutputToFile = podwyzszeniaOutput.concat(diff);
const data = JSON.stringify(podwyzszeniaOutputToFile);
console.log("Liczba obiektów w pliku wejściowym", podwyzszenia.length);
console.log("Liczba obiektów w pliku wyjściowym", podwyzszeniaOutputToFile.length);
fs.writeFileSync('podwyzszeniaOutput.json', data)
