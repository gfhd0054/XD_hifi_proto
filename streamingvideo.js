$(document).ready(function () {
});

var video = document.querySelector('.videoRaw');
var statusBar = document.querySelector('.statusBar');
var play_pause = document.getElementById('play-pause');
var volumeIcon = document.getElementById('volume');
var lastVolume = 0;
var timeOffset = new Date().getTime() / 1000;
var shown1 = false; var shown2 = false; var shown3 = false;
var userAnswer = {'dragon': -1, 'player': -1};

video.onloadedmetadata = function(){
    convertVolToIcon(video.volume);
    togglePlayPause();
};

function togglePlayPause() {
    if(video.paused) {
        play_pause.innerHTML = "<i class='fas fa-pause'></i>";
        video.play();
        video.currentTime = new Date().getTime() / 1000 - timeOffset;
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

// Popup Game event
video.addEventListener('timeupdate', function(){
    if (video.play && video.currentTime >= 17 && !shown1) {
        showQuiz();
        shown1 = true;
    }
    else if (video.play && video.currentTime >= 34 && !shown2) {
        showQuiz2();
        shown2 = true;
    }
    else if (video.play && video.currentTime >= 90 && !shown3) {
        showResult1();
        shown3 = true;
    }
});

window.addEventListener('keypress', function(e){
    
});

window.addEventListener('keydown', function(e){
    var keyCode = e.keyCode;
    var curTime = video.currentTime;
    var curVol = video.volume;
    if (keyCode == 40) {
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

function showQuiz() {
    $("#popupQuiz1").animate({
        right: '+=18%'
    }, {
        duration: 1000,
        easing: 'easeOutQuint',
        complete: function(){
            $('#popupQuizTimer1').animate({
                width: '100%'
            }, {
                duration: 14 * 1000,
                easing: 'linear',
                complete: function(){
                    $("#popupQuiz1").animate({
                        right: '-=18%'
                    }, {
                        duration: 1000,
                        easing: 'easeOutQuint',
                        complete: function() {
                            var current = document.getElementsByClassName('activeoption');
                            if (current.length > 0) {
                                if (current[0].id == 'cloudDragon') {
                                    userAnswer['dragon'] = 0;
                                }
                                else if (current[0].id == 'mountainDragon') {
                                    userAnswer['dragon'] = 1;
                                }
                                else if (current[0].id == 'infernalDragon') {
                                    userAnswer['dragon'] = 2;
                                }
                                else if (current[0].id == 'oceanDragon') {
                                    userAnswer['dragon'] = 3;
                                }
                            }
                            prepareResult1();
                        }
                    });
                }
            });
        }
    });
}

function showQuiz2() {
    $("#popupQuiz2").animate({
        right: '+=24%'
    }, {
        duration: 1000,
        easing: 'easeOutQuint',
        complete: function(){
            $('#popupQuizTimer2').animate({
                width: '100%'
            }, {
                duration: 22 * 1000,
                easing: 'linear',
                complete: function(){
                    $("#popupQuiz2").animate({
                        right: '-=24%'
                    }, {
                        duration: 1000,
                        easing: 'easeOutQuint',
                        complete: function() {
                            var current = document.getElementsByClassName('activeoption');
                            if (current.length > 0) {
                                if (current[0].id.slice(0,2) == 'fb'){
                                    userAnswer['player'] = parseInt(current[0].id.charAt(2));
                                }
                            }
                        }
                    });
                }
            });
        }
    });
}

function showResult1() {
    if (userAnswer['dragon'] < 0) {
        return;
    }
    $("#popupQuiz1Result").animate({
        right: '+=18%'
    }, {
        duration: 1000,
        easing: 'easeOutQuint',
        complete: function(){
            $('#popupQuizTimer3').animate({
                width: '100%'
            }, {
                duration: 10 * 1000,
                easing: 'linear',
                complete: function(){
                    $("#popupQuiz1Result").animate({
                        right: '-=18%'
                    }, {
                        duration: 1000,
                        easing: 'easeOutQuint',
                        complete: function() {
                        }
                    });
                }
            });
        }
    });
}

var dragonoptions = document.getElementsByClassName("quizOption");
for (var i = 0; i < dragonoptions.length; i++) {
    dragonoptions[i].addEventListener("click", function(){
        var current = document.getElementsByClassName("activeoption");
        if (current.length == 0) {
            this.className += " activeoption";
        }
        else {
            current[0].className = current[0].className.replace(" activeoption", "");
            this.className += " activeoption";
        }
    });
}

function prepareResult1(){
    var answer = document.getElementById("popupQuizAnswer");
    var submit = document.getElementById("popupQuizSubmit");
    var msg = document.getElementById("popupQuizmsg");
    answer.innerHTML = "<img width=30px src='./images/infernalDragon.png'/>";
    if (userAnswer['dragon'] == 0) {
        submit.innerHTML = "<img class='wrong' width=25px src='./images/cloudDragon.png'/>";
        msg.innerHTML = "Try again next time";
    }
    else if (userAnswer['dragon'] == 1) {
        submit.innerHTML = "<img class='wrong' width=25px src='./images/mountainDragon.png'/>";
        msg.innerHTML = "Try again next time";
    }
    else if (userAnswer['dragon'] == 2) {
        submit.innerHTML = "<img class='right' width=30px src='./images/infernalDragon.png'/>";
        msg.innerHTML = "You've got correct!";
    }
    else if (userAnswer['dragon'] == 3) {
        submit.innerHTML = "<img class='wrong' width=25px src='./images/oceanDragon.png'/>";
        msg.innerHTML = "Try again next time";
    }
}