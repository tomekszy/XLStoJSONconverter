const fs = require('fs');

const rawwarehouses = fs.readFileSync('warehouses.json');
const warehouses = JSON.parse(rawwarehouses);
console.log("Liczba obiektów w pliku wejściowym", warehouses.length);
const rodzajeTowaru = [];
const jednostki = [];

warehouses.forEach(element => {
    rodzajeTowaru.push(element.rodzajTowaru);
    jednostki.push(element.jednostka);

    if (element.rodzajTowaru == 'Puchary' || 'Wstążki do medali') {
        if (element.rodzajTowaru == 'Wstążki do medali') {
            if (element.fullName.includes('1cm'))
                element.rodzajTowaru = 'Wstążki do medali 1cm'
            if (element.fullName.includes('2cm'))
                element.rodzajTowaru = 'Wstążki do medali 2cm'
        }
        element.itemNumber1 = element.itemNumber.split('/')[0];
        element.itemNumber2 = element.itemNumber.split('/')[1];
        if (element.fullName.includes('/')) {
            element.fullName = element.fullName.split('/')[0] + ' ' + element.fullName.split('/')[1].split(' ')[1];
        }
        if (element.fullName.includes('cm')) {
            element.fullName = element.fullName.replace(/\d{1,2}cm/, '');
        }
        if (element.fullName.includes('mm')) {
            element.fullName = element.fullName.replace(/\d{1,2}mm/, '');
        }
        element.daneSpecyficzne = [{
            nazwaRozmiaru: element.itemNumber,
            kolor: element.kolor,
            size: element.size,
            wysokosc: element.wysokosc,
            szerokosc: element.szerokosc,
            dlugosc: element.dlugosc,
            cenaDetalicznaNetto: element.cenaDetalicznaNetto,
            cenaDetalicznaBrutto: element.cenaDetalicznaBrutto,
            cenaExportEuro: element.cenaExportEuro,
            liczba: element.liczba,
            wartoscWmagazynieNetto: element.wartoscWmagazynieNetto,
            cenaZakupuNetto: element.cenaZakupuNetto,
            cenaDetalicznaWaluta: element.cenaDetalicznaWaluta,
            vat: element.vat,
            jednostka: element.jednostka,
            towarOpis: element.towarOpis,
            comments: element.comments,
            jednostkaWymiaru: element.jednostkaWymiaru
        }];
    }
    element.idMagazynu = element._id;
    element.itemNumber = element.itemNumber1;
    delete element._id;
    delete element.itemNumber1;
    delete element.itemNumber2;
    delete element.kolor;
    delete element.size;
    delete element.wysokosc;
    delete element.szerokosc;
    delete element.dlugosc;
    delete element.cenaDetalicznaNetto;
    delete element.cenaDetalicznaBrutto;
    delete element.cenaExportEuro;
    delete element.liczba;
    delete element.wartoscWmagazynieNetto;
    delete element.cenaZakupuNetto;
    delete element.cenaDetalicznaWaluta;
    delete element.vat;
    delete element.jednostka;
    delete element.towarOpis;
    delete element.comments;
    delete element.jednostkaWymiaru;
});

const lookup = warehouses.reduce((a, e) => {
    a[e.itemNumber] = ++a[e.itemNumber] || 0;
    return a;
}, {});
const arrToSave = warehouses.filter(e => lookup[e.itemNumber]);

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
    removeByAttr(warehouses, 'itemNumber', element.itemNumber);
});

const rodzajeTowaruUnique = [...new Set(rodzajeTowaru)];
const jednostkiUnique = [...new Set(jednostki)];
console.log("Rodzaje towaru: ", rodzajeTowaruUnique);
console.log("Jednostki: ", jednostkiUnique);
console.log("Liczba obiektów niezduplikowanych", warehouses.length);
console.log("Liczba obiektów zduplikowanych", arrToSave.length);
const duplicates = JSON.stringify(arrToSave);
fs.writeFileSync('warehousesDuplicates.json', duplicates);
const nonDuplicates = JSON.stringify(warehouses);
fs.writeFileSync('warehousesNonDuplicates.json', nonDuplicates);
