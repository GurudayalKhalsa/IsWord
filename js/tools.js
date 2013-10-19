//place text
function insertText(text){
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            var textNode = document.createTextNode(text);
            range.insertNode(textNode);

            // Preserve the selection
            range = range.cloneRange();
            range.setStartAfter(textNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().text = text;
    }
}

function saveFile(link)
{
    //variable for request to be sent
    var xmlhttp;
    //if i can make a request with XMLHttpRequest, set variable to that
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function()
    {
        //if request not loaded yet, but coming
        if (xmlhttp.readyState==2 && xmlhttp.status==200)
        {
        //display loader
        var preview = document.getElementById("preview");
        preview.innerHTML="<img id='ajax-loader' src='/site-images/ajax-loader.gif'></img>";
        }
        //if request loaded
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
        //display big preview image
        var preview = document.getElementById("preview");
        preview.innerHTML="<img id='previewImage' src="+link+"></img>";
        //resize accordingly
        resize();
        }
    }
    //sends data
    xmlhttp.open("POST",link,true);
    xmlhttp.send();
}