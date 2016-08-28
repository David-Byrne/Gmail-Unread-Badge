//Event page

function updateExtensionBadge(inbox){
    console.log("badge = "+inbox);
    if(inbox === "0") inbox = "";
    chrome.browserAction.setBadgeText({text: inbox});
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        updateExtensionBadge(String(request.inbox));
        sendResponse({response: "Thanks :)"});
    }
);
