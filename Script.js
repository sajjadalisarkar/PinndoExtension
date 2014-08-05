$("#add_logo").on('click',createImageContent);
$("#items").on('click','.Bin',removeImageContent);
$("#items").on('click','.Add_note_button',showNoteBlock);
$("#items").on('click','.Save_note_button',hideNoteBlock);
$("#close_button_img").on('click',closeIceframe);

$("#pinndo_frame").hover(function(){
    $("#close_button_img").show()
},function(){
    $("#close_button_img").hide()
})

function createImageContent(){
    $("#items").append('<div class="item"><div class="content"><img  src="content_img1.png"/></div><div class="website_name">www.cotemasion.fr</div><div><div class="Add_note_button">AJOUTER UNE NOTE</div><div id="bin" class="Bin"><img  src="rubbish.png"/></div><br class="clear"></div></div>');
    };
function createTextContent(){
    $("#items").append('<div id="item3" class="item"><div class="content"><div class="text_content"></div></div><div class="website_name">www.cotemasion.fr</div><div class="Add_note_button">AJOUTER UNE NOTE</div><div class="Bin"><img  src="rubbish.png"/></div><br class="clear"></div>');
    };

function closeIceframe()
{
    $("#pinndo_frame").remove();
}

function removeImageContent() {
    $(this).parent().parent().remove();
    }
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
