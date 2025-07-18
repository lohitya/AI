function summarizeFeedback() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formSheet = ss.getSheetByName('Feedback_responses'); 

  if (!formSheet) {
    Logger.log("ERROR: Sheet 'Feedback_responses' does not exist.");
    return;
  }

  const data = formSheet.getDataRange().getValues();
  if (data.length < 2) {
    Logger.log("No responses found in the form sheet.");
    return;
  }

  const headers = data[0];
  const rows = data.slice(1);

  let combinedFeedback = '';
  rows.forEach((row, i) => {
    combinedFeedback += `Customer #${i + 1} Feedback:\n`;
    headers.forEach((header, idx) => {
      if (row[idx]) {
        combinedFeedback += `${header}: ${row[idx]}\n`;
      }
    });
    combinedFeedback += `\n`;
  });

  if (!combinedFeedback.trim()) {
    Logger.log("ERROR: Combined feedback is empty. Nothing to summarize.");
    return;
  }

  Logger.log("=== COMBINED FEEDBACK SENT TO GEMINI ===");
  Logger.log(combinedFeedback);

  const prompt = `
You are a customer experience consultant. Summarize this feedback from customers:

${combinedFeedback}

Please provide:
- Positive feedback themes
- Suggested improvements
- Overall sentiment
- Actionable recommendations
  `;

  const summary = callGeminiAI(prompt);

  Logger.log("=== FINAL SUMMARY ===");
  Logger.log(summary);

  let summarySheet = ss.getSheetByName('Summaries');
  if (!summarySheet) {
    summarySheet = ss.insertSheet('Summaries');
    summarySheet.appendRow(['Timestamp', 'Summary']);
  }
  summarySheet.appendRow([new Date(), summary]);

  // ======== Send Email ========
const emailAddress = 'sethuramanlohitya@gmail.com';  // Owner's email
const subject = 'Weekly Customer Feedback Summary';
const emailBody = `Hello,

Here is the weekly customer feedback summary generated on ${new Date()}:

${summary}

Regards,
Your Automated Feedback Bot`;

MailApp.sendEmail(emailAddress, subject, emailBody);

}

function callGeminiAI(prompt) {
  const apiKey = 'API KEY'; // Replace with your API key
  const url = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=' + apiKey;


  const payload = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const raw = response.getContentText();

  Logger.log('=== RAW API RESPONSE ===');
  Logger.log(raw);

  const json = JSON.parse(raw);

  if (json.error) {
    Logger.log('API ERROR: ' + JSON.stringify(json.error));
    return 'Error: ' + json.error.message;
  }

  const reply = json.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  Logger.log('=== PARSED RESPONSE ===');
  Logger.log(reply);

  return reply;
}
