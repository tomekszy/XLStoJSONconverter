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
            daneSpecyficzne.push(element.daneSpecyficzne[0]);
        }
    })
    elementDoZapisu = elementWyzej;
    elementDoZapisu.daneSpecyficzne = daneSpecyficzne;
    elementyDoZapisu.push(elementDoZapisu);
});

const uniqueWarehouses = Array.from(new Set(elementyDoZapisu.map(a => a.itemNumber)))
    .map(itemNumber => {
        return elementyDoZapisu.find(a => a.itemNumber === itemNumber);
    });

const warehousesOutput = uniqueWarehouses;
console.log("Liczba obiektów po redukcji", warehousesOutput.length);
warehousesSave = warehousesOutput.concat(warehousesND);
console.log("Liczba obiektów wraz z nieduplikowanymi", warehousesSave.length);
const output = JSON.stringify(json2mongo(warehousesSave));
fs.writeFileSync('sklep.json', output);


