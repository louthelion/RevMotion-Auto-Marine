// Static checks for the shared shell after the 2026-11-20 mobile-menu fix:
// every public page except the seller on-hold notice carries a
// <details class="hamb"> mobile menu whose links mirror its desktop nav
// (including a News link); site.css carries the hamburger rules; the
// homepage carries the news section mounts and scripts; the news page
// carries the market lane mount and the renderers know the market lane.
const fs = require('node:fs');
const assert = require('node:assert/strict');

const pages = ['index.html', 'about.html', 'article-archive.html', 'articles.html',
  'auto-opportunities.html', 'blog-archive.html', 'blog.html', 'buyer-request.html',
  'contact.html', 'fees.html', 'how-it-works.html', 'learning-center.html',
  'marine-opportunities.html', 'news.html', 'privacy-policy.html', 'terms-of-use.html'];

for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const hamb = html.match(/<details class="hamb"><summary>Menu<\/summary><nav class="menu">(.*?)<\/nav><\/details>/s);
  assert.ok(hamb, page + ': mobile hamburger menu missing');
  assert.match(hamb[1], /news\.html/, page + ': mobile menu missing News link');
  const desk = html.match(/<header class="top">.*?<nav class="menu">(.*?)<\/nav>/s);
  assert.ok(desk, page + ': desktop nav missing');
  assert.equal(hamb[1], desk[1], page + ': mobile menu links differ from desktop nav');
}

const css = fs.readFileSync('site.css', 'utf8');
assert.match(css, /\.hamb\{display:none\}/, 'site.css: hamburger base rule missing');
assert.match(css, /details\[open\] \.menu\{display:grid/, 'site.css: mobile dropdown rule missing');

const index = fs.readFileSync('index.html', 'utf8');
assert.match(index, /id="home-news"/, 'index.html: homepage news mount missing');
assert.match(index, /id="home-news-edition"/, 'index.html: homepage news edition line missing');
assert.match(index, /src="news-data\.js"/, 'index.html: news-data.js not loaded');
assert.match(index, /src="home-news\.js"/, 'index.html: home-news.js not loaded');

const newsPage = fs.readFileSync('news.html', 'utf8');
assert.match(newsPage, /id="news-market"/, 'news.html: market lane mount missing');
assert.match(fs.readFileSync('news.js', 'utf8'), /"market": "Market"/, 'news.js: market lane missing');
assert.match(fs.readFileSync('home-news.js', 'utf8'), /"market": "Market"/, 'home-news.js: market lane missing');
assert.match(fs.readFileSync('news-data.js', 'utf8'), /lane: "market"/, 'news-data.js: no market stories in the store');

console.log('PASS RevMotion shell: hamburger menus, homepage news, and market lane on ' + pages.length + ' pages');
