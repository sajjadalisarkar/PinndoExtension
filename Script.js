var parentUrl =document.referrer;
var serverUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port : '');
var hostName = parseUrl(parentUrl).hostname;
var faviconImgSrc = getFaviconImgSrc(hostName);
var thumbnailPlaceholder='<img class="favicon" src="'+faviconImgSrc+'"/>';

/**
 *  This function parses a given url
 */
function parseUrl( url ) {
    var a = document.createElement('a');
    a.href = url;
    return a;
}

/**
 *  This function gets favicon for a given site .
 */
function getFaviconImgSrc(h){
    var imgSrc='https://plus.google.com/_/favicon?domain='+h;
    return imgSrc;
}

/**
 *  Listeners for the received message
 */
window.addEventListener("message", receiveMessage, true);

/**
 *  This function receives the posted message .
 */
function receiveMessage(e){
    if(typeof(e.data.eventType)=="undefined"){
        return;
    }else{
        window[e.data.eventType](e.data);
    }
}

/**
 *  Event listeners
 */
$("#add_logo").on('click',createBookmarkContent);
$("#items").on('click','.Bin',removeContent);
$("#items").on('click','.Add_note_button',showNoteBlock);
$("#items").on('click','.Save_note_button',hideNoteBlock);
$("#close_button_img").on('click',closePinndoframe);
$("#pinndo_frame").hover(function(){
    $("#close_button_img").show()
},function(){
    $("#close_button_img").hide();
})

/**
 *  This function creates bookmark content .
 */
function createBookmarkContent(){
    if($(".favicon").length === 0) {
        $("#items").append('<div class="item"><div class="content">' + thumbnailPlaceholder + '</div><div class="website_name">' + hostName + '</div><div><div class="Add_note_button">AJOUTER UNE NOTE</div><div id="bin" class="Bin"><img  src="rubbish.png"/></div><br class="clear"></div></div>');
}};

/**
 *  This function creates Image content . TODO : This functionality is Not yet implemented  and hence unused function .
 */
function createImageContent(){
    $("#items").append('<div class="item"><div class="content"><img class="image" src="content_img1.png"/></div><div class="website_name">www.cotemasion.fr</div><div><div class="Add_note_button">AJOUTER UNE NOTE</div><div id="bin" class="Bin"><img  src="rubbish.png"/></div><br class="clear"></div></div>');
    };

/**
 *  This function closes the Pinndo frame.
 */
function closePinndoframe()
{
    $("#pinndo_frame").remove();
}

/**
 *  This function removes content on clicking bin
 */
function removeContent() {
    $(this).parent().parent().remove();
    }

/**
 *  This function hides the Note block
 */
function hideNoteBlock() {
    $(this).siblings(".Note_block").data('Note_block_Data', $(this).siblings(".Note_block").val() );
    $(this).siblings(".Note_block").slideUp();
    if($(this).siblings(".Note_block").data('Note_block_Data').length === 0)
    {
    $(this).replaceWith('<div class="Add_note_button">AJOUTER UNE NOTE</div>');
    }
    else
    {
    $(this).replaceWith('<div class="Add_note_button">EDITER NOTE</div>');
    }
}

/**
 *  This function displays the Note block
 */
function showNoteBlock() {
    if($(this).siblings(".Note_block").length === 0) {
    var innerHtml = '<textarea class="Note_block"type="text"></textarea>';
    $(innerHtml).hide().appendTo($(this).parent()).slideDown();
    $(this).replaceWith('<div class="Save_note_button">VALIDER LA NOTE</div>');
    }
    else
    {
    $(this).siblings(".Note_block").slideDown();
    $(this).replaceWith('<div class="Save_note_button">VALIDER LA NOTE</div>');
    $(this).siblings(".Note_block").val($(this).siblings(".Note_block").attr("Note_block_Data"));
    }
    }


function strip_tags (input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

/**
 *  This function adds the text content. It gets invoked when addText event type message is received .
 */
function addText(d){

    adding = true;
    bm_type = 'text';
    $("#items").append('<div class="item"><div class="text_content">'+strip_tags(d.contentdata,"<b>")+'</div><div class="website_name">'+hostName+'</div><div><div class="Add_note_button">AJOUTER UNE NOTE</div><div id="bin" class="Bin"><img  src="rubbish.png"/></div><br class="clear"></div></div>');
    data = getCommonParams(d);
    data.type ="bookmarkletText";
    data.textContent = d.contentdata;
    showNoteBlock();
}

function getCommonParams(data) {
    return {
        type: data.type,
        origin: data.source,
        title: data.title,
        comments: data.comments
    };
}


