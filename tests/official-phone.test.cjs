const fs=require('node:fs'),assert=require('node:assert/strict');
const pages=['index.html','about.html','article-archive.html','articles.html','auto-opportunities.html','blog-archive.html','blog.html','buyer-request.html','contact.html','fees.html','how-it-works.html','learning-center.html','marine-opportunities.html','privacy-policy.html','seller-intake.html','terms-of-use.html'];
for(const page of pages){const html=fs.readFileSync(page,'utf8');assert.match(html,/tel:\+14077988755/,page+' missing official call link');assert.match(html,/407\) 798-8755/,page+' missing readable number');assert.match(html,/position:fixed;bottom:0/,page+' missing mobile call bar');}
assert.doesNotMatch(fs.readFileSync('contact.html','utf8'),/Phone number coming through central company phone system/);
console.log('PASS RevMotion official phone and tap-to-call on '+pages.length+' pages');
