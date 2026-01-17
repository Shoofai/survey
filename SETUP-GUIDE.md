# 🔒 SECURE SURVEY SYSTEM - SETUP GUIDE

## 📋 What You're Getting

**5 Complete Surveys:**
1. **Diaspora Profile** - Time abroad + optimism level
2. **Resistance Gaps** - What's missing + engagement level
3. **Cultural Connection** - Favorite dish + diaspora power
4. **Strategy Preferences** - Effective approaches + risk willingness
5. **Commitment Check** - Choose your lane + next call attendance

**Each Survey Includes:**
- ✅ Bilingual (English/French)
- ✅ Mobile-optimized design
- ✅ Secure data submission
- ✅ Live results dashboard
- ✅ Cameroon flag colors

---

## 🚀 SETUP INSTRUCTIONS (15 minutes)

### **Step 1: Create Google Sheet**

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. **Rename it:** "Project C Surveys"
4. Create 6 sheets (tabs at bottom):
   - `Survey1` 
   - `Survey2`
   - `Survey3`
   - `Survey4`
   - `Survey5`
   - `RateLimit`

### **Step 2: Set Up Google Apps Script**

1. In your Google Sheet, go to: **Extensions > Apps Script**
2. Delete any code in the editor
3. Copy ALL code from `google-apps-script.js`
4. Paste it into the Apps Script editor
5. Click **Save** (disk icon)
6. Click **Run > initializeSheets** (this sets up headers)
7. **Authorize** when prompted (click "Review permissions" > your account > "Allow")

### **Step 3: Deploy the Script**

1. Click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in:
   - **Description:** "Survey Backend"
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
5. Click **Deploy**
6. **IMPORTANT:** Copy the Web App URL that appears
   - It looks like: `https://script.google.com/macros/s/ABC123.../exec`

### **Step 4: Update HTML Files**

Open each survey file and results file, and find this line:

```javascript
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

**Replace with your actual URL from Step 3**

Files to update (10 total):
- ✅ survey1.html
- ✅ survey2.html
- ✅ survey3.html
- ✅ survey4.html
- ✅ survey5.html
- ✅ results1.html
- ✅ results2.html
- ✅ results3.html
- ✅ results4.html
- ✅ results5.html

**For results pages, add the survey parameter:**
- results1.html: `?survey=survey1`
- results2.html: `?survey=survey2`
- etc.

Example:
```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/ABC123.../exec?survey=survey1';
```

### **Step 5: Host Your Files**

Choose one option:

#### **Option A: GitHub Pages (Recommended - Free)**

1. Create GitHub account if you don't have one
2. Create new repository: "projectc-surveys"
3. Upload all HTML files
4. Go to Settings > Pages
5. Enable GitHub Pages
6. Your surveys will be at: `https://yourusername.github.io/projectc-surveys/survey1.html`

#### **Option B: Google Drive (Simple)**

1. Upload HTML files to Google Drive
2. Right-click each file > Share > "Anyone with the link"
3. Share the links

#### **Option C: Vercel (Professional - Free)**

1. Install Vercel CLI: `npm install -g vercel`
2. In your project folder: `vercel`
3. Follow prompts
4. Your surveys will be deployed instantly

---

## 🔒 SECURITY FEATURES

### **Built-in Protection:**

1. **Rate Limiting**
   - Max 10 submissions per IP per 5 minutes
   - Prevents spam/bot attacks

2. **Input Validation**
   - Max 2000 characters per text field
   - Removes script tags (XSS protection)
   - Validates survey IDs

3. **Data Sanitization**
   - All inputs cleaned before storage
   - SQL injection protection
   - Language validation (only en/fr)

4. **Anonymous Responses**
   - No email collection
   - No PII (personally identifiable information)
   - IP tracking only for rate limiting

### **Additional Security Recommendations:**

#### **For Sensitive Topics:**

1. **Use VPN Protection**
   - Share VPN recommendations with participants
   - Especially for in-country respondents

2. **Secure Links**
   - Share survey links via encrypted messaging
   - Use BitChat for offline distribution

3. **Data Access Control**
   - Only share Google Sheet with trusted team
   - Use "View only" access where possible
   - Enable 2FA on Google account

4. **Regular Monitoring**
   - Check RateLimit sheet for suspicious activity
   - Review responses for spam patterns
   - Delete test responses regularly

#### **Google Sheet Security:**

1. Go to your Google Sheet
2. Click **Share**
3. Under "General access" keep it "Restricted"
4. Only add specific people who need access
5. Set permission to "Viewer" or "Commenter" (not Editor)

---

## 📊 USING THE RESULTS DASHBOARDS

Each survey has a results page that shows:

- **Total Responses** - Live count
- **Visual Charts** - Bar charts, line graphs, pie charts
- **Auto-refresh** - Updates every 30 seconds
- **Export Ready** - Data in Google Sheets for analysis

### **Sharing Results:**

**Option 1: Share Results Page**
- Share the results HTML URL
- Anyone can view without access to raw data

**Option 2: Share Google Sheet**
- For team members who need data access
- Can create additional charts/analysis

**Option 3: Screenshot**
- For presentations/reports
- Use during Zoom calls

---

## 🎯 USING IN ZOOM CALLS

### **Before the Call:**

1. Test all survey links
2. Shorten URLs using [bit.ly](https://bitly.com) or [tinyurl.com](https://tinyurl.com)
3. Create Zoom chat message with all links
4. Have results dashboards open in browser tabs

### **During the Call:**

1. **Introduction (2 min):**
   - "We have a quick 2-question survey"
   - "Takes 30 seconds"
   - "Your honest feedback helps us improve"

2. **Share Link:**
   - Paste in Zoom chat
   - Read out loud for those who joined by phone
   - Keep it visible for latecomers

3. **Give Time (2-3 min):**
   - "We'll give everyone 2 minutes to complete"
   - Continue discussion while they respond
   - Announce when responses coming in

4. **Show Results (Optional):**
   - Share screen with results dashboard
   - "Here's what we're seeing so far..."
   - Discuss trends together

### **After the Call:**

1. Send follow-up with links
2. Share results summary
3. Thank participants

---

## 📈 ANALYZING RESULTS

### **In Google Sheets:**

1. **Sort Data:**
   - Click column header > Sort A→Z

2. **Filter:**
   - Data > Create a filter
   - Click filter icon in header

3. **Pivot Tables:**
   - Insert > Pivot table
   - Analyze by language, time, etc.

4. **Export:**
   - File > Download > CSV/Excel

### **Quick Insights:**

**Survey 1 (Diaspora Profile):**
- How many people are long-term diaspora vs recent?
- Correlation between time away and optimism?

**Survey 2 (Resistance Gaps):**
- What's the #1 gap identified?
- Are coordinators identifying different gaps than observers?

**Survey 3 (Cultural Connection):**
- Most mentioned dishes = cultural touchpoints
- Themes in diaspora power responses

**Survey 4 (Strategy Preferences):**
- Which strategy has most support?
- Correlation between strategy preference and risk tolerance?

**Survey 5 (Commitment Check):**
- How many commit to specific roles?
- Expected attendance for next call

---

## 🔧 TROUBLESHOOTING

### **"Survey won't submit"**

1. Check SCRIPT_URL is correct in HTML file
2. Ensure Apps Script is deployed as "Anyone"
3. Check browser console for errors (F12)

### **"Results not showing"**

1. Verify survey parameter in results URL
2. Check Google Sheet has data
3. Wait 30 seconds for auto-refresh

### **"Too many requests" error**

1. Normal if testing multiple times
2. Wait 5 minutes
3. Or increase `MAX_REQUESTS_PER_IP` in script

### **"Unauthorized" in Apps Script**

1. Re-run authorization: Run > initializeSheets
2. Make sure "Execute as: Me"
3. Check "Who has access: Anyone"

---

## 🌍 CUSTOMIZATION

### **Change Colors:**

Edit the CSS gradient in any HTML file:

```css
background: linear-gradient(135deg, #009739 0%, #FCD116 50%, #CE1126 100%);
```

### **Add Questions:**

1. Add HTML for new question in survey file
2. Update `sanitizeData()` in Apps Script
3. Add new column in `getHeadersForSurvey()`

### **Change Rate Limits:**

In Apps Script, edit:

```javascript
const CONFIG = {
  RATE_LIMIT_MINUTES: 5,    // Change to 10, 15, etc.
  MAX_REQUESTS_PER_IP: 10,  // Change to 20, 50, etc.
  MAX_TEXT_LENGTH: 2000     // Max characters
};
```

---

## ✅ TESTING CHECKLIST

Before sharing with participants:

- [ ] All 5 surveys submit successfully
- [ ] Responses appear in Google Sheet
- [ ] Results dashboards load data
- [ ] Language switching works (EN/FR)
- [ ] Mobile display looks good
- [ ] Survey links shortened
- [ ] Team has access to results
- [ ] VPN recommendations shared

---

## 📞 SUPPORT

If you get stuck:

1. **Check Google Sheet** - Is data arriving?
2. **Browser Console** - F12 to see errors
3. **Apps Script Logs** - View > Logs in script editor
4. **Test Mode** - Try in Incognito window

---

## 🎉 YOU'RE READY!

Your secure survey system is now live. Share the links and start gathering insights from your community!

**Survey Links Pattern:**
- Survey 1: `your-domain.com/survey1.html`
- Results 1: `your-domain.com/results1.html`

Good luck with Project C! 🇨🇲
