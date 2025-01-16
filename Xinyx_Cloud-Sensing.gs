function updateImageLinks() {
  // Change for GitHub repository information
  var githubUsername = '**************';
  var githubRepo = '*****************';
  
 // Change for correct data from Sheets
  var spreadsheetId = '*************************';
  var sheetName = '********************';
  
  // Fetch the latest image links from GitHub
  var imageLinks = getLatestImageLinks(githubUsername, githubRepo);
  
  // Get the existing image links from Google Sheets
  var existingLinks = getExistingImageLinks(spreadsheetId, sheetName);
  
  // Update Google Sheets with the new image links
  updateGoogleSheets(spreadsheetId, sheetName, imageLinks, existingLinks);
}

function getLatestImageLinks(username, repo) {
  var apiUrl = 'https://api.github.com/repos/' + username + '/' + repo + '/contents';
  // Replace with your personal access token
  var token = '*********************************'; 

  var options = {
    method: 'GET',
    headers: {
      'Authorization': 'token ' + token,
      'User-Agent': 'My-App' 
    }
  };

  var response = UrlFetchApp.fetch(apiUrl, options);
  var data = JSON.parse(response.getContentText());

  var imageLinks = [];
  for (var i = 0; i < data.length; i++) {
    var file = data[i];
    if (file.type === 'file' && (file.path.endsWith('.jpg') || file.path.endsWith('.jpeg'))) {
      imageLinks.push(file.download_url);
    }
  }

  return imageLinks;
}

function getExistingImageLinks(spreadsheetId, sheetName) {
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  // Get the existing image links starting from cell R2
  var startRow = 2;
  var lastRow = sheet.getLastRow();
  var existingLinks = sheet.getRange(startRow, 18, lastRow - startRow + 1, 1).getValues();
  
  // Clear the existing image links
  sheet.getRange(startRow, 18, lastRow - startRow + 1, 1).clearContent();
  
  return existingLinks;
}

function updateGoogleSheets(spreadsheetId, sheetName, newImageLinks, existingLinks) {
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  // Get the existing value in cell R1
  var r1Value = sheet.getRange("R1").getValue();
  
  // Shift the existing image links down by the number of new image links
  var startRow = 2;
  var numRows = existingLinks.length;
  sheet.getRange(startRow + newImageLinks.length, 18, numRows, 1).moveTo(sheet.getRange(startRow, 18));
  
  // Write the new image links to the top rows, starting from cell R2
  var newLinksRange = sheet.getRange(startRow, 18, newImageLinks.length, 1);
  for (var i = 0; i < newImageLinks.length; i++) {
    newLinksRange.getCell(i + 1, 1).setValue(newImageLinks[i]);
  }
  
  // Restore the existing value in cell R1
  sheet.getRange("R1").setValue(r1Value);
}
