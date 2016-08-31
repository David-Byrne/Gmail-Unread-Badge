//Event page

function updateExtensionBadge(inbox){
    console.log("badge = "+inbox);
    if(inbox === "0") inbox = "";
    chrome.browserAction.setBadgeText({text: inbox});
}

function playSound(){
    var yourSound = new Audio('solemn.mp3');
    yourSound.play();
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        if (request.inbox !== undefined) updateExtensionBadge(String(request.inbox));
        else if (request.sound !== undefined) playSound();
        sendResponse({response: "Thanks :)"});
    }
);
