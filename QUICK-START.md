# 🚀 QUICK START GUIDE

## Your Survey Files (15 total)

### Survey Pages (5):
1. **survey1.html** - Diaspora Profile
2. **survey2.html** - Resistance Gaps  
3. **survey3.html** - Cultural Connection
4. **survey4.html** - Strategy Preferences
5. **survey5.html** - Commitment Check

### Results Dashboards (5):
1. **results1.html** - Diaspora Profile Results
2. **results2.html** - Resistance Gaps Results
3. **results3.html** - Cultural Connection Results
4. **results4.html** - Strategy Preferences Results
5. **results5.html** - Commitment Check Results

### Backend & Docs (5):
1. **google-apps-script.js** - Backend code
2. **SETUP-GUIDE.md** - Full setup instructions
3. **QUICK-START.md** - This file
4. **SECURITY-NOTES.md** - Security best practices
5. **README.md** - Overview

---

## 3-Minute Setup

### 1. Google Sheet (2 min)
```
1. Create new Google Sheet
2. Name it "Project C Surveys"
3. Create 6 tabs: Survey1, Survey2, Survey3, Survey4, Survey5, RateLimit
```

### 2. Apps Script (1 min)
```
1. Extensions > Apps Script
2. Paste code from google-apps-script.js
3. Save
4. Run > initializeSheets
5. Deploy > Web app > "Anyone" access
6. Copy URL
```

### 3. Update HTML (1 min)
```
Replace in ALL 10 HTML files:
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

With your actual URL from step 2.

For results pages, add: ?survey=survey1 (or survey2, etc.)
```

### 4. Host & Share
```
Upload to GitHub Pages, Vercel, or Google Drive
Share the links!
```

---

## For Your Zoom Call

### Before Call:
- [ ] Test all 5 surveys
- [ ] Shorten URLs (bit.ly)
- [ ] Open results dashboards in browser tabs

### During Call:
```
"Quick 2-question survey - takes 30 seconds"
[Paste link in chat]
[2 minutes for responses]
[Optional: Share results screen]
```

### Share These Links:
```
Survey 1: [your-domain]/survey1.html
Survey 2: [your-domain]/survey2.html
Survey 3: [your-domain]/survey3.html
Survey 4: [your-domain]/survey4.html
Survey 5: [your-domain]/survey5.html
```

---

## Security Features ✅

- ✅ Rate limiting (10 per IP per 5 min)
- ✅ Input sanitization (XSS protection)
- ✅ Data validation
- ✅ No PII collection
- ✅ Anonymous responses
- ✅ Encrypted transmission (HTTPS)

---

## Troubleshooting

**Survey won't submit?**
→ Check SCRIPT_URL is correct in HTML

**Results not loading?**
→ Add ?survey=survey1 to results URL

**Need help?**
→ Read SETUP-GUIDE.md for full instructions

---

## What Each Survey Does

**Survey 1 (Diaspora Profile)**
- Time outside Cameroon
- Optimism about democratic change

**Survey 2 (Resistance Gaps)**  
- What's missing for resistance
- Current engagement level

**Survey 3 (Cultural Connection)**
- Favorite Cameroonian dish
- Thoughts on diaspora power

**Survey 4 (Strategy Preferences)**
- Most effective approach
- Personal risk willingness

**Survey 5 (Commitment Check)**
- Choose your lane
- Will attend next call

---

## You're Ready! 🎉

Each survey is:
- ✅ Mobile-optimized
- ✅ Bilingual (EN/FR)
- ✅ Secure
- ✅ Beautiful Cameroon colors
- ✅ Live results dashboard

Share the links and start gathering insights!

**Questions?** Read SETUP-GUIDE.md
