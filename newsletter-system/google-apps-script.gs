// Google Apps Script Web App for Ojasio Newsletter
// Deploy as: Web App -> Execute as: Me -> Who has access: Anyone

const SHEET_NAME = "Ojasio Subscribers";
const OWNER_EMAIL = "hello@ojasio.com";

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Name", "Email", "Subscribe Date", "Country", "Status", "Unsubscribe Token"]);
    sheet.getRange("A1:F1").setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'subscribe') {
      return handleSubscribe(data);
    } else if (action === 'unsubscribe') {
      return handleUnsubscribe(data);
    } else {
      return createResponse(false, "Unknown action");
    }
  } catch (error) {
    return createResponse(false, error.toString());
  }
}

function handleSubscribe(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  // Check for duplicates
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] === data.email) {
      if (values[i][4] === 'Unsubscribed') {
        // Resubscribe
        sheet.getRange(i + 1, 5).setValue('Active');
        sheet.getRange(i + 1, 3).setValue(data.date);
        return createResponse(true, "Resubscribed successfully");
      }
      return createResponse(false, "Email already exists");
    }
  }
  
  // Extract Country from IP if available in apps script context, otherwise fallback
  // Google Apps Script doesn't directly expose IP natively in doPost, so we store 'Unknown' unless passed
  const country = data.country || "Unknown";
  
  sheet.appendRow([
    data.name,
    data.email,
    data.date,
    country,
    'Active',
    data.token
  ]);
  
  return createResponse(true, "Subscribed successfully");
}

function handleUnsubscribe(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  
  const token = data.token;
  if (!token) return createResponse(false, "Invalid token");
  
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][5] === token) { // Column F is index 5
      sheet.getRange(i + 1, 5).setValue('Unsubscribed');
      return createResponse(true, "Unsubscribed successfully");
    }
  }
  
  return createResponse(false, "Token not found");
}

function createResponse(success, message) {
  return ContentService.createTextOutput(JSON.stringify({
    success: success,
    message: message
  })).setMimeType(ContentService.MimeType.JSON);
}

// ---------------------------------------------------------------------------
// ADMIN TOOLS (Triggered directly from Apps Script Editor or Admin UI)
// ---------------------------------------------------------------------------

function sendArticleNotification(articleTitle, articleUrl, articleSummary, articleCategory, readTime, emailjsServiceId, emailjsTemplateId, emailjsPublicKey, emailjsPrivateKey) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const values = sheet.getDataRange().getValues();
  
  let sentCount = 0;
  let failedCount = 0;
  
  for (let i = 1; i < values.length; i++) {
    const status = values[i][4];
    if (status === 'Active') {
      const email = values[i][1];
      const name = values[i][0];
      const token = values[i][5];
      const firstName = name.split(' ')[0];
      
      // Sending via EmailJS REST API
      const payload = {
        service_id: emailjsServiceId,
        template_id: emailjsTemplateId,
        user_id: emailjsPublicKey,
        accessToken: emailjsPrivateKey,
        template_params: {
          to_email: email,
          FIRST_NAME: firstName,
          ARTICLE_TITLE: articleTitle,
          ARTICLE_URL: articleUrl,
          ARTICLE_SUMMARY: articleSummary,
          UNSUBSCRIBE_TOKEN: token
        }
      };
      
      try {
        const options = {
          'method' : 'post',
          'contentType': 'application/json',
          'payload' : JSON.stringify(payload),
          'muteHttpExceptions': true
        };
        UrlFetchApp.fetch('https://api.emailjs.com/api/v1.0/email/send', options);
        sentCount++;
      } catch (e) {
        failedCount++;
      }
    }
  }
  
  return { sent: sentCount, failed: failedCount };
}
