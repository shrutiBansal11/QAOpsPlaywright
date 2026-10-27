const { test, expect } = require('@playwright/test')
const ExcelJs = require('exceljs')

async function writeExcel(currentValue, filePath, newValue) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);// File path 
    const worksheet = await workbook.getWorksheet('Sheet1'); //fetch sheet by name
    const output = await readExcel(worksheet, currentValue);
    const cell = await worksheet.getCell(output.row, output.column);
    cell.value = newValue;
    await workbook.xlsx.writeFile(filePath);

}




async function readExcel(worksheet, currentValue) {
    let output = {
        row: -1, column: -1

    };

    await worksheet.eachRow(function (row, rowNumber) //Iterate over all rows that have values in worksheet
    {
        row.eachCell(function (cell, colNumber)//Iterate over all non-null cells
        {
            if (cell.value === currentValue) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })

    })

    return output;




}
module.exports = { writeExcel, readExcel };

