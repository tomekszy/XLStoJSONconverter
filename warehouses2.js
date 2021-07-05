const fs = require('fs');
var json2mongo = require('json2mongo');

const rawwarehouseDup = fs.readFileSync('warehousesDuplicates.json');
const rawwarehouseNonDup = fs.readFileSync('warehousesNonDuplicates.json');
const warehouses = JSON.parse(rawwarehouseDup);
const warehousesND = JSON.parse(rawwarehouseNonDup);
console.log("Liczba obiektów w pliku wejściowym", warehouses.length);
const elementyDoZapisu = [];

warehouses.forEach(elementWyzej => {
    let daneSpecyficzne = [];
    let elementDoZapisu = {};

    warehouses.forEach(element => {
        if (element.itemNumber == elementWyzej.itemNumber) {
            if (elementWyzej.wstazka1cm && element.daneSpecyficzne[0].nazwaRozmiaru.includes('1cm'))
                daneSpecyficzne.push(element.daneSpecyficzne[0])
            if (elementWyzej.wstazka2cm && element.daneSpecyficzne[0].nazwaRozmiaru.includes('2cm'))
                daneSpecyficzne.push(element.daneSpecyficzne[0])
            if (!elementWyzej.wstazka1cm && !elementWyzej.wstazka2cm)
                daneSpecyficzne.push(element.daneSpecyficzne[0]);
        }
    })
    elementDoZapisu = elementWyzej;
    elementDoZapisu.daneSpecyficzne = daneSpecyficzne;
    elementyDoZapisu.push(elementDoZapisu);
});

const uniqueWarehouses = Array
    .from(new Set(elementyDoZapisu
        .map(a => a.itemNumber)))
    .map(itemNumber => {
        return elementyDoZapisu.find(a =>
            a.itemNumber === itemNumber
        );
    });

// const uniqueWarehouses = elementyDoZapisu;
const warehousesOutput = uniqueWarehouses;

console.log("Liczba obiektów po redukcji", warehousesOutput.length);
warehousesSave = warehousesOutput.concat(warehousesND);
warehousesSave.forEach(element => {
    delete element.wstazka1cm;
    delete element.wstazka2cm;
});
console.log("Liczba obiektów wraz z nieduplikowanymi", warehousesSave.length);
const output = JSON.stringify(json2mongo(warehousesSave));
fs.writeFileSync('sklep.json', output);


