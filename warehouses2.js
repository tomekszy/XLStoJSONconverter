const fs = require('fs');
var json2mongo = require('json2mongo');

let rawwarehouseDup = fs.readFileSync('warehousesDuplicates.json');
let rawwarehouseNonDup = fs.readFileSync('warehousesNonDuplicates.json');
let warehouses = JSON.parse(rawwarehouseDup);
let warehousesND = JSON.parse(rawwarehouseNonDup);
console.log("Liczba obiektów w pliku wejściowym", warehouses.length);
let elementyDoZapisu = [];

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
        return elementyDoZapisu.find(a => a.itemNumber === itemNumber)
    })

let warehousesOutput = uniqueWarehouses
console.log("Liczba obiektów po redukcji", warehousesOutput.length);
warehousesSave = warehousesOutput.concat(warehousesND);
console.log("Liczba obiektów wraz z nieduplikowanymi", warehousesSave.length);
const output = JSON.stringify(json2mongo(warehousesSave));
fs.writeFileSync('warehousesOutput.json', output)


