const fs = require('fs');

let rawwarehouses = fs.readFileSync('warehouses.json');
let warehouses = JSON.parse(rawwarehouses);
let warehousesOutput = []
console.log("Liczba obiektów w pliku wejściowym", warehouses.length);
const lookup = warehouses.reduce((a, e) => {
    a[e.itemNumber] = ++a[e.itemNumber] || 0;
    return a;
}, {});
const arrToSave = warehouses.filter(e => lookup[e.itemNumber])

var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {
            arr.splice(i, 1);
        }
    }
    return arr;
}

arrToSave.forEach(element => {
    removeByAttr(warehouses, 'itemNumber', element.itemNumber)
});

arrToSave.forEach(element => {
    element.daneSpecyficzne = [{
        kolor: element.kolor,
        size: element.size,
        wysokosc: element.wysokosc,
        szerokosc: element.szerokosc,
        dlugosc: element.dlugosc,
        cenaDetalicznaNetto: element.cenaDetalicznaNetto,
        cenaDetalicznaBrutto: element.cenaDetalicznaBrutto,
    }];
    delete element.kolor;
    delete element.size;
    delete element.wysokosc;
    delete element.szerokosc;
    delete element.dlugosc;
    delete element.cenaDetalicznaNetto;
    delete element.cenaDetalicznaBrutto;
});

var sorted = {};
for (var i = 0, max = arrToSave.length; i < max; i++) {
    if (sorted[arrToSave[i].itemNumber] == undefined) {
        sorted[arrToSave[i].itemNumber] = [];
    }
    sorted[arrToSave[i].itemNumber].push(arrToSave[i]);
}

for (const key in sorted) {
    console.log(key, sorted[key].length);
    // tu zrobić, żeby tablica się redukowała
}

console.log("Liczba obiektów niezduplikowanych", warehouses.length);
console.log("Liczba obiektów zduplikowanych", arrToSave.length);
const duplicates = JSON.stringify(arrToSave);
fs.writeFileSync('warehousesDuplicates.json', duplicates)
const nonDuplicates = JSON.stringify(warehouses);
fs.writeFileSync('warehousesNonDuplicates.json', nonDuplicates)
