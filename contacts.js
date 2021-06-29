const fs = require('fs');
xlsxj = require("xlsx-to-json");
xlsxj({
    input: "kontrahenci.xlsx",
    output: "kontrahenciInput.json"
}, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});
const rawkontrahenci = fs.readFileSync('kontrahenciInput.json');
const kontrahenci = JSON.parse(rawkontrahenci);
console.log("Liczba obiektów w pliku wejściowym", kontrahenci.length);

kontrahenci.forEach(element => {
    element.anotherContacts = [{
        acName: element.acName1,
        acEmail: element.acEmail1,
        acPhone: element.acPhone1
    },
    {
        acName: element.acName2,
        acEmail: element.acEmail2,
        acPhone: element.acPhone2
    },
    {
        acName: element.acName3,
        acEmail: element.acEmail3,
        acPhone: element.acPhone3
    },
    {
        acName: element.acName4,
        acEmail: element.acEmail4,
        acPhone: element.acPhone4
    }];
    element.znizkaGrupy = [
        { nazwaGrupy: 'Puchary', procentZnizki: element.upustpucharyprocent },
        { nazwaGrupy: 'Medale', procentZnizki: element.upustmedaleprocent },
    ];
    delete element.upustpucharyprocent;
    delete element.upustmedaleprocent;
    delete element.acName1;
    delete element.acEmail1;
    delete element.acPhone1;
    delete element.acName2;
    delete element.acEmail2;
    delete element.acPhone2;
    delete element.acName3;
    delete element.acEmail3;
    delete element.acPhone3;
    delete element.acName4;
    delete element.acEmail4;
    delete element.acPhone4;
});

console.log("Liczba obiektów", kontrahenci.length);
const output = JSON.stringify(kontrahenci);
fs.writeFileSync('kontrahenciOutput.json', output);
