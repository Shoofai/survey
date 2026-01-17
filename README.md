# 🇨🇲 PROJECT C - SECURE SURVEY SYSTEM

Complete survey solution for gathering feedback during Zoom calls and beyond.

## 📦 What's Included

**15 Files Total:**

### Survey Pages (5)
- `survey1.html` - Diaspora Profile Survey
- `survey2.html` - Resistance Gaps Survey
- `survey3.html` - Cultural Connection Survey
- `survey4.html` - Strategy Preferences Survey
- `survey5.html` - Commitment Check Survey

### Results Dashboards (5)
- `results1.html` - Diaspora Profile Results
- `results2.html` - Resistance Gaps Results
- `results3.html` - Cultural Connection Results
- `results4.html` - Strategy Preferences Results
- `results5.html` - Commitment Check Results

### Backend & Documentation (5)
- `google-apps-script.js` - Backend server code
- `SETUP-GUIDE.md` - Complete setup instructions
- `QUICK-START.md` - 3-minute quick start
- `SECURITY-NOTES.md` - Security & privacy guide
- `README.md` - This file

---

## ✨ Features

- ✅ **Secure** - Rate limiting, input validation, XSS protection
- ✅ **Bilingual** - English/French with language switcher
- ✅ **Mobile-Optimized** - Works perfectly on phones
- ✅ **Anonymous** - No PII collection
- ✅ **Live Results** - Real-time updating dashboards
- ✅ **Beautiful Design** - Cameroon flag colors (green/yellow/red)
- ✅ **Free** - Google Sheets backend (no hosting costs)
- ✅ **Easy Setup** - 15 minutes total

---

## 🚀 Quick Start

### 1. Setup (15 minutes)
Read `QUICK-START.md` for fastest setup

### 2. Detailed Setup
Read `SETUP-GUIDE.md` for step-by-step instructions

### 3. Security Review
Read `SECURITY-NOTES.md` for security best practices

---

## 📊 Survey Descriptions

### Survey 1: Diaspora Profile
**Questions:**
1. How long have you been outside Cameroon?
2. Optimism level (1-10) about democratic change

**Use Case:** Understanding diaspora demographics and sentiment

---

### Survey 2: Resistance Gaps
**Questions:**
1. What's missing for effective resistance?
2. Current level of engagement

**Use Case:** Identifying strategic priorities and mobilization levels

---

### Survey 3: Cultural Connection
**Questions:**
1. Favorite Cameroonian dish
2. Thoughts on diaspora power in practice

**Use Case:** Building cultural connection and gathering strategic insights

---

### Survey 4: Strategy Preferences
**Questions:**
1. Most effective approach (party politics, resistance, diaspora pressure, etc.)
2. Personal risk willingness (financial, professional, legal)

**Use Case:** Understanding strategic alignment and commitment levels

---

### Survey 5: Commitment Check
**Questions:**
1. Choose your lane (resistance, communicator, business/tech, funding, other)
2. Will attend next Project C Zoom call?

**Use Case:** Mobilization planning and attendance forecasting

---

## 🔒 Security Features

- **Rate Limiting:** Max 10 submissions per IP per 5 minutes
- **Input Validation:** 2000 character limits, script tag removal
- **Anonymous Responses:** No email, name, or real IP collection
- **Secure Transmission:** HTTPS only
- **Access Control:** Restricted Google Sheet access

**Read SECURITY-NOTES.md for full details**

---

## 💻 Technical Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Google Apps Script
- **Database:** Google Sheets
- **Charts:** Chart.js
- **Hosting:** GitHub Pages / Vercel / Google Drive

---

## 🎯 Use Cases

### Primary: Zoom Call Feedback
- Share survey link during/after calls
- Gather real-time feedback
- Show live results on screen
- Plan next steps based on data

### Secondary: Continuous Engagement
- Email surveys between calls
- Share via WhatsApp/BitChat
- Embedded in newsletters
- Posted in Slack/Discord

### Advanced: Strategic Planning
- Pre-call context gathering
- Post-event evaluation
- Sentiment tracking over time
- Coalition building insights

---

## 📈 Data Analysis

### In Google Sheets:
- Sort, filter, pivot tables
- Export to CSV/Excel
- Share with team
- Create additional charts

### Results Dashboards:
- Live updating charts
- Auto-refresh every 30 seconds
- Mobile-friendly display
- Screenshot-ready for presentations

---

## 🌐 Hosting Options

### Option 1: GitHub Pages (Recommended)
- Free
- Custom domain support
- Automatic HTTPS
- Version control

### Option 2: Vercel
- Free tier
- Global CDN
- Instant deployment
- Professional URLs

### Option 3: Google Drive
- Simplest setup
- Share links directly
- No deployment needed
- Limited customization

---

## 📝 Customization

### Change Colors
Edit CSS in any HTML file:
```css
background: linear-gradient(135deg, #009739 0%, #FCD116 50%, #CE1126 100%);
```

### Add Questions
1. Add HTML in survey file
2. Update Apps Script `sanitizeData()`
3. Add column in `getHeadersForSurvey()`

### Adjust Rate Limits
Edit in `google-apps-script.js`:
```javascript
RATE_LIMIT_MINUTES: 5,    // Change to 10, 15
MAX_REQUESTS_PER_IP: 10,  // Change to 20, 50
```

---

## 🆘 Troubleshooting

### Survey Won't Submit
- Check SCRIPT_URL in HTML is correct
- Verify Apps Script deployed as "Anyone"
- Test in incognito window

### Results Not Loading
- Add `?survey=survey1` to results URL
- Check Google Sheet has data
- Wait 30 seconds for auto-refresh

### Too Many Requests Error
- Normal if testing multiple times
- Wait 5 minutes
- Or increase rate limits

**Full troubleshooting in SETUP-GUIDE.md**

---

## 📞 Support

1. **Setup Issues:** Read SETUP-GUIDE.md
2. **Security Questions:** Read SECURITY-NOTES.md
3. **Quick Help:** Read QUICK-START.md
4. **Technical Errors:** Check browser console (F12)

---

## 🎉 You're Ready!

1. Follow QUICK-START.md (3 minutes)
2. Test all surveys
3. Share links
4. Watch responses flow in
5. Review results dashboards
6. Make data-driven decisions

**For Project C - Building democratic Cameroon together! 🇨🇲**

---

## 📄 License

Free to use for Project C and democratic advocacy purposes.

---

## 🙏 Acknowledgments

Built with security, privacy, and usability in mind for the Cameroon resistance movement.

**Your voice matters. Your data is protected. Your struggle is just.**
