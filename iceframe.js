(function() {

    /** Base64 encode / decode http://www.webtoolkit.info/ **/
    function base64Converter(e,t){Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};switch(e){case"encode":return Base64.encode(t);case"decode":return Base64.decode(t)}}

    if(typeof serverUrl == "undefined"){
        serverUrl="https://icebergs.com/"
    }
    if(window.location.href.indexOf(serverUrl)>=0){
        return;
    }

	var iframeSrc = serverUrl+"bookmarklet/bookmarklet?parenturl="+btoa(window.location)+"&title="+base64Converter("encode",document.title)+"&originhostname="+btoa(document.location.hostname),
	    iframeId = "iceframe",
        iframeHeight = 210,
	    selection;

	// Append / remove iceframe
	var iceframe = document.getElementById(iframeId);
	if (iceframe) {
		closeIceframe();
        return;
	}

	iframe = document.createElement('iframe');
	iframe.src = iframeSrc;
    iframe.setAttribute("style","visibility:hidden;z-index: 1000000;position: fixed;bottom: 10px;margin-bottom: 0px;margin-left: 0px;left: 10px;width: 210px;height: 210px;border: none;overflow: hidden;background-image: url("+serverUrl+"/img/bg-icedrop-detail.png);-moz-border-radius:2px;-webkit-border-radius:2px;border-radius:2px;");
	iframe.frameborder = "0";
	iframe.id = iframeId;
	iframe.allowtransparency = true;
    iframe.addEventListener('mouseover', showCloseIceframe, false);
    iframe.addEventListener('mouseout', closeCloseIceframe, false);
    iframe.addEventListener('load', function(){
        var iceframe = document.getElementById("iceframe");
        iceframe.style.visibility="visible";
    }, false);
    iframe.addEventListener("appear",function(){
        var iceframeCloseButton = document.getElementById("iceframeCloseButton");
        iceframeCloseButton.style.display = "block";
    });
    document.body.appendChild(iframe);

    // Append selection style
    var style = document.createElement('style'),
        bg_color = '#00CCFF',
        text_color = 'inherit';
    style.setAttribute('id','iceframestyle');
    style.setAttribute('type', 'text/css');
    style.appendChild(document.createTextNode(['::selection { background:', bg_color, '; color: ', text_color ,'; } ::-moz-selection { background: ', bg_color, '; color: ', text_color ,'; } #iceframeCloseButton{ -webkit-transition: all .3s ease-out; -webkit-transition: all .3s ease-out; -moz-transition: all .3s ease-out; -ms-transition: all .3s ease-out; -o-transition: all .3s ease-out; transition: all .3s ease-out; } #iceframe{ -webkit-transition: all .3s ease-out; -webkit-transition: all .3s ease-out; -moz-transition: all .3s ease-out; -ms-transition: all .3s ease-out; -o-transition: all .3s ease-out; transition: all .3s ease-out; }'].join('')));
    document.body.appendChild(style);

	// Append / remove dragger
	var draggerId = "icedrag";
	dragger = document.createElement('div');
	dragger.style.bottom = '87px';
	dragger.style.left = '23px';
	dragger.style.width ="180px";
	dragger.style.height ="130px";
	dragger.style.zIndex =1000001;
	dragger.style.marginBottom = '0';
	dragger.style.marginLeft = '0';
	dragger.style.position ='fixed';
	dragger.id = draggerId;
	dragger.style.display = "none";
	dragger.style.filter = 'alpha(opacity=0)';
	dragger.style['-moz-opacity'] = '0.0';
	dragger.style.opacity = '0.0';
	var iceDrag = document.getElementById(draggerId);
	if(iceDrag){
		document.body.removeChild(iceDrag);
	}else{
		document.body.appendChild(dragger);
		dragzone();
	}

    // Append / remove open icebergs page zone
    var openIcebergsPageZoneId = "openIcebergsPageZone";
    openIcebergsPageZone = document.createElement('a');
    openIcebergsPageZone.style.bottom = '10px';
    openIcebergsPageZone.style.left = '10px';
    openIcebergsPageZone.style.width ="210px";
    openIcebergsPageZone.style.height ="40px";
    openIcebergsPageZone.style.zIndex =1000002;
    openIcebergsPageZone.style.marginBottom = '10';
    openIcebergsPageZone.style.marginLeft = '0';
    openIcebergsPageZone.style.position ='fixed';
    openIcebergsPageZone.id = openIcebergsPageZoneId;
    openIcebergsPageZone.style.display = "none";
    openIcebergsPageZone.style.cursor = "pointer";
    openIcebergsPageZone.style.filter = 'alpha(opacity=0)';
    openIcebergsPageZone.style['-moz-opacity'] = '0.0';
    openIcebergsPageZone.style.opacity = '0.0';
    var iceOpenIcebergs = document.getElementById(openIcebergsPageZoneId);
    if(iceOpenIcebergs){
        document.body.removeChild(iceOpenIcebergs);
    }else{
        document.body.appendChild(openIcebergsPageZone);
    }

    openIcebergsPageZone.addEventListener('mouseover', showCloseIceframe, false);
    openIcebergsPageZone.addEventListener('mouseout', closeCloseIceframe, false);

    var openRegisterZoneId = "openRegisterZone",
        openRegisterZone = document.createElement('a');
    openRegisterZone.style.bottom = '20px';
    openRegisterZone.style.left = '30px';
    openRegisterZone.style.width ="42px";
    openRegisterZone.style.height ="12px";
    openRegisterZone.style.zIndex = 1000002;
    openRegisterZone.style.marginBottom = '10';
    openRegisterZone.style.marginLeft = '130px';
    openRegisterZone.style.position ='fixed';
    openRegisterZone.id = openRegisterZoneId;
    openRegisterZone.style.display = "block";
    openRegisterZone.style.cursor = "pointer";
    openRegisterZone.style.filter = 'alpha(opacity=0)';
    openRegisterZone.style['-moz-opacity'] = '0.0';
    openRegisterZone.style.opacity = '0.0';
    openRegisterZone.setAttribute("href",serverUrl+"users/register");
    openRegisterZone.setAttribute("target","_blank");
    var openRegisterZoneChild = document.getElementById(openRegisterZoneId);
    if(openRegisterZoneChild){
        document.body.removeChild(openRegisterZoneChild);
    }else{
        document.body.appendChild(openRegisterZone);
    }

    openRegisterZone.addEventListener('mouseover', showCloseIceframe, false);
    openRegisterZone.addEventListener('mouseout', closeCloseIceframe, false);

    //Add close iceframe button
    var iceframeCloseId = "iceframeCloseButton",
        iceframeclose = document.createElement('img');
    iceframeclose.style.bottom = '198px';
    iceframeclose.style.left = '192px';
    iceframeclose.style.width ="25px";
    iceframeclose.style.height ="22px";
    iceframeclose.style.zIndex =999999;
    iceframeclose.style.marginBottom = '0';
    iceframeclose.style.cursor = 'pointer';
    iceframeclose.setAttribute("src",serverUrl+"/img/iceframe/cross.png");
    iceframeclose.style.marginLeft = '0';
    iceframeclose.style.position ='fixed';
    iceframeclose.id = iceframeCloseId;
    iceframeclose.style.display = "block";
    document.body.appendChild(iceframeclose);
    iceframeclose.addEventListener('click', closeIceframe, true);
    iceframeclose.addEventListener('mouseover', function(){
        showCloseIceframe(true);
    }, true);

    //Add iceframe zone button
    var iceframezoneId = "iceframezone",
        iceframezone = document.createElement('div');
    iceframezone.style.bottom = '10px;';
    iceframezone.style.left = '10px';
    iceframezone.style.bottom = '10px';
    iceframezone.style.width ="210px";
    iceframezone.style.height ="235px";
    iceframezone.style.zIndex =999998;
    iceframezone.style.marginBottom = '0';
    iceframezone.style.marginLeft = '0';
    iceframezone.style.position ='fixed';
    iceframezone.id = iceframezoneId    ;
    iceframezone.style.display = "block";
    document.body.appendChild(iceframezone);
    iceframezone.addEventListener('mouseover', showCloseIceframe, false);
    iceframezone.addEventListener('mouseout', closeCloseIceframe, false);

    //Set iceframe loading
    var iceframeLoadId = "iceframeLoad",
        iceframeLoad = document.createElement('div');
    iceframeLoad.style.bottom = '10px';
    iceframeLoad.style.left = '10px';
    iceframeLoad.style.width ="210px";
    iceframeLoad.style.height ="210px";
    iceframeLoad.style.zIndex =999999;
    iceframeLoad.style.marginBottom = '0';
    iceframeLoad.style.marginLeft = '0';
    iceframeLoad.style.position ='fixed';
    iceframeLoad.style.backgroundColor ='#22252a';
    iceframeLoad.style.backgroundImage ="url("+serverUrl+"/img/loading_black2.gif)";
    iceframeLoad.style.backgroundPosition ="center center";
    iceframeLoad.style.backgroundRepeat ="no-repeat";
    iceframeLoad.id = iceframeLoadId;
    iceframeLoad.style.display = "block";
    iceframeLoad.style.filter = 'alpha(opacity=1)';
    iceframeLoad.style['-moz-opacity'] = '1.0';
    iceframeLoad.style.opacity = '1.0';

     document.body.appendChild(iceframeLoad);

    // Add need help button
    var needHelpButtonId = "needHelpButton",
        needHelpButton = document.createElement('div');
    needHelpButton.style.bottom = '216px';
    needHelpButton.style.left = '65px';
    needHelpButton.style.width ="100px";
    needHelpButton.style.height ="22px";
    needHelpButton.style.zIndex =999999;
    needHelpButton.style.marginBottom = '0';
    needHelpButton.style.cursor = 'pointer';
    needHelpButton.style.marginLeft = '0';
    needHelpButton.style.position ='fixed';
    needHelpButton.style.WebkitTransition =' all .3s ease-out';
    needHelpButton.style.MozTransition =' all .3s ease-out';
    needHelpButton.id = needHelpButtonId;
    needHelpButton.style.display = "block";
    needHelpButton.innerHTML="Need some help?";
    needHelpButton.style.fontFamily="Lucida Grande";
    needHelpButton.style.fontSize="11px";
    needHelpButton.style.color="rgb(153,153,153)";
    needHelpButton.style.textAlign="center";
    document.body.appendChild(needHelpButton);
    needHelpButton.addEventListener('click', function(){
        var firsttimepopup = getFirstTimePopup();
        firsttimepopup.style.display = "block";
    }, true);

    function getFirstTimePopup()
    {
        var firstTimePopupId = "firstTimePopup",
            firstTimePopup = document.getElementById(firstTimePopupId);
        if (firstTimePopup) return firstTimePopup;

        // Add first time popup
        firstTimePopup = document.createElement('div');
        firstTimePopup.id = firstTimePopupId;
        firstTimePopup.style.top = '50px';
        firstTimePopup.style.width ="550px";
        firstTimePopup.style.height ="580px";
        firstTimePopup.style.backgroundColor="rgba(17,17,17,0.95)";
        firstTimePopup.style.marginLeft="-275px";
        firstTimePopup.style.left="50%";
        firstTimePopup.style.zIndex = 999998;
        firstTimePopup.style.position ='fixed';
        firstTimePopup.style.display = "none";
        firstTimePopup.innerHTML='<div style="width:470px;height:120px;left:50%;margin-left:-235px;position: relative;top:47px;"><div style="font-size: 32px;color: rgb(255,255,255);text-align: center;font-weight: 300;font-family: Lucida Grande;">Hi there polar bear!</div><div style="font-size: 16px;color: rgb(255,255,255);margin-top: 30px;padding-left: 84px;font-weight:300;text-align: center;font-family: Lucida Grande;padding-right: 84px;"> Here\'s a short video to show you how to save <span style="font-weight: bold;">images, text, videos</span> and <span style="font-weight: bold;">websites</span> to your Icebergs account. </div><div style="margin-top:30px;"><iframe src="//player.vimeo.com/video/58444437?portrait=0&byline=0&title=0" width="472" height="278" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe></div></div><div id="closeFirstTimeButton" style="background-image: url(https://icebergs.com/img/cross_popup.png);width: 24px;height: 24px;cursor: pointer;position: absolute;top: 30px;right: 30px;"></div>';
        document.body.appendChild(firstTimePopup);

        var closeButton = document.getElementById("closeFirstTimeButton");
        closeButton.addEventListener('click', function(){
            document.body.removeChild(firstTimePopup);
        }, true);

        return firstTimePopup;
    }

    function closeCloseIceframe(){
        var iceframeCloseButton = document.getElementById("iceframeCloseButton"),
            iceframe = document.getElementById("iceframe");
        iceframeCloseButton.style.bottom = (parseInt(iceframe.style.height)+10-25)+"px";
    }

    function showCloseIceframe(higher){
        var iceframeCloseButton = document.getElementById("iceframeCloseButton"),
            iceframe = document.getElementById("iceframe");

        if(higher===true){
            iceframeCloseButton.style.bottom = (parseInt(iceframe.style.height)+10)+"px";
        }else{
            iceframeCloseButton.style.bottom =  (parseInt(iceframe.style.height)+10-3)+"px";
        }
    }

    function closeIceframe(){
        var iceframe = document.getElementById("iceframe");
        document.body.removeChild(iceframe);

        var dragger = document.getElementById("icedrag");
        document.body.removeChild(dragger);

        var openRegisterZone = document.getElementById("openRegisterZone");
        document.body.removeChild(openRegisterZone);

        var iceframezone = document.getElementById("iceframezone");
        document.body.removeChild(iceframezone);

        var openIcebergsPageZone = document.getElementById("openIcebergsPageZone");
        document.body.removeChild(openIcebergsPageZone);

        var firstTimePopup = document.getElementById("firstTimePopup");
        if (firstTimePopup) document.body.removeChild(firstTimePopup);

        var needHelpButton = document.getElementById("needHelpButton");
        document.body.removeChild(needHelpButton);

        var iceframeCloseButton = document.getElementById("iceframeCloseButton");
        document.body.removeChild(iceframeCloseButton);

        var iceframeLoading = document.getElementById("iceframeLoad");
        document.body.removeChild(iceframeLoading);

        var imageBorders = document.getElementsByClassName("imageBorder"),
            length = imageBorders.length;
        for(var i=0;i<length;i++){
            document.body.removeChild(imageBorders[0]);
        }

        var imagePlaceholders = document.getElementsByClassName("imagePlaceholder"),
            length = imagePlaceholders.length;
        for(var i=0;i<length;i++){
            document.body.removeChild(imagePlaceholders[0]);
        }

        document.getElementById('iceframestyle').remove();
    }

    function dragzone(){
		dragger.addEventListener('dragover', dragOver, false);
		dragger.addEventListener('dragenter', dragEnter, false);
		dragger.addEventListener('dragleave', dragLeave, false);
		dragger.addEventListener('drop', drop, false);
		document.addEventListener('dragstart', dragStart, true);
		document.addEventListener('dragend', dragEnd, true);
		document.addEventListener('mousedown', mouseDown, true);
		document.addEventListener('mouseup', mouseUp, true);
	}

	function dragOver(e){
		e.stopPropagation();
		e.preventDefault();
	}

	function dragEnter(e){
       var eventdata = {
            eventType: 'dragEnter'
        }
        iframe.contentWindow.postMessage(eventdata, serverUrl);
		e.stopPropagation();
		e.preventDefault();
	}

	function dragLeave(e){
        var eventdata = {
            eventType: 'dragLeave'
        }
        iframe.contentWindow.postMessage(eventdata, serverUrl);
		e.stopPropagation();
		e.preventDefault();
	}

	function drop(e){
		e.stopPropagation();
		e.preventDefault();
		//alert(dataset.type);
        var iceOpenIcebergs = document.getElementById("openIcebergsPageZone");
        iceOpenIcebergs.style.display = "none";
		iframe.contentWindow.postMessage(dataset, serverUrl);
		return false;
	}

	function mouseDown(){
		selection = getSelText();
		setTimeout(function() {
			if(selection.isCollapsed && selection.toString().trim() == ""){
				//document.body.removeChild(helper);
			}
		}, 0);
	}

	function mouseUp(){
        if(typeof(showingBookmarklet)=="undefined"){
            return;
        }

        if(!showingBookmarklet){
            return;
        }

		var selection = getSelText(),
            selectionHtml=getSelectionHTML();

		setTimeout(function() {
			if(!selection.isCollapsed && selection.toString().trim() !== ""){
                removeHelper();
                var iceframe = document.getElementById("iceframe");
                if(!iceframe) return;

				var pos,
                    dummy = document.createElement("div"),
				    range = selection.getRangeAt(0).cloneRange();
				range.collapse(false);
				range.insertNode(dummy);
                pos = getOffset(dummy);
				dummy.parentNode.removeChild(dummy);
                addHelper(pos.top, pos.left,selection.toString(),selectionHtml);

			}else if(selection.toString()==""){
                removeHelper();
            }
		}, 5);
	}

    function removeHelper() {
        var helper = document.getElementById("helper");
        if (helper) {
            document.body.removeChild(helper);
        }
    }

    var getSelectionHTML = function () {
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
        } else if (document.selection) {
            // Explorer selection, return the HTML
            userSelection = document.selection.createRange ();
            return userSelection.htmlText;
        } else {
            return '';
        }
    };

	function addHelper(top, left,selectiontext,selectionHtml){
		var helperId = "helper",
            helper = document.createElement('div');
        helper.style.cssText="-webkit-transition: all .1s ease-out; -webkit-transition: all .1s ease-out; -moz-transition: all .1s ease-out; -ms-transition: all .1s ease-out; -o-transition: all .1s ease-out; transition: all .1s ease-out";;
        helper.style.width ="110px";
        helper.style.height ="25px";
        helper.style.backgroundColor ="rgb(33,37,42)";
		helper.style.zIndex = 999999;
		helper.id=helperId;;
        helper.style.color = "white";
        helper.setAttribute("class", "imagePlaceholder");
        helper.style.fontFamily = "Arial";
        helper.style.fontSize = "11px";
        helper.style.fontWeight = "600";
        helper.style.position = 'absolute';
        helper.style.cursor = 'pointer';
        //helper.style.paddingTop = '7px';
        helper.style.paddingLeft = '10px';
        helper.innerHTML = "<div style='top:7px;position:relative;'><div style='line-height: normal;position:absolute;'>Save Text</div><img style='position:absolute;left:90px;top:1px;' src='"+serverUrl+"/img/iceframe/check_small_blue.png'></div>";
		helper.style.position = 'absolute';
		helper.style.top = (top-2)+'px';
		helper.style.left = left+'px';
		helper.style.display = 'block';
		helper.href = 'javascript:void(0)';
		document.body.appendChild(helper);
		helper.addEventListener('click', function(e) {
            var iceOpenIcebergs = document.getElementById("openIcebergsPageZone");
            iceOpenIcebergs.style.display = "none";
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
            // this.style.height=(parseInt(this.style.height)+3)+"px";
        }, true);

        helper.addEventListener('mouseout', function(e) {
            helper.style.paddingTop = '0px';
            // this.style.height=(parseInt(this.style.height)-3)+"px";
        }, true);

	}
	function dragStart(e) {
        dragger.style.height="194px";
        dragger.style.bottom="33px";
		iframe.contentWindow.postMessage({eventType: 'dragStart'}, serverUrl);
		dragger.style.display = 'block';
		var imgSrc,
            matchInfo,
            data = {source: window.top.location.href, title: document.title}
		if (e.target.nodeName === 'IMG' || e.target.nodeName === 'img') {
            data.title=document.title;
            data.via=window.location.href;
			data.type = 'image';
			data.eventType = 'addImage';
			data.imgSrc = e.target.src;
			data.width = e.target.width;
			data.height = e.target.height;
		}
        else if(getChildImage(e.target).length>0){
            var image=getChildImage(e.target)[0];
            data.title=document.title;
            data.via=window.location.href;
            data.type = 'image';
            data.eventType = 'addImage';
            data.imgSrc = image.getAttribute("src");
            data.width = image.clientWidth;
            data.height = image.clientHeight;
        }
        else if (e.target.style) {
			if (imgSrc = e.target.style.backgroundImage) {
				matchInfo = imgSrc.match(/^url\((.*)\)$/);
				if (matchInfo && matchInfo[1]) {
					data.imgSrc = matchInfo[1];
				}
				data.type = 'image';
				data.eventType = 'addImage';
			}
		}
		if (data.imgSrc && data.imgSrc.indexOf('http') != 0) {
		    data.imgSrc = location.protocol + data.imgSrc;
		}
		dataset = data;
	}

    function getChildImage(element){
        if (element.getElementsByTagName)
            return element.getElementsByTagName('img');
        return [];
    }

	function dragEnd() {
		dragger.style.display = 'none';
		iframe.contentWindow.postMessage({eventType: 'dragEnd'},serverUrl);
	}

	function getSelText(){
		var txt = '';
		if (window.getSelection){
			txt = window.getSelection();
		}else if (document.getSelection){
			txt = document.getSelection();
		}else if (document.selection){
			txt = document.selection.createRange().text;
		}
		else return;
		return txt;
	}

	function getOffset(elem) {
		function contains(a, b) { return a !== b && (a.contains ? a.contains(b) : true); }
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
			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
		}
		var body = doc.body,
			win = getWindow(doc),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = (win.pageYOffset || boxModel && docElem.scrollTop  || body.scrollTop ),
			scrollLeft = (win.pageXOffset || boxModel && docElem.scrollLeft || body.scrollLeft),
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;
		return { top: top, left: left, width: box.width, height: box.height };
	}
	function getWindow(elem) {
		if (typeof elem === "object" && "setInterval" in elem) {
			return elem;
		} else {
			return elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
		}
	}
	window.addEventListener("message", receiveMessage, false);

	function receiveMessage(e){
        switch (e.data.eventType) {
            case 'setHeight':
                setHeight(e.data);
                break;
            case 'openIcedrop':
                var iceOpenIcebergs = document.getElementById("openIcebergsPageZone");
                iceOpenIcebergs.style.display = "block";
                iceOpenIcebergs.setAttribute(
                    "href",serverUrl+"?iceberg="+e.data.icebergId+"&icedrop="+e.data.icedropId
                );
                iceOpenIcebergs.setAttribute("target","_blank");
                break;
            case 'removeFileZone':
                var iceOpenIcebergs = document.getElementById("openIcebergsPageZone");
                iceOpenIcebergs.style.display = "none";
                break;
            case 'hideLogin':
                var openRegisterZone = document.getElementById("openRegisterZone");
                openRegisterZone.style.display = "none";
                var iceOpenIcebergs = document.getElementById("openIcebergsPageZone");
                iceOpenIcebergs.style.display = "none";
                showingBookmarklet=true;
                prepareVideos();
                break;
            case 'showLogin':
                var openRegisterZone = document.getElementById("openRegisterZone");
                openRegisterZone.style.display = "block";
                break;
            case 'firstTimePopup':
                var firstTimePopup = getFirstTimePopup();
                firstTimePopup.style.display = "block";
                break;
        }
	}
	function setHeight(d){
		var iceFrame = document.getElementById("iceframe");
		iceFrame.style.height = iframeHeight+d.height+'px';
        var iceframeCloseButton = document.getElementById("iceframeCloseButton");
        iceframeCloseButton.style.bottom =  (198+d.height)+"px";
        var needHelpButton = document.getElementById("needHelpButton");
        needHelpButton.style.bottom =  (216+d.height)+"px";
        var iceframezone = document.getElementById("iceframezone");
        iceframezone.style.bottom =  (iceframezone.style.bottom+d.height)+"px";
    }

    function prepareVideos(){
        var doc = document.getElementsByTagName('iframe');
        for(var i=0; i< doc.length ; i++){
            iframeurl = doc[i].src;
            if(iframeurl=='http://player.vimeo.com/video/58444437?portrait=0&byline=0&title=0') continue;
            posiframe = getOffset(doc[i]);
            if(iframeurl.indexOf("player.vimeo.com") != -1 || iframeurl.indexOf("youtube.com/embed") != -1|| iframeurl.indexOf("youtube.com/v") != -1 || iframeurl.indexOf("youtube.com/watch?v=") != -1){
                createVideoFrame(iframeurl,posiframe);
            }
        }
        var docEmbed = document.getElementsByTagName('embed');
        for(var i=0; i< docEmbed.length ; i++){
            iframeurl = docEmbed[i].src;
            posiframe = getOffset(docEmbed[i]);
            if(iframeurl.indexOf("vimeo.com") != -1 || iframeurl.indexOf("youtube.com/v") != -1){
                createVideoFrame(iframeurl,posiframe)
            }
        }
        // Vimeo page case
        if(window.location.host=="vimeo.com"){
            var docEmbed = document.getElementById('video');
            iframeurl = window.location.protocol+"//"+window.location.hostname+window.location.pathname;
            posiframe = getOffset(docEmbed);
            if(iframeurl.indexOf("vimeo.com/") != -1){
                createVideoFrame(iframeurl,posiframe)
            }
        }
        // Youtube page case
        if(window.location.host=="www.youtube.com"){
            var docEmbed = document.getElementsByTagName('embed');
            for(var i=0; i< docEmbed.length ; i++){
                iframeurl = window.location.protocol+"//"+window.location.hostname+window.location.pathname+window.location.search;
                posiframe = getOffset(docEmbed[i]);

                createVideoFrame(iframeurl,posiframe)
            }
        }
    }

    function createVideoFrame(iframeurl,posiframe,id){
        var source,
            new_url = iframeurl,
            iframeborderLeft = document.createElement('div');
        iframeborderLeft.setAttribute("class", "imageBorder");
        iframeborderLeft.style.width ="6px";
        iframeborderLeft.style.height =(posiframe.height+12)+"px";
        iframeborderLeft.style.backgroundColor ="transparent";
        iframeborderLeft.style.borderLeft ="solid 6px #00CCFF";
        iframeborderLeft.style.zIndex = 999999;
        iframeborderLeft.style.position = 'absolute';
        iframeborderLeft.style.top = (posiframe.top-6)+'px';
        iframeborderLeft.style.left = (posiframe.left-6)+'px';
        iframeborderLeft.style.display = 'block';
        document.body.appendChild(iframeborderLeft);

        var iframeborderRight = document.createElement('div');
        iframeborderRight.setAttribute("class", "imageBorder");
        iframeborderLeft.style.width ="6px";
        iframeborderRight.style.height =(posiframe.height+12)+"px";
        iframeborderRight.style.backgroundColor ="transparent";
        iframeborderRight.style.borderRight ="solid 6px #00CCFF";
        iframeborderRight.style.zIndex = 999999;
        iframeborderRight.style.position = 'absolute';
        iframeborderRight.style.top = (posiframe.top-6)+'px';
        iframeborderRight.style.left = (posiframe.width+posiframe.left)+'px';
        iframeborderRight.style.display = 'block';
        document.body.appendChild(iframeborderRight);

        var iframeborderTop = document.createElement('div');
        iframeborderTop.setAttribute("class", "imageBorder");
        iframeborderTop.style.width =(posiframe.width+12)+"px";
        iframeborderTop.style.height ="6px";
        iframeborderTop.style.backgroundColor ="transparent";
        iframeborderTop.style.borderTop ="solid 6px #00CCFF";
        iframeborderTop.style.zIndex = 999999;
        iframeborderTop.style.position = 'absolute';
        iframeborderTop.style.top = (posiframe.top-6)+'px';
        iframeborderTop.style.left = (posiframe.left-6)+'px';
        iframeborderTop.style.display = 'block';
        document.body.appendChild(iframeborderTop);

        var iframeborderBottom = document.createElement('div');
        iframeborderBottom.setAttribute("class", "imageBorder");
        iframeborderBottom.style.width =(posiframe.width+12)+"px";
        iframeborderBottom.style.height ="6px";
        iframeborderBottom.style.backgroundColor ="transparent";
        iframeborderBottom.style.borderBottom ="solid 6px #00CCFF";
        iframeborderBottom.style.zIndex = 999999;
        iframeborderBottom.style.position = 'absolute';
        iframeborderBottom.style.top = (posiframe.top+posiframe.height-6)+'px';
        iframeborderBottom.style.left = (posiframe.left-6)+'px';
        iframeborderBottom.style.display = 'block';
        document.body.appendChild(iframeborderBottom);

        if(iframeurl.indexOf("vimeo") != -1){
            source = 'vimeo';
        }else if(iframeurl.indexOf("youtube") != -1){
            source = 'youtube';
        }
        var datasend,
            aggregator = document.createElement('div');
        aggregator.style.cssText="-webkit-transition: all .1s ease-out; -webkit-transition: all .1s ease-out; -moz-transition: all .1s ease-out; -ms-transition: all .1s ease-out; -o-transition: all .1s ease-out; transition: all .1s ease-out";
        aggregator.style.width ="110px";
        aggregator.style.height ="25px";
        aggregator.style.backgroundColor ="rgb(33,37,42)";
        aggregator.style.zIndex = 999999;
        aggregator.setAttribute("class","imagePlaceholder");
        aggregator.style.color = "white";
        aggregator.style.fontFamily = "Arial";
        aggregator.style.fontSize = "11px";
        aggregator.style.fontWeight = "600";
        aggregator.style.position = 'absolute';
        aggregator.style.cursor = 'pointer';
        //aggregator.style.paddingTop = '7px';
        //aggregator.style.paddingLeft = '5px';
        aggregator.style.top = (posiframe.top+posiframe.height+6)+'px';
        aggregator.style.left = (posiframe.left-6)+'px';
        aggregator.style.display = 'block';

        aggregator.innerHTML = "<div style='top:7px;position:relative;'><div style='line-height: normal;position:absolute;left:10px;'>Save Video</div><img style='position:absolute;left:90px;top:1px;' src='"+serverUrl+"/img/iceframe/check_small_blue.png'></div>";
        aggregator.href = 'javascript:void(0)';
        aggregator.rel = new_url;
        aggregator.setAttribute("videosource",source);
        document.body.appendChild(aggregator);
        aggregator.addEventListener('click', function(e) {
            var iceOpenIcebergs = document.getElementById("openIcebergsPageZone");
            iceOpenIcebergs.style.display = "none";
            datasend = {
                source: window.top.location.href,
                title: document.title,
                type: 'video',
                eventType: 'addVideo',
                videourl: this.rel,
                videosource: this.getAttribute("videosource")
            }
            iframe.contentWindow.postMessage(datasend,serverUrl);
            e.stopPropagation();
        }, true);

        aggregator.addEventListener('mouseover', function(e) {
            aggregator.style.paddingTop = '4px';
        }, true);

        aggregator.addEventListener('mouseout', function(e) {
            aggregator.style.paddingTop = '0px';
        }, true);
    }
})();