// Static preflight only. This does NOT prove live form delivery or CRM integration.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const pages = [
  ['seller-intake.html', 'revmotion-seller-intake'],
  ['buyer-request.html', 'revmotion-buyer-request']
];
for (const [file, formName] of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const form = html.match(/<form\b[^>]*>/i)?.[0];
  assert.ok(form, file + ': form missing');
  assert.match(form, /method=["']POST["']/i, file + ': POST required');
  assert.match(form, /data-netlify=["']true["']/i, file + ': Netlify capture configuration missing');
  assert.ok(form.includes('name="' + formName + '"'), file + ': form identity changed');
  assert.match(html, /type=["']submit["']/i, file + ': submit button missing');
  assert.match(html, /<\/form>/i, file + ': form not closed');
  console.log('Static markup check passed:', file);
}
console.log('NOT VERIFIED: deployed Netlify capture, database persistence, dashboard read, customer receipts, or TitanCore reporting.');
