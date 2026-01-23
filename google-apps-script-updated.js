/**
 * SECURE SURVEY & VOTING SYSTEM - Google Apps Script
 * Handles 5 surveys + 1 voting system with duplicate prevention
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Rename tabs to: Survey1, Survey2, Survey3, Survey4, Survey5, StrategicVote, RateLimit
 * 3. Go to Extensions > Apps Script
 * 4. Paste this code
 * 5. Deploy as Web App (Execute as: Me, Who has access: Anyone)
 * 6. Copy the deployment URL and paste it in all HTML files
 */

// CONFIGURATION
const CONFIG = {
  RATE_LIMIT_MINUTES: 5,
  MAX_REQUESTS_PER_IP: 10,
  MAX_TEXT_LENGTH: 2000,
  ALLOWED_SURVEYS: ['survey1', 'survey2', 'survey3', 'survey4', 'survey5'],
  ALLOWED_VOTES: ['strategic_framework_vote']
};

// Sheet mapping
const SHEET_NAMES = {
  'survey1': 'Survey1',
  'survey2': 'Survey2',
  'survey3': 'Survey3',
  'survey4': 'Survey4',
  'survey5': 'Survey5',
  'strategic_framework_vote': 'StrategicVote',
  'rate_limit': 'RateLimit'
};

/**
 * Handle POST requests - Submit surveys or votes
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Check if this is a vote or a survey
    if (data.voteId) {
      return handleVote(data, e);
    } else if (data.surveyId) {
      return handleSurvey(data, e);
    } else {
      return createResponse({error: 'Invalid request type'}, 400);
    }
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse({error: 'Internal server error'}, 500);
  }
}

/**
 * Handle GET requests - Retrieve results
 */
function doGet(e) {
  try {
    // Check if requesting vote results
    if (e.parameter.vote) {
      const voteId = e.parameter.vote;
      if (!CONFIG.ALLOWED_VOTES.includes(voteId)) {
        return createResponse({error: 'Invalid vote ID'}, 400);
      }
      const results = getVoteResults(voteId);
      return createResponse({success: true, data: results}, 200);
    }
    
    // Check if requesting survey results
    if (e.parameter.survey) {
      const surveyId = e.parameter.survey;
      if (!CONFIG.ALLOWED_SURVEYS.includes(surveyId)) {
        return createResponse({error: 'Invalid survey ID'}, 400);
      }
      const results = getSurveyResults(surveyId);
      return createResponse({success: true, data: results}, 200);
    }
    
    return createResponse({error: 'Missing survey or vote parameter'}, 400);
    
  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return createResponse({error: 'Internal server error'}, 500);
  }
}

/**
 * Handle vote submission with duplicate prevention
 */
function handleVote(data, e) {
  // Validate vote ID
  if (!CONFIG.ALLOWED_VOTES.includes(data.voteId)) {
    return createResponse({error: 'Invalid vote ID'}, 400);
  }
  
  // Rate limiting
  const clientIp = getClientIp(e);
  if (isRateLimited(clientIp)) {
    return createResponse({error: 'Too many requests. Please try again later.'}, 429);
  }
  
  // Check for duplicate email
  if (isDuplicateVote(data.voteId, data.voterEmail)) {
    return createResponse({error: 'This email has already voted.'}, 400);
  }
  
  // Sanitize and validate data
  const sanitizedData = sanitizeVoteData(data);
  if (!sanitizedData) {
    return createResponse({error: 'Invalid data'}, 400);
  }
  
  // Store vote
  storeVote(sanitizedData);
  
  // Log submission
  logRateLimit(clientIp);
  
  return createResponse({success: true, message: 'Vote recorded successfully'}, 200);
}

/**
 * Handle survey submission
 */
function handleSurvey(data, e) {
  // Validate survey ID
  if (!CONFIG.ALLOWED_SURVEYS.includes(data.surveyId)) {
    return createResponse({error: 'Invalid survey ID'}, 400);
  }
  
  // Rate limiting
  const clientIp = getClientIp(e);
  if (isRateLimited(clientIp)) {
    return createResponse({error: 'Too many requests. Please try again later.'}, 429);
  }
  
  // Sanitize and validate data
  const sanitizedData = sanitizeData(data);
  if (!sanitizedData) {
    return createResponse({error: 'Invalid data'}, 400);
  }
  
  // Store survey response
  storeSurveyResponse(sanitizedData);
  
  // Log submission
  logRateLimit(clientIp);
  
  return createResponse({success: true, message: 'Survey submitted successfully'}, 200);
}

/**
 * Check if email has already voted
 */
function isDuplicateVote(voteId, email) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = SHEET_NAMES[voteId];
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return false;
    }
    
    const data = sheet.getDataRange().getValues();
    
    // Skip header row, check email column (index 2)
    for (let i = 1; i < data.length; i++) {
      if (data[i][2] && data[i][2].toLowerCase() === email.toLowerCase()) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    Logger.log('Duplicate check error: ' + error.toString());
    return false;
  }
}

/**
 * Sanitize vote data
 */
function sanitizeVoteData(data) {
  try {
    return {
      voteId: data.voteId,
      timestamp: new Date(data.timestamp),
      voterName: sanitizeText(data.voterName),
      voterEmail: sanitizeText(data.voterEmail).toLowerCase(),
      q1: data.q1 === 'Yes' || data.q1 === 'No' ? data.q1 : null,
      q2: data.q2 === 'Yes' || data.q2 === 'No' ? data.q2 : null,
      q3: data.q3 === 'Yes' || data.q3 === 'No' ? data.q3 : null,
      language: ['en', 'fr'].includes(data.language) ? data.language : 'en'
    };
  } catch (error) {
    Logger.log('Sanitize vote error: ' + error.toString());
    return null;
  }
}

/**
 * Store vote in sheet
 */
function storeVote(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = SHEET_NAMES[data.voteId];
  let sheet = ss.getSheetByName(sheetName);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    const headers = ['Timestamp', 'Name', 'Email', 'Q1', 'Q2', 'Q3', 'Language'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  // Append vote
  const row = [
    data.timestamp,
    data.voterName,
    data.voterEmail,
    data.q1,
    data.q2,
    data.q3,
    data.language
  ];
  
  sheet.appendRow(row);
}

/**
 * Get vote results
 */
function getVoteResults(voteId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = SHEET_NAMES[voteId];
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    return {
      totalVotes: 0,
      q1Yes: 0,
      q2Yes: 0,
      q3Yes: 0,
      voters: []
    };
  }
  
  const data = sheet.getDataRange().getValues();
  const votes = data.slice(1); // Skip header
  
  let q1Yes = 0, q2Yes = 0, q3Yes = 0;
  const voters = [];
  
  votes.forEach(row => {
    if (row[3] === 'Yes') q1Yes++;
    if (row[4] === 'Yes') q2Yes++;
    if (row[5] === 'Yes') q3Yes++;
    
    voters.push({
      name: row[1],
      email: row[2],
      q1: row[3],
      q2: row[4],
      q3: row[5]
    });
  });
  
  return {
    totalVotes: votes.length,
    q1Yes: q1Yes,
    q2Yes: q2Yes,
    q3Yes: q3Yes,
    voters: voters
  };
}

/**
 * Get client IP (best effort)
 */
function getClientIp(e) {
  return e.parameter.userAgent || 'unknown';
}

/**
 * Check if rate limited
 */
function isRateLimited(clientIp) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('RateLimit');
    
    if (!sheet) {
      sheet = ss.insertSheet('RateLimit');
      sheet.getRange(1, 1, 1, 3).setValues([['IP', 'Timestamp', 'Count']]);
    }
    
    const now = new Date();
    const cutoffTime = new Date(now.getTime() - CONFIG.RATE_LIMIT_MINUTES * 60000);
    
    const data = sheet.getDataRange().getValues();
    
    let recentRequests = 0;
    for (let i = data.length - 1; i > 0; i--) {
      const timestamp = new Date(data[i][1]);
      if (timestamp < cutoffTime) {
        sheet.deleteRow(i + 1);
      } else if (data[i][0] === clientIp) {
        recentRequests++;
      }
    }
    
    return recentRequests >= CONFIG.MAX_REQUESTS_PER_IP;
    
  } catch (error) {
    Logger.log('Rate limit check error: ' + error.toString());
    return false;
  }
}

/**
 * Log rate limit entry
 */
function logRateLimit(clientIp) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('RateLimit');
    
    if (!sheet) {
      sheet = ss.insertSheet('RateLimit');
      sheet.getRange(1, 1, 1, 3).setValues([['IP', 'Timestamp', 'Count']]);
    }
    
    sheet.appendRow([clientIp, new Date(), 1]);
  } catch (error) {
    Logger.log('Log rate limit error: ' + error.toString());
  }
}

/**
 * Sanitize survey data
 */
function sanitizeData(data) {
  try {
    const sanitized = {
      surveyId: data.surveyId,
      timestamp: new Date(data.timestamp),
      language: ['en', 'fr'].includes(data.language) ? data.language : 'en'
    };
    
    if (data.q1) sanitized.q1 = sanitizeText(data.q1);
    if (data.q2) sanitized.q2 = sanitizeText(data.q2);
    
    return sanitized;
  } catch (error) {
    Logger.log('Sanitize error: ' + error.toString());
    return null;
  }
}

/**
 * Sanitize text input
 */
function sanitizeText(text) {
  if (!text) return '';
  
  let sanitized = String(text).trim();
  
  if (sanitized.length > CONFIG.MAX_TEXT_LENGTH) {
    sanitized = sanitized.substring(0, CONFIG.MAX_TEXT_LENGTH);
  }
  
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  return sanitized;
}

/**
 * Store survey response
 */
function storeSurveyResponse(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = SHEET_NAMES[data.surveyId];
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    const headers = getHeadersForSurvey(data.surveyId);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  const row = [
    data.timestamp,
    data.q1 || '',
    data.q2 || '',
    data.language
  ];
  
  sheet.appendRow(row);
}

/**
 * Get headers for survey
 */
function getHeadersForSurvey(surveyId) {
  const headers = {
    'survey1': ['Timestamp', 'Time Outside Cameroon', 'Optimism Level (1-10)', 'Language'],
    'survey2': ['Timestamp', "What's Missing", 'Engagement Level', 'Language'],
    'survey3': ['Timestamp', 'Favorite Dish', 'Diaspora Power Thoughts', 'Language'],
    'survey4': ['Timestamp', 'Effective Approach', 'Risk Willingness', 'Language'],
    'survey5': ['Timestamp', 'Choose Your Lane', 'Attend Next Call', 'Language']
  };
  
  return headers[surveyId] || ['Timestamp', 'Q1', 'Q2', 'Language'];
}

/**
 * Get survey results
 */
function getSurveyResults(surveyId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = SHEET_NAMES[surveyId];
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    return {
      totalResponses: 0,
      q1Data: {},
      q2Data: {},
      recentResponses: []
    };
  }
  
  const data = sheet.getDataRange().getValues();
  const responses = data.slice(1);
  
  const q1Counts = {};
  const q2Counts = {};
  
  responses.forEach(row => {
    const q1 = row[1];
    const q2 = row[2];
    
    if (q1) q1Counts[q1] = (q1Counts[q1] || 0) + 1;
    if (q2 && surveyId !== 'survey3') q2Counts[q2] = (q2Counts[q2] || 0) + 1;
  });
  
  return {
    totalResponses: responses.length,
    q1Data: q1Counts,
    q2Data: q2Counts,
    recentResponses: responses.slice(-10).reverse()
  };
}

/**
 * Create JSON response
 */
function createResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Initialize sheets - Run this once manually
 */
function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create survey sheets
  CONFIG.ALLOWED_SURVEYS.forEach(surveyId => {
    const sheetName = SHEET_NAMES[surveyId];
    let sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      const headers = getHeadersForSurvey(surveyId);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
  });
  
  // Create vote sheet
  CONFIG.ALLOWED_VOTES.forEach(voteId => {
    const sheetName = SHEET_NAMES[voteId];
    let sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      const headers = ['Timestamp', 'Name', 'Email', 'Q1', 'Q2', 'Q3', 'Language'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
  });
  
  Logger.log('Sheets initialized successfully!');
}
