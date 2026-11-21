// Static preflight only. This does NOT prove live form delivery or CRM integration.
// Updated 2026-11-20: seller intake was taken off the site by PR #10 (seller
// services on hold pending dealer licensing), so seller-intake.html is now an
// on-hold notice and must carry NO form or form-field elements. The buyer
// request form is the one live intake form and keeps its Netlify markup.
const fs = require('node:fs');
const assert = require('node:assert/strict');

const buyer = fs.readFileSync('buyer-request.html', 'utf8');
const form = buyer.match(/<form\b[^>]*>/i)?.[0];
assert.ok(form, 'buyer-request.html: form missing');
assert.match(form, /method=["']POST["']/i, 'buyer-request.html: POST required');
assert.match(form, /data-netlify=["']true["']/i, 'buyer-request.html: Netlify capture configuration missing');
assert.ok(form.includes('name="revmotion-buyer-request"'), 'buyer-request.html: form identity changed');
assert.match(buyer, /type=["']submit["']/i, 'buyer-request.html: submit button missing');
assert.match(form, /netlify-honeypot=["']bot-field["']/i, 'buyer-request.html: honeypot not declared');
assert.match(buyer, /name=["']bot-field["']/i, 'buyer-request.html: honeypot field missing');
assert.match(buyer, /<\/form>/i, 'buyer-request.html: form not closed');
console.log('Static markup check passed: buyer-request.html');

const seller = fs.readFileSync('seller-intake.html', 'utf8');
assert.doesNotMatch(seller, /<form\b/i, 'seller-intake.html: seller form must stay removed (on-hold notice)');
assert.doesNotMatch(seller, /<(input|select|textarea|button)\b/i, 'seller-intake.html: no form fields allowed on the on-hold notice');
console.log('Static markup check passed: seller-intake.html (on-hold notice, no form)');
console.log('NOT VERIFIED: deployed Netlify capture, database persistence, dashboard read, customer receipts, or TitanCore reporting.');
