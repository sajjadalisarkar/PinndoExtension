(function() {
    if(typeof serverUrl == "undefined"){
        serverUrl="http://localhost:63342/"
    }
    var iframeId="iframe";
    var pinndoframe = document.getElementById(iframeId);

    /**
     * Bar activation functionality
     */
    if (pinndoframe) {
        closePinndoframe(pinndoframe);
        return;
    }
    iframe = document.createElement('iframe');
    iframe.id =iframeId ;
    iframe.src = "http://localhost:63342/PinndoExtension/pinndoframe.html";
    iframe.setAttribute("style", "visibility:visible;z-index: 1000000;position: fixed;top:5px; margin-bottom: 0px;margin-left: 0px;right:1px;width:220px;height: 600px;border: none; overflow: hidden; border-radius:2px;");
    iframe.frameborder = "0";
    document.body.appendChild(iframe);

    /**
     * This function closes the pinndo frame.
     */
    function closePinndoframe(pinndoframe)
    {
        document.body.removeChild(pinndoframe);
    }


    /**
     * Style for the selected text .
     */
    var style = document.createElement('style'),
        bg_color = '#32CCFe',
        text_color = 'inherit';
    style.setAttribute('id','pinndoframestyle');
    style.setAttribute('type', 'text/css');
    style.appendChild(document.createTextNode(['::selection { background:', bg_color, '; color: ', text_color ,'; } ::-moz-selection { background: ', bg_color, '; color: ', text_color ,'; } #iceframeCloseButton{ -webkit-transition: all .3s ease-out; -webkit-transition: all .3s ease-out; -moz-transition: all .3s ease-out; -ms-transition: all .3s ease-out; -o-transition: all .3s ease-out; transition: all .3s ease-out; } #iceframe{ -webkit-transition: all .3s ease-out; -webkit-transition: all .3s ease-out; -moz-transition: all .3s ease-out; -ms-transition: all .3s ease-out; -o-transition: all .3s ease-out; transition: all .3s ease-out; }'].join('')));
    document.body.appendChild(style);

    /**
     * This function add event listeners
     */
    dragzone();

    /**
     * This function is invoked on the "mouseUp" event i.e when the user presses the mouse button to
     * select text. The eventlistener for this function is added from mouseUp event.
     */
    function mouseUp(){

        var selection = getSelText(),selectionHtml = getSelectionHTML();
        setTimeout(function() {
            if(!selection.isCollapsed && selection.toString().trim() !== ""){
                removeHelper();
                var pinndoframe = document.getElementById("iframe");
                if(!pinndoframe) return;

                var pos,
                    dummy = document.createElement("span"),
                    range = selection.getRangeAt(0).cloneRange();
                range.collapse(true);

                range.insertNode(dummy);
                pos = getOffset(dummy);
                dummy.parentNode.removeChild(dummy);
                addHelper(pos.top,pos.left,selection.toString(),selectionHtml);

            }else if(selection.toString()==""){
                removeHelper();
            }
        }, 5);
    }


    /**
     *  This function returns the selected text with its HTML components. Only compatible with
     *  Chrome browser
     */
    function getSelectionHTML() {

        var userSelection;
        if (window.getSelection) {
            userSelection = window.getSelection();
            // Get the range:
            if (userSelection.getRangeAt)
                var range = userSelection.getRangeAt (0);
            else {
                var range = document.createRange ();
                range.setStart(userSelection.anchorNode, userSelection.anchorOffset);
                range.setEnd(userSelection.focusNode, userSelection.focusOffset);
            }
            // And the HTML:
            var clonedSelection = range.cloneContents(),
                div = document.createElement ('div');
            div.appendChild(clonedSelection);
            return div.innerHTML;
        } else {
            return '';
        }
    }

    /**
     * This helper function provides the mechanism to save text to the pinndo frame.
     */
    function addHelper(top, left,selectiontext,selectionHtml){

        var helperId = "helper",
            helper = document.createElement('div');
        helper.style.cssText="-webkit-transition: all .1s ease-out; -webkit-transition: all .1s ease-out; -moz-transition: all .1s ease-out; -ms-transition: all .1s ease-out; -o-transition: all .1s ease-out; transition: all .1s ease-out";
        helper.style.width ="110px";
        helper.style.height ="25px";
        helper.style.backgroundColor ="#32CCFe";
        helper.style.zIndex = 999999;
        helper.id=helperId;

        helper.style.color = "white";
        helper.setAttribute("class", "imagePlaceholder");
        helper.style.fontFamily = "Arial";
        helper.style.fontSize = "11px";
        helper.style.fontWeight = "600";

        helper.style.position = 'absolute';
        helper.style.cursor = 'pointer';
        //helper.style.paddingTop = '7px';
        helper.style.paddingLeft = '10px';
        helper.innerHTML = "<div style='top:7px;position:relative;'><div style='line-height: normal;position:absolute;'>Ajouter</div><img style='position:absolute;left:90px;top:1px;' src='http://localhost:63342/PinndoExtension/pinndo_16.png'></div>";
        helper.style.position = 'absolute';
        helper.style.top = (top-2)+'px';
        helper.style.left = (left+25)+'px';
        helper.style.display = 'block';
        helper.style.margin = "-25px";
        helper.href = 'javascript:void(0)';
        document.body.appendChild(helper);
        helper.addEventListener('click', function(e) {
            document.body.removeChild(helper);
            textdata = {
                source: window.top.location.href,
                title: document.title,
                eventType: 'addText',
                contentdata : selectionHtml
            }
            iframe.contentWindow.postMessage(textdata, serverUrl);
            e.stopPropagation();
        }, true);

        helper.addEventListener('mouseover', function(e) {
            helper.style.paddingTop = '2px';
            helper.style.paddingBottom = '2px';
        }, true);

        helper.addEventListener('mouseout', function(e) {
            helper.style.paddingTop = '0px';
        }, true);

    }

    function getWindow(elem) {
        if (typeof elem === "object" && "setInterval" in elem) {
            return elem;
        } else {
            return elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
        }
    }

    /**
     *  This function removes the helper provided for Saving Text.
     */
    function removeHelper() {
        var helper = document.getElementById("helper");
        if (helper) {
            document.body.removeChild(helper);
        }
    }

    /**
     *  This function returns the selected text.
     */
    function getSelText(){
        var txt = '';
        if (window.getSelection){
            txt = window.getSelection();
        }else if (document.getSelection){
            txt = document.getSelection();
        }else if (document.selection){
            txt = document.selection.createRange().text;
        }

        return txt;
    }

    /**
     *  This function is invoked on every run of this javascript which essentially adds
     *  event listeners for the events:
     *
     *  mouseUp : For the text selection
     *
     */
    function dragzone(){
        document.addEventListener('mouseup', mouseUp, true);
    }

    /**
     *  This function closes the pinndo frame if already open
     */
    function closePinndoframe()
    {
        var pinndoframe = document.getElementById(iframeId);
        document.body.removeChild(pinndoframe);
    }

    /**
     * This function returns the co-ordinates of the selected text, so that the
     * save text button can be placed accordingly.
     */
    function getOffset(elem) {

        function contains(a, b) {

            return a !== b && (a.contains ? a.contains(b) : true);
        }

        var div = document.createElement("div");
        div.style.width = div.style.paddingLeft = "1px";
        document.body.appendChild(div);
        var boxModel = div.offsetWidth === 2;
        document.body.removeChild(div);

        var box;
        if (!elem || !elem.ownerDocument) {
            return null;
        }
        try {
            box = elem.getBoundingClientRect();
        } catch(e) {}

        var doc = elem.ownerDocument, docElem = doc.documentElement;
        if (!box || !contains(docElem, elem)) {

            return box ? {
                top: box.top,
                left: box.left
            } : {
                top: 0,
                left: 0
            };
        }
        var body = doc.body,
            win = getWindow(doc),
            clientTop  = docElem.clientTop  || body.clientTop  || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            scrollTop  = (win.pageYOffset || boxModel && docElem.scrollTop  || body.scrollTop ),
            scrollLeft = (win.pageXOffset || boxModel && docElem.scrollLeft || body.scrollLeft),
            top  = box.top  + scrollTop  - clientTop,
            left = box.left + scrollLeft - clientLeft;
        return {
            top: top,
            left: left,
            width: box.width,
            height: box.height
        };
    }
})();
