//Content Script

"use strict";

var currentInbox = -1; 
var favicon;

function setListenerForNewEmails() {
    var els = document.getElementsByClassName("TK");
    var inbox = els[0];
    if(inbox === undefined) {
        console.log("Not found");
        setTimeout(setListenerForNewEmails, 200);
        //if the element hasn't loaded check again in 200ms
        return;
    }
    else {

        //Config object for the observer
        var config = {
            attributes: true, 
            childList: true, 
            characterData: true, 
            attributeOldValue: true, 
            subtree: true,
            characterDataOldValue: true
        };

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {

                var newInbox = getInbox();
                console.log(newInbox+" emails in your inbox");
                if(newInbox !== currentInbox){
                    if(newInbox > currentInbox){
                        console.log("You got mail!");
                        playSound()
                    }
                    currentInbox = newInbox;
                    setBadge(currentInbox);
                }
            });
        });

        observer.observe(inbox, config);
    }
}

function initInbox(){
    var inbox = getInbox();
    if(inbox === -1){
        setTimeout(initInbox, 200);
    }
    else {
        currentInbox = inbox;
        setBadge(currentInbox);
    }
}

function initFavicon(){
    favicon=new Favico({
        animation:'popFade'
    });
}

function getInbox(){
    try {
        var inbox = document.querySelectorAll("a[href='https://mail.google.com/mail/u/0/#inbox']")[0].textContent;
    } catch (error) {//in case the dom element hasn't loaded yet.
        console.log("error: "+error);
        return -1;
    }
    var openBracket = inbox.indexOf("(");
    var closeBracket = inbox.indexOf(")");
    if ((openBracket !== -1) && (closeBracket !== -1) && (closeBracket > openBracket)){
        return inbox.substring(openBracket+1, closeBracket);
    }
    else return 0;
}

function setBadge(inbox){
    favicon.badge(inbox);
    sendInboxToBackground(currentInbox);
}

function sendInboxToBackground(unread){
    chrome.runtime.sendMessage({inbox: unread}, function(response) {
        console.log(response);
    });
}

function playSound(){
    chrome.runtime.sendMessage({sound: true}, function(response) {
        console.log(response);
    });
}

function setUp(){
    initFavicon();
    initInbox();
    setListenerForNewEmails();
    
    chrome.runtime.sendMessage({open: true}, function(response) {
        console.log(response);
    });

    window.addEventListener("beforeunload", function(){
        chrome.runtime.sendMessage({open: false}, function(response) {
            console.log(response);
        });
    });
}

console.log("hello from the extension");
setUp();
