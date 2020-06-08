$(document).ready(function () {
    $(".header").load('./homepage.html');
    $("#video").load('./streamingvideo.html');

    function doesFileExist(urlToFile) {
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', urlToFile, false);
        xhr.send();
         
        if (xhr.status == "404") {
            return false;
        } else {
            return true;
        }
    }

    function getData(param) {
        var url = location.href;
        var params = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
        for (var i = 0; i < params.length; i++) {
            let tmp = params[i].split('=')[0];
            if (tmp.toUpperCase() == param.toUpperCase()) {
                return decodeURIComponent(params[i].split('=')[1]);
            }
        }

    }


    function initRoom() {
        let title = getData("title");
        let host = getData("host");
        let secure = getData("option");
        let prfLink = './images/profile/profile_'+host+'.png';
        let chk = doesFileExist(prfLink);
        if(!chk) {
            prfLink = './images/profile/profile_default.png';
        }
        let roomtitle = document.getElementById("roomTitle");
        roomtitle.innerHTML = '<img src = "'+prfLink+'"  height="40px" class = "lcklogo">';
        roomtitle.innerHTML += '<span style = "margin : 10px">'+title+'</span>';
        roomtitle.innerHTML += '<span style = "float : right; font-size : large">host : '+host+'</span>';
    }

    initRoom();

});
