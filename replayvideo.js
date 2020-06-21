$(document).ready(function () {
});

let schedule = [];

$.ajax({
    type: "GET",
    url: "./data/schedule.csv",
    dataType: "text",
    async: false,
    success: function(data) {
        var allRows = data.split(/\r?\n|\r/);
        for(var singleRow = 1; singleRow < allRows.length; singleRow++) {
            var tmp = {};
            var rowCells = allRows[singleRow].split(',');
            tmp['id'] = rowCells[0];
            tmp['year'] = rowCells[1];
            tmp['month'] = rowCells[2];
            tmp['day'] = rowCells[3];
            tmp['hour'] = rowCells[4];
            tmp['minute'] = rowCells[5];
            tmp['blue'] = rowCells[6];
            tmp['bluewin'] = rowCells[7];
            tmp['purple'] = rowCells[8];
            tmp['purplewin'] = rowCells[9];
            schedule.push(tmp);
        }
    },
    error:function(request, error) {

			    alert("fail load schedule");

		}
});

function getteam(str) {
    let t = getData("gid")
    for(let i = 0; i < schedule.length; i++) {
        if(schedule[i].id == t) {
            if(str == "blue") {
                return schedule[i].blue;
            } else {
                return schedule[i].purple;
            }
        }
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


var video = document.querySelector('.videoRaw');
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
    let bteam = getteam("blue");
    let pteam = getteam("purple");
    for(var i = 0; i<timeStampData.length; i++) {
        var data = timeStampData[i];
        if(data.gid != getData("gid") || data.set != getData("set")) {
            continue;
        }
        var tmstmp = document.createElement('div');
        tmstmp.classList.add('stamp');
        tmstmp.id = 'stamp' + i;
        tmstmp.style.left = (data['time'] / duration) * 100 + "%";
        if (data['team'] == bteam) {
            tmstmp.style.bottom = 0;
        }
        else if (data['team'] == pteam) {
            tmstmp.style.top = 0;
        }
        if (data['custom'] == 1) {
            tmstmp.classList.add('custom');
        }

        tmstmp.style.background = teamColor(data['team']);
        
        playBar.appendChild(tmstmp);
    }
    
    $('.stamp').click(function() {
        var num = this.id.slice(5);
        video.currentTime = timeStampData[num]['time'];
        var votePanel = document.getElementById("votePanel");
        votePanel.style.left = this.offsetLeft + playBar.offsetLeft + "px";
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

    $('#team1').css("background", teamColor(bteam));
    $('#team2').css("background", teamColor(pteam));
}

function voteTimeStamp(team, offset) {
    var clip = document.getElementById("clippedDiv");
    var pos = clip.offsetLeft - 151;
    var part = pos / playBar.offsetWidth;
    var time = video.duration * part;
    var newtmp = {
        "gid": getData('gid'),
        "set": getData('set'),
        "time": time,
        "team": team,
        "Likes": 0,
        "isLiked": 0,
        "custom": 1,
    };
    timeStampData.push(newtmp);
    drawTimestamp();
}

$(window).click(function(){
    if (!idIsHovered('playBar')) {
        var selectTeam = document.getElementById('selectTeam');
        var clip = document.getElementById("clippedDiv");
        if (selectTeam.style.visibility == 'visible') {
            selectTeam.style.visibility = 'hidden';
        }
        if (clip.style.display == 'block') {
            clip.style.display = 'none';
        }
    }
});

$('#addClip').click(function(event){
    document.getElementById('selectTeam').style.visibility = 'visible';
    event.stopPropagation();
});

$('#team1').click(function(event){
    event.stopPropagation();
    var selectTeam = document.getElementById('selectTeam');
    if (selectTeam.style.visibility == 'visible') {
        selectTeam.style.visibility = 'hidden';
    }
    voteTimeStamp(getteam('blue'), event.pageX);
});

$('#team2').click(function(event){
    event.stopPropagation();
    var selectTeam = document.getElementById('selectTeam');
    if (selectTeam.style.visibility == 'visible') {
        selectTeam.style.visibility = 'hidden';
    }
    voteTimeStamp(getteam('purple'), event.pageX);
});

$('#playBar').mousemove(function(event){
    var clip = document.getElementById("clippedDiv");
    var clipTeam = document.getElementById('selectTeam');
    var frame = document.getElementById('container');
    var position = event.pageX - frame.offsetLeft;
    clip.style.left = position + 'px';
    clipTeam.style.left = position - 7.5 + 'px';
})

$('#playBar').mouseenter(function() {
    var clip = document.getElementById("clippedDiv");
    clip.style.display = 'block';
}).mouseleave(function() {
    var clip = document.getElementById("clippedDiv");
    var sel = document.getElementById("selectTeam");
    if (idIsHovered('clippedDiv')) {
        clip.style.display = 'block';
        sel.style.display = 'flex';
    } else {
        clip.style.display = 'none';
        sel.style.display = 'none';
    } 
});

var timer; delay = 1700;
$('#clippedDiv').mouseleave(function() {
    if (!idIsHovered('playBar')) {
        var clip = document.getElementById("clippedDiv");
        var sel = document.getElementById("selectTeam");
        timer = setTimeout(function(){
            clip.style.display = 'none';
            sel.style.display = 'none';
        }, delay);
    }
}).mouseenter(function() {
    clearTimeout(timer);
});
    
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

function idIsHovered(id){
    return $("#" + id + ":hover").length > 0;
}

function teamColor(team) {
    if (team == "AF") {
        return 'rgba(5, 69, 177, 1)';
    }
    else if (team == "APK") {
        return 'rgba(215, 70, 70, 1)';
    }
    else if (team == "DRX") {
        return 'rgba(87, 140, 247, 1)';
    }
    else if (team == "DWG") {
        return 'rgba(48, 208, 178, 1)';
    }
    else if (team == "GEN") {
        return 'rgba(165, 135, 33, 1)';
    }
    else if (team == "GRF") {
        return 'rgba(215, 24, 31, 1)';
    }
    else if (team == "HLE") {
        return 'rgba(255, 107, 1, 1)';
    }
    else if (team == "KT") {
        return 'rgba(34, 30, 31, 1)';
    }
    else if (team == "SB") {
        return 'rgba(173, 28, 49, 1)';
    }
    else if (team == "T1") {
        return 'rgba(226, 30, 47, 1)';
    }
    else {
        return 'rgba(0, 0, 0, 1)';
    }
}