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
                var entry = {
                    mutation: mutation,
                    el: mutation.target,
                    value: mutation.target.textContent,
                    oldValue: mutation.oldValue
                };
                console.log('Recording mutation:', entry);
            });
        });

        observer.observe(inbox, config);
    }
}
console.log("hello from the extension");
setListenerForNewEmails();