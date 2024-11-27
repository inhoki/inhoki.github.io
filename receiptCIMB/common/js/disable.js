function checkLoad() {
    if (window.menubar.visible == true && window.toolbar.visible == true) {
        window.location=checkLoad1;
    }
}

var message="";

function clickNS(e) {
    if (document.layers||(document.getElementById&&!document.all)) {
        if (e.which==2||e.which==3 | e.which == 5 || e.which == 10 ||
            e.which == 11 || e.which == 12 || e.which == 20 ||  e.which == 25 || e.ctrlk) {
            (message);return false;
        }
    } else {
        if (event.keyCode==0 || event.keyCode==2||event.keyCode==3 | event.keyCode == 5 || event.keyCode == 10 ||
            event.keyCode == 11 || event.keyCode == 12 || event.keyCode == 20 ||  event.keyCode == 25) {
            (message);return false;
        }
    }
}

function disableCtrlKeyCombination(e) {
    //list all CTRL + key combinations you want to disable
    var forbiddenKeys = new Array('n', 'j');
    var key;
    var isCtrl;

    if(window.event)
    {
            key = window.event.keyCode;     //IE
            if(window.event.ctrlKey)
                    isCtrl = true;
            else
                    isCtrl = false;
    }
    else
    {
            key = e.which;     //firefox
            if(e.ctrlKey)
                    isCtrl = true;
            else
                    isCtrl = false;
    }

    //if ctrl is pressed check if other key is in forbidenKeys array
    if(isCtrl)
    {
            for(i=0; i<forbiddenKeys.length; i++)
            {
                    //case-insensitive comparation
                    if(forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase())
                    {
                            alert("Key combination CTRL + "
                                    +String.fromCharCode(key)
                                    +" has been disabled.");
                            return false;
                    }
            }
    }
    return true;
}

if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown=clickNS;
}
else{
    document.onmouseup=clickNS;
}

document.oncontextmenu=clickNS

document.onkeypress=disableCtrlKeyCombination
document.onkeydown=disableCtrlKeyCombination

function mouseDown(e) {
    var shiftPressed=0;

    if (parseInt(navigator.appVersion)>3) {
        if (navigator.appName=="Netscape") {
            shiftPressed=(e.shiftKey || e.ctrlKey);
        } else shiftPressed=event.shiftKey;

        if (shiftPressed) {
            alert ('Shift-click is disabled.')
            return false;
        }
    }

    return true;
}

if (parseInt(navigator.appVersion)>3) {
    document.onmousedown = mouseDown;

    if (navigator.appName=="Netscape")
        document.captureEvents(Event.MOUSEDOWN);
}