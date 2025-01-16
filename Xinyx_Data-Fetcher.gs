// Change for correct data from Sheets
var ss = SpreadsheetApp.openById('********************************');
var sheet = ss.getSheetByName('*************************');

function doGet(e) {

  var dateTime = new Date();
  var date = Utilities.formatDate(dateTime, Session.getScriptTimeZone(), "MM/dd/yyyy");
  var time = Utilities.formatDate(dateTime, Session.getScriptTimeZone(), "HH:mm:ss");
  var temp = Number(e.parameters.temp);
  var hum = Number(e.parameters.hum);
  var pres = Number(e.parameters.pres);
  var gas = Number(e.parameters.gas);
  var windSpeed= Number(e.parameters.windSpeed);
  var drctn = Number(e.parameters.drctn);
  var rain = Number(e.parameters.rainValue);
  var mq4 = Number(e.parameters.mq4);
  var mq6 = Number(e.parameters.mq6);
  var mq8 = Number(e.parameters.mq8);
  var mq136 = Number(e.parameters.mq136);
  var co = Number(e.parameters.co);
  var nh3 = Number(e.parameters.nh3);
  var no2 = Number(e.parameters.no2);
  var vIN = Number(e.parameters.vIN)

  var c_mq6 = (mq6/100);
  var c_mq136 = (mq136/200);
  var c_nh3 = (nh3/1000);
  var c_no2 = (no2/1000);
  var c_rain;
    if (rain >= 0 && rain <= 3500) {
      c_rain = "DRY";
    } else if (rain > 3500 && rain <= 4095) {
      c_rain = "DRY";
    } else {
      c_rain = "DRY"; // If the rain value is outside the range, it defaults to "DRY"
    }
  var c_gas = (gas/700);
  var c_mq4 = (mq4/500);
  var c_mq8 = (mq8/1000);
  var c_co = (co/500);
  c_drctn = "North";

  sheet.insertRows(2);

  // Insert date, time, temperature, humidity, bulb values, and motor speed value
  sheet.getRange("A2").setValue(date);
  sheet.getRange("B2").setValue(time);
  sheet.getRange("C2").setValue(windSpeed);
  sheet.getRange("D2").setValue(c_drctn);
  sheet.getRange("E2").setValue(c_rain);
  sheet.getRange("F2").setValue(temp);
  sheet.getRange("G2").setValue(hum);
  sheet.getRange("H2").setValue(pres);
  sheet.getRange("I2").setValue(c_gas);
  sheet.getRange("J2").setValue(c_mq4);
  sheet.getRange("K2").setValue(c_mq6);
  sheet.getRange("L2").setValue(c_mq8);
  sheet.getRange("M2").setValue(c_mq136);
  sheet.getRange("N2").setValue(c_co);
  sheet.getRange("O2").setValue(c_nh3);
  sheet.getRange("P2").setValue(c_no2);
  sheet.getRange("Q2").setValue(vIN);

  sheet.getRange("T3:AJ3").clearContent();
 
  sheet.getRange("T2").setValue(date);
  sheet.getRange("U2").setValue(time);
  sheet.getRange("V2").setValue(windSpeed);
  sheet.getRange("W2").setValue(c_drctn);
  sheet.getRange("X2").setValue(c_rain);
  sheet.getRange("Y2").setValue(temp);
  sheet.getRange("Z2").setValue(hum);
  sheet.getRange("AA2").setValue(pres);
  sheet.getRange("AB2").setValue(c_gas);
  sheet.getRange("AC2").setValue(c_mq4);
  sheet.getRange("AD2").setValue(c_mq6);
  sheet.getRange("AE2").setValue(c_mq8);
  sheet.getRange("AF2").setValue(c_mq136);
  sheet.getRange("AG2").setValue(c_co);
  sheet.getRange("AH2").setValue(c_nh3);
  sheet.getRange("AI2").setValue(c_no2);
  sheet.getRange("AJ2").setValue(vIN);
  sheet.getRange("AM2").setValue(rainValue);

  var columnRange = sheet.getRange("AL2:AL5");
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

  return ContentService.createTextOutput("Data are updated in Google Sheet");
}