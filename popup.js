// Input element
var queryBox = document.getElementById('query');

// Listen for clicks on the new window button
document.getElementById('new-window').addEventListener('click', function (e) {
  e.preventDefault();
  getMatchingTabs(queryBox.value, function (tabs) {
    chrome.windows.create(function (window) {
      chrome.tabs.move(tabs, {index: 0, windowId: window.id});
    });
  });
});
// Listen for clicks on the move to beginning button
document.getElementById('move-beginning').addEventListener('click', function (e) {
  e.preventDefault();
  getMatchingTabs(queryBox.value, function (tabs) {
    chrome.tabs.move(tabs, {index: 0});
  });
});

// Get all tabs which match given query
function getMatchingTabs(query, callback) {
  var re;
  if (/^\/.+\/$/.test(query)) {
    re = new RegExp(query.substring(1, query.length - 1));
  } else {
    re = new RegExp(query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'));
  }
  var matches = [];
  chrome.tabs.getAllInWindow(null, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      if (re.test(tabs[i].url)) {
        matches.push(tabs[i].id);
      }
    }
    callback(matches);
  });
}