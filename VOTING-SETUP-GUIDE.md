# 🗳️ STRATEGIC FRAMEWORK VOTE - SETUP GUIDE

## What This Is

A secure, transparent voting system for the Strategic Framework Proposal with:
- ✅ **Identity required** - Name and email collection
- ✅ **Duplicate prevention** - Each email can only vote once
- ✅ **3 Yes/No questions** - Simple, clear decisions
- ✅ **Transparent results** - Shows who voted and how
- ✅ **Bilingual** - English/French
- ✅ **Live results** - Updates automatically

---

## Files

1. **voting.html** - The voting page
2. **voting-results.html** - Results dashboard
3. **google-apps-script-updated.js** - Backend (replaces original)

---

## Setup Instructions (10 Minutes)

### Step 1: Update Your Google Sheet

If you already set up the survey system:

1. Open your Google Sheet
2. Create a new tab called **StrategicVote**
3. That's it!

If starting fresh:

1. Create new Google Sheet
2. Create these tabs:
   - Survey1
   - Survey2
   - Survey3
   - Survey4
   - Survey5
   - StrategicVote
   - RateLimit

### Step 2: Update Google Apps Script

1. Open your Google Sheet
2. Go to **Extensions > Apps Script**
3. **Delete all existing code**
4. Copy code from **google-apps-script-updated.js**
5. Paste it in
6. Click **Save**
7. Click **Run > initializeSheets**
8. Authorize if prompted
9. **Important:** Re-deploy as Web App
   - Click **Deploy > Manage deployments**
   - Click pencil icon to edit
   - Change version to "New version"
   - Click **Deploy**
   - Copy the new URL

### Step 3: Update HTML Files

Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` in:

**Voting page:**
- `voting.html` - Use your script URL (no parameters)

**Results page:**
- `voting-results.html` - Add `?vote=strategic_framework_vote`

Example:
```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/ABC123.../exec?vote=strategic_framework_vote';
```

### Step 4: Host and Share

Upload `voting.html` and `voting-results.html` to your hosting (GitHub Pages, Vercel, etc.)

---

## The 3 Questions

**Question 1:** Do we agree on a shared minimum objective for the next 6-12 months?

**Question 2:** Do we agree to establish a temporary coordination structure to facilitate alignment?

**Question 3:** Do we agree to seek consensus, and establish a governing framework that can be reviewed and optimized on a scheduled basis?

Each question: **Yes** or **No**

---

## Security Features

### ✅ Duplicate Prevention
- Each email can only vote once
- Checked at the database level
- Returns error if duplicate detected

### ✅ Identity Verification
- Name and email required
- Email validation
- No anonymous votes

### ✅ Rate Limiting
- Same as surveys (10 per 5 minutes)
- Prevents spam attacks

### ✅ Data Validation
- All inputs sanitized
- Script tag removal
- Length limits enforced

---

## Transparency Features

### Public Voter Registry
The results page shows:
- Who voted (name + email)
- How they voted on each question
- Timestamp

This ensures:
- ✅ Accountability
- ✅ No manipulation
- ✅ Historical record
- ✅ Trust in the process

### If You Want Anonymous Voting

Edit `voting-results.html` and **remove this section**:

```html
<div class="voters-list">
    <h2 class="chart-title">Voter Registry (For Transparency)</h2>
    <div id="votersList"></div>
</div>
```

And remove this function:
```javascript
displayVotersList(data.voters);
```

---

## Using During Zoom Call

### Before Call:
1. Test voting system yourself
2. Verify duplicate prevention works
3. Check results dashboard loads
4. Shorten URLs

### Announce During Call:

**English:**
"Please complete this vote. This is our formal decision on the Strategic Framework Proposal. Each email can only vote once. Results will be shared at the end of this call."

**French:**
"Veuillez compléter ce vote. C'est notre décision formelle sur la Proposition de Cadre Stratégique. Chaque email ne peut voter qu'une seule fois. Les résultats seront partagés à la fin de cet appel."

### Share Link:
```
Voting: https://your-domain.com/voting.html
Results: https://your-domain.com/voting-results.html
```

### Give Time:
- Allow 3-5 minutes for voting
- Continue discussion while people vote
- Monitor results dashboard

### Show Results:
- Share screen with results dashboard
- Discuss vote breakdown
- Show voter registry (transparency)

---

## Results Dashboard Shows:

1. **Total Votes Cast**
2. **Yes Votes per Question**
3. **Percentage Breakdown** (pie charts)
4. **Voter Registry** (who voted, how they voted)

---

## What Happens When Someone Votes Twice?

If someone tries to vote with the same email:

1. Form submits
2. Backend checks database
3. Finds existing email
4. **Rejects the vote**
5. Returns error message
6. Original vote remains unchanged

**Important:** The system checks the email, not the name. So if someone uses a different email, they can vote again. This is intentional - it allows corrections if someone made a mistake with their first vote.

---

## Troubleshooting

### "Email already voted" error
- This means the email has already been used
- Check the StrategicVote sheet to verify
- Cannot vote twice with same email (by design)

### Votes not appearing
- Check StrategicVote sheet has data
- Verify script URL in HTML is correct
- Add `?vote=strategic_framework_vote` to results URL

### Results show 0 votes
- Wait 30 seconds for auto-refresh
- Click "Refresh Results" button
- Check browser console for errors (F12)

---

## Privacy Considerations

### This Is NOT Anonymous

Unlike the surveys, this voting system:
- ✅ Collects names and emails
- ✅ Shows who voted publicly
- ✅ Creates permanent record
- ✅ Enables transparency

**Why?**
- Official decision requires accountability
- Historical record for the movement
- Prevents manipulation
- Builds trust in the process

### If Voters Have Security Concerns

Recommend they:
- Use VPN
- Use work/organizational email (not personal)
- Understand vote is public record
- Consider the political context

---

## Data Storage

All votes stored in Google Sheet "StrategicVote" with columns:

1. Timestamp
2. Name
3. Email
4. Q1 (Yes/No)
5. Q2 (Yes/No)
6. Q3 (Yes/No)
7. Language (en/fr)

This data is:
- ✅ Permanent
- ✅ Exportable (CSV/Excel)
- ✅ Auditable
- ✅ Shareable with authorized team

---

## After the Vote

### 1. Export Results
- File > Download > CSV
- Archive for historical record
- Share with key stakeholders

### 2. Analyze Data
- Calculate final percentages
- Identify patterns (who voted which way)
- Look for consensus areas
- Note divisions

### 3. Next Steps
Based on results, decide:
- If proposal passes (what threshold?)
- How to address "No" votes
- Implementation timeline
- Follow-up actions

---

## Sample Results Announcement

**If Majority Yes:**

"The Strategic Framework Proposal has been approved with [X]% voting Yes on Q1, [Y]% on Q2, and [Z]% on Q3. We will now move forward with implementation. Thank you to everyone who participated in this important decision."

**If Majority No:**

"The Strategic Framework Proposal did not achieve majority support, with [X]% voting No on Q1. We respect this decision and will work to address concerns before bringing forward a revised proposal. The record shows we addressed this matter in good faith."

**If Mixed Results:**

"Results show [describe pattern]. While we have consensus on [X], there are concerns about [Y]. We will move forward on areas of agreement while continuing dialogue on contentious issues."

---

## Technical Details

### Duplicate Prevention Logic

```javascript
// Check if email exists in database
function isDuplicateVote(voteId, email) {
  // Get all rows from StrategicVote sheet
  // Loop through email column
  // If email matches (case-insensitive) → return true
  // Otherwise → return false
}
```

### Why Email and Not IP?

- IP addresses can be shared (office, VPN)
- Email is unique identifier
- Email enables corrections
- Email provides accountability

---

## You're Ready! 🎉

1. Follow setup steps above
2. Test with your own email
3. Try voting twice (should fail)
4. Check results dashboard
5. Share links with voting members
6. Monitor results during call
7. Record decision for history

**This is how democratic movements make decisions. Let the record show we did this right.** 🇨🇲

---

## Support

- **Setup Issues:** Re-read this guide
- **Duplicate Detection:** Check StrategicVote sheet
- **Results Issues:** Verify URL has `?vote=strategic_framework_vote`
- **Security Concerns:** Read SECURITY-NOTES.md
