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

function setOpenTabs(open){
    console.log("passed in"+open);
    chrome.storage.local.get('tabsOpen', function(obj) {
        console.log('read '+obj.tabsOpen);

        if (open === true) open = obj.tabsOpen + 1;
        else if (open === false) open = obj.tabsOpen - 1;
        //else it must already be a number, ie. the number of tabs open
        if (open < 0) open = 0;//stop it from accidentally going negative somewhere.

        chrome.storage.local.set({'tabsOpen': open}, function() {
            changeIcon(open);
        });

    });
}

function changeIcon(tabsOpen){
    var file = "";
    if(tabsOpen > 0){
        file="icon-19.png";
    }
    else{
        file="icon-off.png";
        updateExtensionBadge("");//change the badge to blank as extension is no longer active
    }
    chrome.browserAction.setIcon({
        path : file
    });
}

setOpenTabs(0);//We have to assume no tab is opened when we launch the extension...

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        if (request.inbox !== undefined) updateExtensionBadge(String(request.inbox));
        else if (request.sound !== undefined) playSound();
        else if (request.open !== undefined) setOpenTabs(request.open);
        sendResponse({response: "Thanks :)"});
    }
);
