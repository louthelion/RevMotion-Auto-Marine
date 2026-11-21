/* RevMotion Auto & Marine — homepage news renderer.
   Reads REVMOTION_NEWS and REVMOTION_NEWS_EDITION from news-data.js
   and prints the newest story from each lane in full into the
   homepage news section. Same pattern as news.js: every string is
   inserted with textContent, never as markup, and the data model
   carries no link or URL field, so a story can never become an
   outbound door. The full archive lives on news.html (/news). */
(function () {
  var LANES = {
    "central-florida": "Central Florida",
    "world": "World",
    "coming": "New Cars & Boats Coming",
    "market": "Market"
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderStory(story) {
    var article = el("article", "post");
    article.appendChild(el("span", "tag", LANES[story.lane] || story.lane));
    article.appendChild(el("h3", null, story.headline));
    article.appendChild(el("p", "storydate", story.dateDisplay));
    (story.body || []).forEach(function (paragraph) {
      article.appendChild(el("p", null, paragraph));
    });
    article.appendChild(el("p", "source", "Source: " + story.source + " — " + story.sourceDate));
    return article;
  }

  var editionLine = document.getElementById("home-news-edition");
  if (editionLine && typeof REVMOTION_NEWS_EDITION !== "undefined") {
    editionLine.textContent = "Edition: " + REVMOTION_NEWS_EDITION.dateDisplay +
      " — the newest story from each lane, printed in full.";
  }

  var mount = document.getElementById("home-news");
  if (!mount) return;

  var stories = (typeof REVMOTION_NEWS !== "undefined" ? REVMOTION_NEWS : []).slice();
  stories.sort(function (a, b) {
    if (a.dateISO < b.dateISO) return 1;
    if (a.dateISO > b.dateISO) return -1;
    return 0;
  });

  var shown = 0;
  Object.keys(LANES).forEach(function (lane) {
    var newest = null;
    stories.forEach(function (story) {
      if (!newest && story.lane === lane) newest = story;
    });
    if (newest) {
      mount.appendChild(renderStory(newest));
      shown++;
    }
  });

  if (!shown) {
    mount.appendChild(el("p", "note", "The next edition of RevMotion News is being prepared. The archive is on the news page."));
  }
})();
