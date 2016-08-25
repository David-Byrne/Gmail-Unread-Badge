"use strict";

function getCurrentTabUrl(callback) {
    
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        console.dir(tab);
        var url = tab.url;
        console.assert(typeof url == 'string', 'tab.url should be a string');
        callback(url);
    });
}

console.log("Gmail Unread Badge:")
document.addEventListener('DOMContentLoaded', function () {
    getCurrentTabUrl(function (url) {
        if (url.startsWith("https://mail.google.com/mail/u/0/")) {
            console.log("GMAIL!!!");
        }
    });
});
