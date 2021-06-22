const fs = require('fs');

let rawwarehouses = fs.readFileSync('warehouses.json');
let warehouses = JSON.parse(rawwarehouses);
console.log("Liczba obiektów w pliku wejściowym", warehouses.length);

warehouses.forEach(element => {
    if (element.rodzajTowaru == 'Puchary') {
        element.itemNumberDiv = element.itemNumber.split('/')
        element.itemNumber = element.itemNumberDiv[0];
        element.itemNumber2 = element.itemNumberDiv[1];
        delete element.itemNumberDiv;
    }
})

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

arrToSave.forEach((element, index) => {
    // element.itemNumber = element.itemNumber + '/' + element.itemNumber2;
    element.daneSpecyficzne = [{
        nazwaModelu: element.itemNumber2,
        kolor: element.kolor,
        size: element.size,
        wysokosc: element.wysokosc,
        szerokosc: element.szerokosc,
        dlugosc: element.dlugosc,
        cenaDetalicznaNetto: element.cenaDetalicznaNetto,
        cenaDetalicznaBrutto: element.cenaDetalicznaBrutto,
    }];
    // delete element._id
    delete element.itemNumber2;
    delete element.kolor;
    delete element.size;
    delete element.wysokosc;
    delete element.szerokosc;
    delete element.dlugosc;
    delete element.cenaDetalicznaNetto;
    delete element.cenaDetalicznaBrutto;
});

console.log("Liczba obiektów niezduplikowanych", warehouses.length);
console.log("Liczba obiektów zduplikowanych", arrToSave.length);
const duplicates = JSON.stringify(arrToSave);
fs.writeFileSync('warehousesDuplicates.json', duplicates)
const nonDuplicates = JSON.stringify(warehouses);
fs.writeFileSync('warehousesNonDuplicates.json', nonDuplicates)
