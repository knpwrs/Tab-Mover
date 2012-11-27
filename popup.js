// Get all tabs in current window
chrome.tabs.getAllInWindow(null, function (tabs) {
  // Create and append header
  var h1 = document.createElement('h1');
  h1.innerHTML = 'Open Tabs:';
  document.body.appendChild(h1);
  // Create list
  var ul = document.createElement('ul'), li = null;
  for (var i = 0; i < tabs.length; i++) {
    li = document.createElement('li');
    li.innerHTML = tabs[i].title;
    ul.appendChild(li);
  }
  // Append list
  document.body.appendChild(ul);
});