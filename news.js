/* RevMotion Auto & Marine — news page renderer.
   Reads REVMOTION_NEWS and REVMOTION_NEWS_EDITION from news-data.js
   and renders each story in full into its lane section on news.html,
   newest first. All story text is inserted with textContent, never
   as markup, and the data model carries no link or URL field, so a
   story can never become an outbound door. */
(function () {
  var LANES = {
    "central-florida": "Central Florida",
    "world": "World",
    "coming": "New Cars & Boats Coming"
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

  var editionLine = document.getElementById("news-edition");
  if (editionLine && typeof REVMOTION_NEWS_EDITION !== "undefined") {
    editionLine.textContent = "Edition: " + REVMOTION_NEWS_EDITION.dateDisplay;
  }

  var stories = (typeof REVMOTION_NEWS !== "undefined" ? REVMOTION_NEWS : []).slice();
  stories.sort(function (a, b) {
    if (a.dateISO < b.dateISO) return 1;
    if (a.dateISO > b.dateISO) return -1;
    return 0;
  });

  Object.keys(LANES).forEach(function (lane) {
    var mount = document.getElementById("news-" + lane);
    if (!mount) return;
    var laneStories = stories.filter(function (story) { return story.lane === lane; });
    if (!laneStories.length) {
      mount.appendChild(el("p", "note", "No stories in this lane yet. The next edition adds them here."));
      return;
    }
    laneStories.forEach(function (story) { mount.appendChild(renderStory(story)); });
  });
})();
