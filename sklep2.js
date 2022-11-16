const fs = require('fs');
var ObjectID = require("bson-objectid");

let rawsklep = fs.readFileSync('MLGDEV.sklep.json');
let sklep = JSON.parse(rawsklep);
let sklepOutput = []

sklep.forEach(element => {
    element.towarOpis = element.daneSpecyficzne[0].towarOpis;
    element.daneSpecyficzne.forEach(danaSpecyficzna => {
        danaSpecyficzna._id = { $oid: ObjectID() };
        danaSpecyficzna.towarOpis = null;
        danaSpecyficzna.countInStock = 100;
        danaSpecyficzna.waluta = 'PLN';
    });
});

let diff = sklep.filter(x => !sklepOutput.includes(x));
let sklepOutputToFile = sklepOutput.concat(diff);
const data = JSON.stringify(sklepOutputToFile);
console.log("Liczba obiektów w pliku wejściowym", sklep.length);
console.log("Liczba obiektów w pliku wyjściowym", sklepOutputToFile.length);
fs.writeFileSync('sklep2Output.json', data)
