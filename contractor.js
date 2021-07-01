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
    if (element.upustwstazkiprocent)
      element.znizkaGrupy.push({ nazwaGrupy: 'Wstążki', procentZnizki: Number(element.upustwstazkiprocent) })
    if (element.upustodlewyprocent)
      element.znizkaGrupy.push({ nazwaGrupy: 'Odlewy', procentZnizki: Number(element.upustodlewyprocent) })
    if (element.upustetuiprocent)
      element.znizkaGrupy.push({ nazwaGrupy: 'Etui', procentZnizki: Number(element.upustetuiprocent) })
  }

  if (element.blachaCenaPLN)
    element.znizkaTowary.push({ idTowaru: 'idblachaCenaPLN', nazwaTowaru: 'nazwa blachy netto', wartoscZnizki: Number(element.blachaCenaPLN) })
  if (element.Tgcena)
    element.znizkaTowary.push({ idTowaru: 'idTgcena', nazwaTowaru: 'nazwa tabliczki grawerowanej za centymetr', wartoscZnizki: Number(element.Tgcena) })
  if (element.LAK36mmcena)
    element.znizkaTowary.push({ idTowaru: 'idLAK36mmcena', nazwaTowaru: 'nazwa LAK 36 mm', wartoscZnizki: Number(element.LAK36mmcena) })

  if (element.wstazkaV2cena)
    element.znizkaTowary.push({ idTowaru: 'idWstazkiV2', nazwaTowaru: 'nazwa wstążki V2', wartoscZnizki: Number(element.wstazkaV2cena) })
  if (element.wstazkaV8cena)
    element.znizkaTowary.push({ idTowaru: 'idWstazkiV8', nazwaTowaru: 'nazwa wstążki V8', wartoscZnizki: Number(element.wstazkaV8cena) })

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
