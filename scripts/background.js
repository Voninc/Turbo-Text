let isEnabled = false;

chrome.browserAction.onClicked.addListener(function (tab) {
  isEnabled = !isEnabled;
  chrome.storage.sync.set({ isEnabled: isEnabled });
});
