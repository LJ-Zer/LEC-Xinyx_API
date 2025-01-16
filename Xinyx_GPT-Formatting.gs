// Change for correct data from Sheets
var ss = SpreadsheetApp.openById('***********************');
var sheet = ss.getSheetByName('*********************');

function doGet(e) {

  var columnRange = sheet.getRange("AL2:AL100");
  columnRange.clearContent();

  var formula1 = '="The time right now in Muntinlupa City is " & TEXT(U22, "HH:mm:ss") & CHAR(10) & ' +
                '"The current temperature is " & TEXT(Y22, "0.0") & "°C" & CHAR(10) & ' +
                '"The humidity is " & TEXT(Z22, "0.0") & "%" & CHAR(10) & ' +
                '"Give me insights on what to the people expected if they go here. Limit in 50 words."';
  
  var formula2 = '="The time right now in Muntinlupa City is " & TEXT(U30, "HH:mm:ss") & CHAR(10) & ' +
              '"The following are the current levels of gases in parts per million (ppm): " & CHAR(10) & ' +
              '"For VOCs: " & TEXT(AB30, "0") & ", " & ' +
              '"For Methane: " & TEXT(AC30, "0") & ", " & ' +
              '"For LPG Gases: " & TEXT(AD30, "0") & ", " & ' +
              '"For Hydrogen: " & TEXT(AE30, "0") & ", " & ' +
              '"For Sulfur: " & TEXT(AF30, "0") & ", " & ' +
              '"For Carbon Monoxide: " & TEXT(AG30, "0") & ", " & ' +
              '"For Ammonia: " & TEXT(AH30, "0") & ", " & ' +
              '"For Nitrogen Dioxide: " & TEXT(AI30, "0") & CHAR(10) & ' +
              '"Give insights on what people can expect if they go here. Limit to 50 words."';
 
  sheet.getRange("AL2").setFormula(formula1);
  sheet.getRange("AL3").setFormula(formula2);

  var columnRange2 = sheet.getRange("AK2:AK100");
  columnRange2.clearContent();
  
  var formula3 = '=GPT(AL2)';
  var formula4 = '=GPT(AL3)';

  sheet.getRange("AK2").setFormula(formula3);
  sheet.getRange("AK3").setFormula(formula4);

}