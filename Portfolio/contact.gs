// Google Apps Script code to handle form submissions
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  try {
    // Log the incoming data
    Logger.log('Received postData: ' + e.postData.contents);
    
    // Parse the JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Log the parsed data
    Logger.log('Name: ' + data.name);
    Logger.log('Email: ' + data.email);
    Logger.log('Subject: ' + data.subject);
    Logger.log('Message: ' + data.message);
    
    // Add row to sheet
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.subject,
      data.message
    ]);
    
    // Return success response
    return ContentService.createTextOutput(
      '{status:"success",message:"Data added successfully"}'
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Log the error
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(
      '{status:"error",message:"' + error.toString() + '"}'
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to set up the sheet headers
function setup() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Clear the sheet first
    sheet.clear();
    
    // Set up headers
    sheet.getRange('A1:E1').setValues([
      ['Timestamp', 'Name', 'Email', 'Subject', 'Message']
    ]);
    
    // Format headers
    var headers = sheet.getRange('A1:E1');
    headers.setFontWeight('bold');
    headers.setBackground('#f3f3f3');
    
    // Set column widths
    sheet.setColumnWidth(1, 150);  // Timestamp
    sheet.setColumnWidth(2, 100);  // Name
    sheet.setColumnWidth(3, 150);  // Email
    sheet.setColumnWidth(4, 150);  // Subject
    sheet.setColumnWidth(5, 400);  // Message
    
    // Freeze the header row
    sheet.setFrozenRows(1);
    
    return 'Setup completed successfully';
  } catch(error) {
    return 'Setup failed: ' + error.toString();
  }
}

// Test function to verify the script is working
function doGet() {
  return ContentService.createTextOutput('Script is running properly');
}
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      var response = {
        'status': 'error',
        'message': 'Missing required fields'
      };
      return ContentService.createTextOutput(response.toString())
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add data to sheet
    var rowData = [
      new Date(), // Timestamp
      data.name,
      data.email,
      data.subject,
      data.message
    ];
    sheet.appendRow(rowData);
    
    // Set column widths for better readability
    sheet.setColumnWidth(1, 150); // Timestamp
    sheet.setColumnWidth(2, 100); // Name
    sheet.setColumnWidth(3, 150); // Email
    sheet.setColumnWidth(4, 150); // Subject
    sheet.setColumnWidth(5, 400); // Message
    
    var response = {
      'status': 'success',
      'message': 'Data added successfully'
    };
    return ContentService.createTextOutput(response.toString())
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    var response = {
      'status': 'error',
      'message': 'Server error: ' + err.toString()
    };
    return ContentService.createTextOutput(response.toString())
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to set up the sheet headers
function setup() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Set headers
    var headers = [['Timestamp', 'Name', 'Email', 'Subject', 'Message']];
    sheet.getRange(1, 1, 1, 5).setValues(headers);
    
    // Format headers
    var headerRange = sheet.getRange(1, 1, 1, 5);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#f3f3f3');
    
    // Freeze the header row
    sheet.setFrozenRows(1);
    
    // Set column widths
    sheet.setColumnWidth(1, 150); // Timestamp
    sheet.setColumnWidth(2, 100); // Name
    sheet.setColumnWidth(3, 150); // Email
    sheet.setColumnWidth(4, 150); // Subject
    sheet.setColumnWidth(5, 400); // Message
    
    return 'Sheet setup completed successfully';
  } catch (err) {
    return 'Error setting up sheet: ' + err.toString();
  }
}
