var message = "**Ayo Bro what you trying to do !! **";
document.addEventListener('keydown', function (e) {
    if (e.key === "F12") {
      e.preventDefault();  
      alert(message);
      return false;
    }
  });
  
  // Disable right-click (Context menu)
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault(); 
    alert(message); 
    return false;
  });
  
  
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) {
      e.preventDefault();
       alert(message);
      return false;
    }
  });
  
  // Disable Ctrl+U (to block 'View Source')
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      alert(message);
      return false;
    }
  });

function rtclickcheck(keyp) {
    if (navigator.appName == "Netscape" && keyp.which == 3) {
        alert(message);
        return false;
    }

    if (navigator.appVersion.indexOf("MSIE") != -1 && event.button == 2) {
        alert(message);
        return false;
    }
}

document.onmousedown = rtclickcheck;


var isNS = (navigator.appName == "Netscape") ? true : false;

function mousehandler(e) {
    var myevent = (isNS) ? e : event;
    var eventbutton = (isNS) ? myevent.which : myevent.button;
    if ((eventbutton == 2) || (eventbutton == 3)) return false;
}

document.oncontextmenu = function() { return false; };
document.onmousedown = mousehandler;
document.onmouseup = mousehandler;


function disableCtrlKeyCombination(e) {
    var forbiddenKeys = ["a", "s", "c", "x", "u"];
    var key;
    var isCtrl;
    
    if (window.event) {
        key = window.event.keyCode; // IE
        isCtrl = window.event.ctrlKey;
    } else {
        key = e.which; // Firefox
        isCtrl = e.ctrlKey;
    }

    if (isCtrl) {
        for (var i = 0; i < forbiddenKeys.length; i++) {
            if (forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
              alert(message);
                return false;
            }
        }
    }
    return true;
}

document.onkeydown = disableCtrlKeyCombination;