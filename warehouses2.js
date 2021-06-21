const fs = require('fs');

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

// var obj = {};

// for (var i = 0, len = elementyDoZapisu.length; i < len; i++)
//     obj[elementyDoZapisu[i]['itemNumber']] = elementyDoZapisu[i];

// elementyDoZapisu = new Array();
// for (var key in obj)
//     elementyDoZapisu.push(obj);

// console.log(obj);
// let warehousesOutput = obj;

const uniqueWarehouses = Array.from(new Set(elementyDoZapisu.map(a => a.itemNumber)))
    .map(itemNumber => {
        return elementyDoZapisu.find(a => a.itemNumber === itemNumber)
    })

let warehousesOutput = uniqueWarehouses
console.log("Liczba obiektów po redukcji", warehousesOutput.length);
warehousesSave = warehousesOutput.concat(warehousesND);
console.log("Liczba obiektów wraz z nieduplikowanymi", warehousesSave.length);
const output = JSON.stringify(warehousesSave);
fs.writeFileSync('warehousesOutput.json', output)


