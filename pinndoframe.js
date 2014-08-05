(function() {

    var iframeId="iframe";
    var iceframe = document.getElementById(iframeId);
    if (iceframe) {
        closeIceframe();
        return;
    }
    iframe = document.createElement('iframe');
    iframe.id =iframeId ;
    //iframe.src ="http://localhost:63342/PinndoExtension/pinndoFrameSampleDOM.html";
    iframe.src = "http://localhost:63342/PinndoExtension/pinndoframe.html";
    iframe.setAttribute("style", "visibility:visible;z-index: 1000000;position: fixed;top:5px; margin-bottom: 0px;margin-left: 0px;right:1px;width:220px;height: 600px;border: none; overflow: hidden; border-radius:2px;");
    iframe.frameborder = "0";
    document.body.appendChild(iframe);
    function closeIceframe()
    {
        var iceframe = document.getElementById(iframeId);
        document.body.removeChild(iceframe);
    }
})();
