var icebergsHost = 'https://icebergs.com';

chrome.storage.local.get('IcebergsPageVisted', function(value) {
    //var pageHost = document.location.hostname;
    if (value.IcebergsPageVisted === true)
        return;
    chrome.storage.local.set({
        'IcebergsPageVisted': true
    });
    var a = 'setAttribute';
    var d = document;
    var s = d.createElement('script');
    s[a]('type', 'text/javascript');
    s[a]('src', icebergsHost + '/bookmarklet/tooltip.js');
    d.body.appendChild(s);
});