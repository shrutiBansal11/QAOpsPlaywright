const { test, expect } = require('@playwright/test')
const ExcelJs = require('exceljs')
//to change color of product Apple to Pink

async function writeExcel(searchText, filePath, replaceText, changeCell) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);// File path 
    const worksheet = await workbook.getWorksheet('Sheet1'); //fetch sheet by name
    const output = await readExcel(worksheet, searchText);
    const cell = await worksheet.getCell(output.row, output.column+changeCell.columnChange); //changeCell is the delta value which is to be changed in excel file. It is optional parameter. If not provided then it will search for the cell value in excel file and change it to new value.
    // console.log(output.row);
    // console.log(output.column+2);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);

}
async function readExcel(worksheet, searchText) {
    let output = {
        row: 0, column: 0

    };

    await worksheet.eachRow(function (row, rowNumber) //Iterate over all rows that have values in worksheet
    {
        row.eachCell(function (cell, colNumber)//Iterate over all non-null cells
        {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })

    })

    return output;

}
writeExcel("Apple", "/Users/shrutibansal/Downloads/downloadTest.xlsx", "Pink", {rowChange: 0, columnChange: 1 });
//{row: 1, column: 2 }  is the delta cell value which is to be changed in excel file. It is optional parameter. If not provided then it will search for the cell value in excel file and change it to new value.
