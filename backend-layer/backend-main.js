let lastTabId;
//structure for holding and reserving project settings
currentSettings = {
   gridIsEnabled : false
};

//acquiring last tab's ID
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
   lastTabId = tabs[0].id;
});

//maitaining track of the current tab ID
chrome.tabs.onSelectionChanged.addListener(function(tabId) {
   lastTabId = tabId;
});

//message event listener -- To be replaced with a persistent communication port instead of a single time message passing
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
   switch(message){
      case 'settingsOpened':
         sendResponse(currentSettings);
         break;
      case 'enableGrid':
         currentSettings.gridIsEnabled = true;
         chrome.tabs.insertCSS(null, {file: "content-layer/content-main.css"});
         chrome.tabs.executeScript(null, {file: "content-layer/content-main.js"});
         break;
      case 'disableGrid':
         currentSettings.gridIsEnabled = false;
         break;
   }
});