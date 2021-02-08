const fs = require('fs');
xlsxj = require("xlsx-to-json");
xlsxj({
    input: "slokraje.xlsx",
    output: "slokraje.json"
}, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});
