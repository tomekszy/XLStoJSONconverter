const fs = require('fs');
xlsxj = require("xlsx-to-json");
xlsxj({
  input: "kontrahenci.xlsx",
  output: "contractorsInput.json"
}, function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});
const rawkontrahenci = fs.readFileSync('contractorsInput.json').toString();
var kontrahenci = JSON.parse(rawkontrahenci);
// .replace(/\s/g, ''));
console.log("Liczba obiektów w pliku wejściowym", kontrahenci.length);

kontrahenci.forEach(element => {
  element.contrType = 'klient';
  element.paymentDeadline = Number(element.paymentDeadline);
  element.creditLimit = Number(element.creditLimit);
  element.winnyKase = Boolean(element.winnyKase);
  element.anotherContacts = [{
    acName: element.acName1,
    acEmail: element.acEmail1,
    acPhone: element.acPhone1
  }]
  if (element.acEmail2 !== "" || element.acPhone2 !== "")
    element.anotherContacts.push({
      acName: element.acName2,
      acEmail: element.acEmail2,
      acPhone: element.acPhone2
    })
  if (element.acEmail3 !== "" || element.acPhone3 !== "")
    element.anotherContacts.push({
      acName: element.acName3,
      acEmail: element.acEmail3,
      acPhone: element.acPhone3
    })
  if (element.acEmail4 !== "" || element.acPhone4 !== "")
    element.anotherContacts.push({
      acName: element.acName4,
      acEmail: element.acEmail4,
      acPhone: element.acPhone4
    });
  element.znizkaGrupy = [];
  element.znizkaTowary = [];
  if (element.upustdocalosciprocent)
    element.znizkaGrupy.push({ nazwaGrupy: 'Całość', procentZnizki: Number(element.upustdocalosciprocent) })
  else {
    if (element.upustpucharyprocent)
      element.znizkaGrupy.push({ nazwaGrupy: 'Puchary', procentZnizki: Number(element.upustpucharyprocent) })
    if (element.upustmedaleprocent)
      element.znizkaGrupy.push({ nazwaGrupy: 'Medale', procentZnizki: Number(element.upustmedaleprocent) })
    if (element.upuststatuetkiplastikoweprocent)
      element.znizkaGrupy.push({ nazwaGrupy: 'Statuetki plastikowe', procentZnizki: Number(element.upuststatuetkiplastikoweprocent) })
    if (element.upustwstazkiprocent) {
      element.znizkaGrupy.push({ nazwaGrupy: 'Wstążki do medali 1cm', procentZnizki: Number(element.upustwstazkiprocent) })
      element.znizkaGrupy.push({ nazwaGrupy: 'Wstążki do medali 2cm', procentZnizki: Number(element.upustwstazkiprocent) })
    }
    if (element.upustodlewyprocent)
      element.znizkaGrupy.push({ nazwaGrupy: 'Odlewy', procentZnizki: Number(element.upustodlewyprocent) })
    if (element.upustetuiprocent)
      element.znizkaGrupy.push({ nazwaGrupy: 'Etui do medali', procentZnizki: Number(element.upustetuiprocent) })
  }

  if (element.blachaCenaPLN)
    element.znizkaGrupy.push({ nazwaGrupy: 'Blachy', wartoscZnizki: Number(element.blachaCenaPLN) }) //grupa towarowa
  if (element.Tgcena)
    element.znizkaTowary.push({ idTowaru: '60dee39acf63d32864fe1406', nazwaTowaru: 'Tabliczka grawerowana za centymetr', wartoscZnizki: Number(element.Tgcena) }) //tabl grawerowana
  if (element.LAK36mmcena)
    element.znizkaTowary.push({ idTowaru: '60dee36bcf63d32864fe1405', nazwaTowaru: 'nadruk medal 3,6cm', wartoscZnizki: Number(element.LAK36mmcena) }) //nadruk
  if (element.wstazkaV2cena)
    element.znizkaGrupy.push({ nazwaGrupy: 'Wstążki do medali 2cm', wartoscZnizki: Number(element.wstazkaV2cena) }) //wstążki 2cm - grupa tow
  if (element.wstazkaV8cena)
    element.znizkaGrupy.push({ nazwaGrupy: 'Wstążki do medali 1cm', wartoscZnizki: Number(element.wstazkaV8cena) }) //wstążki 1cm - grupa tow

  delete element.upustdocalosciprocent;
  delete element.upustpucharyprocent;
  delete element.upustmedaleprocent;
  delete element.upuststatuetkiplastikoweprocent;
  delete element.upustwstazkiprocent;
  delete element.upustodlewyprocent;
  delete element.upustetuiprocent;
  delete element.blachaCenaPLN;
  delete element.Tgcena;
  delete element.LAK36mmcena;
  delete element.wstazkaV2cena;
  delete element.wstazkaV8cena;
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
fs.writeFileSync('contractors.json', output);
