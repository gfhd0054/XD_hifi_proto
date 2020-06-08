$(document).ready(function () {
});

var video = document.querySelector('.video');
var statusBar = document.querySelector('.statusBar');
var play_pause = document.getElementById('play-pause');
var volumeIcon = document.getElementById('volume');
var timeBar = document.getElementById('timeBarExtend');
var playBar = document.getElementById('playBar');;
var likeButton = document.getElementById('likeButton');
var lastVolume = 0;
var flagMode = 1;

video.onloadedmetadata = function(){
    document.getElementById('totalTime').innerHTML = convertSecToTime(Math.round(video.duration));
    convertVolToIcon(video.volume);
    drawTimestamp();
};

function togglePlayPause() {
    if(video.paused) {
        play_pause.innerHTML = "<i class='fas fa-pause'></i>";
        video.play();
    }
    else {   
        play_pause.innerHTML = "<i class='fas fa-play'></i>";
        video.pause();
    }
}

function toggleVolume() {
    var curVol = video.volume;
    if(curVol >= 0.1) {
        video.volume = 0;
        lastVolume = curVol;
        convertVolToIcon(0);
    }
    else {
        video.volume = lastVolume;
        convertVolToIcon(lastVolume);
    }
}

play_pause.onclick = function() {
    togglePlayPause();
};

volumeIcon.onclick = function() {
    toggleVolume();
};

video.onclick = function() {
    togglePlayPause();
};

timeBar.addEventListener('click', moveCurrentTime);

video.addEventListener('timeupdate', function(){
    var barPos = video.currentTime / video.duration;
    statusBar.style.width = barPos * 100 + "%";
    document.getElementById('currentTime').innerHTML = convertSecToTime(Math.round(video.currentTime));
});

window.addEventListener('keypress', function(e){
    var keyCode = e.keyCode;
    if(keyCode == 32) {
        togglePlayPause();
    }
});

window.addEventListener('keydown', function(e){
    var keyCode = e.keyCode;
    var curTime = video.currentTime;
    var curVol = video.volume;
    if (keyCode == 37) {
        curTime -= 5;
        if (curTime < 0) {
            video.currentTime = 0;
        }
        else {
            video.currentTime = curTime;
        }
    }
    else if (keyCode == 39) {
        curTime += 5;
        if (curTime > video.duration) {
            video.currentTime = 0;
        }
        else {
            video.currentTime = curTime;
        }
    }
    else if (keyCode == 40) {
        curVol -= 0.1;
        curVol = (curVol <= 0) ? 0 : curVol;
        convertVolToIcon(curVol);
        video.volume = curVol;
    }
    else if (keyCode == 38) {
        curVol += 0.1;
        curVol = (curVol >= 1) ? 1 : curVol;
        convertVolToIcon(curVol);
        video.volume = curVol;
    }
});

likeButton.onclick = function(){
    var current = document.getElementsByClassName("activestamp")[0];
    var num = current.id.slice(5);
    if (timeStampData[num]['isLiked'] == 0) {
        timeStampData[num]['isLiked'] = 1;
        timeStampData[num]['Likes'] += 1;
    }
    else {
        timeStampData[num]['isLiked'] = 0;
        timeStampData[num]['Likes'] -= 1;
    }
    updateLikes(timeStampData[num]['Likes']);
    updateLikeButton(timeStampData[num]['isLiked']);
};

function convertVolToIcon(vol) {
    if (vol >= 0.7) {
        volumeIcon.innerHTML = "<i class='fas fa-volume-up'></i>";
    }
    else if (vol > 0.1) {
        volumeIcon.innerHTML = "<i class='fas fa-volume-down'></i>";
    }
    else {
        volumeIcon.innerHTML = "<i class='fas fa-volume-off'></i>";
    }
}

function convertSecToTime(sec) {
    var sec = Math.round(sec);
    var hour = parseInt(sec / 3600);
    var min = parseInt(sec % 3600 / 60);
    var sec = sec % 60;
    if (sec < 10) {
        sec = '0' + sec;
    }
    if (hour > 0) {
        return hour+":"+min+":"+sec;
    }
    else {
        return min+":"+sec;
    }
}

function moveCurrentTime(event) {
    var pos = event.pageX - $('#timeBarExtend').offset().left;
    var total = $('#timeBarExtend').width();
    var time = pos / total * video.duration;
    video.currentTime = time;
}

function parseint(num) {
    if (num < 1000) {
        return parseInt(num);
    }
    var numstr = num.toString();
    var hund = numstr.slice(numstr.length-3);
    return parseInt(num / 1000) + ',' + hund;
}

function updateLikeButton(isLiked) {
    if (isLiked == 1) {
        likeButton.innerHTML = "<i class='fas fa-thumbs-up'></i>";
    }
    else {
        likeButton.innerHTML = "<i class='far fa-thumbs-up'></i>";
    }
}

function updateLikes(offset) {
    var numLikes = document.getElementById('numLikes');
    numLikes.innerHTML = parseint(offset) + " Likes";
}

function drawTimestamp() {
    var duration = video.duration;
    for(var i = 0; i<timeStampData.length; i++) {
        var tmstmp = document.createElement('div');
        tmstmp.classList.add('stamp');
        tmstmp.id = 'stamp' + i;
        var data = timeStampData[i];
        tmstmp.style.left = (data['time'] / duration) * 100 + "%";
        if (data['team'] == "DRX") {
            tmstmp.style.background = 'rgba(87, 140, 247, 1)';
            tmstmp.style.bottom = 0;
        }
        else if (data['team'] == "DWG") {
            tmstmp.style.background = 'rgba(48, 208, 178, 1)';
            tmstmp.style.top = 0;
        }
        playBar.appendChild(tmstmp);
    }
    
    $('.stamp').click(function() {
        var num = this.id.slice(5);
        video.currentTime = timeStampData[num]['time'];
        var votePanel = document.getElementById("votePanel");
        votePanel.style.left = this.getBoundingClientRect().left+"px";
        votePanel.style.visibility = 'visible';
        updateLikes(timeStampData[num]['Likes']);
        updateLikeButton(timeStampData[num]['isLiked']);
    });
    
    var stamps = document.getElementsByClassName("stamp");
    for (var i = 0; i < stamps.length; i++) {
        stamps[i].addEventListener("click", function(){
            var current = document.getElementsByClassName("activestamp");
            if (current.length == 0) {
                this.className += " activestamp";
            }
            else {
                current[0].className = current[0].className.replace(" activestamp", "");
                this.className += " activestamp";
            }
        });
    }
    
    $('#flag').click(function(){
        if (flagMode == 1) {
            flagMode = 0;
            this.style.color = 'rgb(190, 190, 190)';
            $('.stamp').hide();
            var votePanel = document.getElementById("votePanel");
            votePanel.style.visibility = 'hidden';
        }
        else if (flagMode == 0) {
            flagMode = 1;
            this.style.color = 'white';
            $('.stamp').show();
            if (document.getElementsByClassName("activestamp").length > 0) {
                var votePanel = document.getElementById("votePanel");
                votePanel.style.visibility = 'visible';
            }
        }
    });

    $('#flag').hover(function(){
        if (flagMode == 0) {
            this.style.color = 'white';
        }
    }, function(){
        if (flagMode == 0) {
            this.style.color = 'rgb(190, 190, 190)';
        }
    });
}
