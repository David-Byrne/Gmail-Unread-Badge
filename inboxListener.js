//Content Script

"use strict";

var currentInbox = -1; 

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
        currentInbox = getInbox();
        setFaviconBadge(currentInbox);
        
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
                var entry = {
                    mutation: mutation,
                    el: mutation.target,
                    value: mutation.target.textContent,
                    oldValue: mutation.oldValue
                };
                //console.log('Recording mutation:', entry);
                var newInbox = getInbox();
                console.log(newInbox+" emails in your inbox");
                if(newInbox !== currentInbox){
                    if(newInbox > currentInbox){
                        console.log("You got mail!");
                    }
                    currentInbox = newInbox;
                    setFaviconBadge(currentInbox);
                }
            });
        });

        observer.observe(inbox, config);
    }
}

function getInbox(){
    var inbox = document.querySelectorAll("a[href='https://mail.google.com/mail/u/0/#inbox']")[0].textContent;
    var openBracket = inbox.indexOf("(");
    var closeBracket = inbox.indexOf(")");
    if ((openBracket !== -1) && (closeBracket !== -1) && (closeBracket > openBracket)){
        return inbox.substring(openBracket+1, closeBracket);
    }
    else return 0;
}

function setFaviconBadge(inbox){
    var favicon=new Favico({
        animation:'popFade'
    });
    favicon.badge(inbox);
}

console.log("hello from the extension");
setListenerForNewEmails();