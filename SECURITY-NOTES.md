# 🔒 SECURITY & PRIVACY NOTES

## Built-in Security Features

### 1. Rate Limiting
**Protection Against:** Spam, bot attacks, DDoS attempts

**How it Works:**
- Tracks submissions by IP address
- Max 10 submissions per IP per 5 minutes
- Automatically cleans old entries
- Fails open (allows access if check errors)

**Customize:**
```javascript
const CONFIG = {
  RATE_LIMIT_MINUTES: 5,     // Change to 10, 15, etc.
  MAX_REQUESTS_PER_IP: 10,   // Change to 20, 50, etc.
};
```

### 2. Input Validation & Sanitization
**Protection Against:** XSS attacks, code injection, malicious input

**How it Works:**
- All text limited to 2000 characters
- Script tags removed automatically
- Survey IDs validated against whitelist
- Language codes validated (only en/fr)

**Code:**
```javascript
function sanitizeText(text) {
  let sanitized = String(text).trim();
  if (sanitized.length > CONFIG.MAX_TEXT_LENGTH) {
    sanitized = sanitized.substring(0, CONFIG.MAX_TEXT_LENGTH);
  }
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  return sanitized;
}
```

### 3. Anonymous Responses
**Protection Against:** Tracking, identification

**What's NOT Collected:**
- ✅ No names
- ✅ No emails
- ✅ No phone numbers
- ✅ No addresses
- ✅ No real IP addresses (Apps Script limitation)

**What IS Collected:**
- ✅ Survey answers only
- ✅ Timestamp
- ✅ Language preference
- ✅ Rate limit token (for spam prevention only)

### 4. Secure Transmission
**Protection Against:** Man-in-the-middle attacks, eavesdropping

**How it Works:**
- All data sent via HTTPS
- Google Apps Script enforces TLS
- No sensitive data in URLs
- POST requests only for submissions

---

## Additional Security Recommendations

### For High-Risk Situations

#### 1. **VPN Usage**
Recommend participants use VPN, especially:
- In-country respondents
- Sensitive political questions
- Government surveillance concerns

**Recommend these free VPNs:**
- ProtonVPN (unlimited data)
- Windscribe (10GB/month)
- Hide.me (10GB/month)

#### 2. **Offline Distribution**
For internet shutdown scenarios:
- Use BitChat for offline message relay
- Pre-download survey pages for offline viewing
- Collect responses offline, submit when online

#### 3. **Link Protection**
- Don't post survey links publicly on social media
- Share via encrypted messaging (Signal, WhatsApp)
- Use URL shorteners for obfuscation
- Change survey URLs periodically if needed

#### 4. **Access Control**
**Google Sheet Security:**
```
1. File > Share > Restricted
2. Only add trusted team members
3. Use "Viewer" or "Commenter" (not Editor)
4. Enable 2FA on Google account
5. Review access regularly
```

#### 5. **Data Retention**
- Delete test responses regularly
- Archive old data offline
- Clear RateLimit sheet monthly
- Export and delete sensitive responses

---

## Threat Model & Mitigations

### Threat: Government Surveillance
**Mitigation:**
- Recommend VPN usage
- Anonymous responses (no PII)
- Secure hosting (GitHub Pages, Vercel)
- Encrypted messaging for distribution

### Threat: Spam/Bot Attacks
**Mitigation:**
- Rate limiting (10 per 5 min)
- Input validation
- Manual review of suspicious patterns
- Can increase rate limit if needed

### Threat: Data Breach
**Mitigation:**
- Google Sheet access control
- No sensitive PII collected
- 2FA on Google account
- Regular security audits

### Threat: DDoS Attack
**Mitigation:**
- Google Apps Script handles scaling
- Rate limiting prevents overload
- Can temporarily disable surveys if needed
- Cloudflare for hosting (optional)

### Threat: Code Injection
**Mitigation:**
- Input sanitization
- Script tag removal
- Character limits
- Validation of all inputs

---

## Privacy Policy (For Transparency)

### What We Collect:
- Survey responses (anonymous)
- Timestamp of submission
- Language preference (EN or FR)
- Rate limit token (not real IP)

### What We DON'T Collect:
- Names, emails, phone numbers
- IP addresses (Apps Script limitation)
- Device information
- Location data
- Browsing history

### How We Use Data:
- Aggregate analysis only
- Community insights
- Strategy planning
- No individual identification
- No data selling or sharing

### Data Retention:
- Stored in secure Google Sheet
- Access limited to team
- Can be deleted on request
- Exported for offline analysis

### Your Rights:
- Responses are anonymous
- Can request data deletion
- Can view aggregate results
- No tracking or profiling

---

## Security Checklist for Deployment

Before going live:

- [ ] Test all surveys with safe data
- [ ] Verify rate limiting works
- [ ] Check input sanitization
- [ ] Confirm HTTPS is enabled
- [ ] Set Google Sheet to "Restricted"
- [ ] Enable 2FA on Google account
- [ ] Share VPN recommendations
- [ ] Brief participants on privacy
- [ ] Document data retention policy
- [ ] Have incident response plan

---

## Incident Response Plan

### If Suspicious Activity Detected:

1. **Immediate Actions:**
   - Check RateLimit sheet for patterns
   - Review recent responses for spam
   - Temporarily increase rate limit window

2. **Investigate:**
   - Look for repeated similar responses
   - Check timestamps for bot patterns
   - Review Google Apps Script logs

3. **Mitigate:**
   - Delete spam responses
   - Tighten rate limits if needed
   - Block specific patterns if identified
   - Consider deploying new survey URLs

4. **Document:**
   - Record incident details
   - Note mitigation steps taken
   - Update security measures
   - Brief team on lessons learned

---

## For Maximum Security

If you need military-grade security:

1. **Self-Host Backend**
   - Deploy on private server
   - Add WAF (Web Application Firewall)
   - Implement CAPTCHA
   - Use Tor hidden service

2. **End-to-End Encryption**
   - Encrypt responses client-side
   - Only decrypt offline
   - Use PGP keys

3. **Air-Gapped Collection**
   - Offline survey collection
   - Manual data entry to secure system
   - No internet connection

**Note:** For most use cases, the built-in security is sufficient. Only escalate if facing nation-state level threats.

---

## Support & Updates

Security is an ongoing process. Stay vigilant:
- Monitor responses regularly
- Update security measures as needed
- Review access logs monthly
- Keep team informed of best practices

**Questions about security?** Review this document and SETUP-GUIDE.md
