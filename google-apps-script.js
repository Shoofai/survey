/**
 * SECURE SURVEY SYSTEM - Google Apps Script
 * Handles 5 surveys with security features
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Rename tabs to: Survey1, Survey2, Survey3, Survey4, Survey5
 * 3. Go to Extensions > Apps Script
 * 4. Paste this code
 * 5. Deploy as Web App (Execute as: Me, Who has access: Anyone)
 * 6. Copy the deployment URL and paste it in all survey HTML files
 */

// CONFIGURATION
const CONFIG = {
  RATE_LIMIT_MINUTES: 5, // Time window for rate limiting
  MAX_REQUESTS_PER_IP: 10, // Max submissions per IP in time window
  MAX_TEXT_LENGTH: 2000, // Max characters for text responses
  ALLOWED_SURVEYS: ['survey1', 'survey2', 'survey3', 'survey4', 'survey5']
};

// Sheet mapping
const SHEET_NAMES = {
  'survey1': 'Survey1',
  'survey2': 'Survey2',
  'survey3': 'Survey3',
  'survey4': 'Survey4',
  'survey5': 'Survey5',
  'rate_limit': 'RateLimit'
};

/**
 * Handle POST requests - Submit survey responses
 */
function doPost(e) {
  try {
    // Parse request
    const data = JSON.parse(e.postData.contents);
    
    // Security checks
    if (!validateSurveyId(data.surveyId)) {
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
    
    // Store in appropriate sheet
    storeSurveyResponse(sanitizedData);
    
    // Log submission
    logRateLimit(clientIp);
    
    return createResponse({success: true, message: 'Survey submitted successfully'}, 200);
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse({error: 'Internal server error'}, 500);
  }
}

/**
 * Handle GET requests - Retrieve survey results
 */
function doGet(e) {
  try {
    const surveyId = e.parameter.survey;
    
    if (!validateSurveyId(surveyId)) {
      return createResponse({error: 'Invalid survey ID'}, 400);
    }
    
    const results = getSurveyResults(surveyId);
    
    return createResponse({
      success: true,
      data: results
    }, 200);
    
  } catch (error) {
    Logger.log('Error in doGet: ' + error.toString());
    return createResponse({error: 'Internal server error'}, 500);
  }
}

/**
 * Validate survey ID
 */
function validateSurveyId(surveyId) {
  return CONFIG.ALLOWED_SURVEYS.includes(surveyId);
}

/**
 * Get client IP address (best effort)
 */
function getClientIp(e) {
  // Google Apps Script doesn't expose real IP, use timestamp + random as fallback
  // In production, you might want to use a proxy that forwards X-Forwarded-For
  return e.parameter.userAgent || 'unknown';
}

/**
 * Check if client is rate limited
 */
function isRateLimited(clientIp) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('RateLimit');
    
    // Create RateLimit sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet('RateLimit');
      sheet.getRange(1, 1, 1, 3).setValues([['IP', 'Timestamp', 'Count']]);
    }
    
    const now = new Date();
    const cutoffTime = new Date(now.getTime() - CONFIG.RATE_LIMIT_MINUTES * 60000);
    
    // Get all data
    const data = sheet.getDataRange().getValues();
    
    // Clean old entries and count recent requests
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
    return false; // Fail open if error
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
 * Sanitize input data
 */
function sanitizeData(data) {
  try {
    const sanitized = {
      surveyId: data.surveyId,
      timestamp: new Date(data.timestamp),
      language: ['en', 'fr'].includes(data.language) ? data.language : 'en'
    };
    
    // Sanitize q1
    if (data.q1) {
      sanitized.q1 = sanitizeText(data.q1);
    }
    
    // Sanitize q2
    if (data.q2) {
      sanitized.q2 = sanitizeText(data.q2);
    }

    // Sanitize country
    if (data.country) {
      sanitized.country = sanitizeText(data.country).substring(0, 100);
    } else {
      sanitized.country = 'Unknown';
    }

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
  
  // Convert to string and trim
  let sanitized = String(text).trim();
  
  // Limit length
  if (sanitized.length > CONFIG.MAX_TEXT_LENGTH) {
    sanitized = sanitized.substring(0, CONFIG.MAX_TEXT_LENGTH);
  }
  
  // Remove any potential script tags
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
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // Add headers based on survey
    const headers = getHeadersForSurvey(data.surveyId);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format header row
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  // Append data
  const row = [
    data.timestamp,
    data.q1 || '',
    data.q2 || '',
    data.language,
    data.country || 'Unknown'
  ];

  sheet.appendRow(row);
}

/**
 * Get headers for each survey
 */
function getHeadersForSurvey(surveyId) {
  const headers = {
    'survey1': ['Timestamp', 'Time Outside Cameroon', 'Optimism Level (1-10)', 'Language', 'Country'],
    'survey2': ['Timestamp', "What's Missing", 'Engagement Level', 'Language', 'Country'],
    'survey3': ['Timestamp', 'Favorite Dish', 'Diaspora Power Thoughts', 'Language', 'Country'],
    'survey4': ['Timestamp', 'Effective Approach', 'Risk Willingness', 'Language', 'Country'],
    'survey5': ['Timestamp', 'Choose Your Lane', 'Attend Next Call', 'Language', 'Country']
  };

  return headers[surveyId] || ['Timestamp', 'Q1', 'Q2', 'Language', 'Country'];
}

/**
 * Get survey results for visualization
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
  
  // Skip header row
  const responses = data.slice(1);
  
  // Aggregate data
  const q1Counts = {};
  const q2Counts = {};
  const countryCounts = {};

  responses.forEach(row => {
    const q1 = row[1];
    const q2 = row[2];
    const country = row[4] || 'Unknown';

    // Count Q1 responses
    if (q1) {
      q1Counts[q1] = (q1Counts[q1] || 0) + 1;
    }

    // Count Q2 responses (for non-text questions)
    if (q2 && surveyId !== 'survey3') {
      q2Counts[q2] = (q2Counts[q2] || 0) + 1;
    }

    // Count countries
    if (country) {
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    }
  });

  return {
    totalResponses: responses.length,
    q1Data: q1Counts,
    q2Data: q2Counts,
    countryData: countryCounts,
    recentResponses: responses.slice(-10).reverse() // Last 10 responses
  };
}

/**
 * Create JSON response
 */
function createResponse(data, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Note: Apps Script doesn't fully support HTTP status codes in responses
  // The status code here is mostly for documentation
  return output;
}

/**
 * Initialize sheets - Run this once manually
 */
function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create all survey sheets
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
  
  Logger.log('Sheets initialized successfully!');
}
