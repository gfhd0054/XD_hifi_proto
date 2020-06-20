$(document).ready(function () {
    $(".header").load('./homepage.html');

    let schedule = [];
    let streamers = [];
    let friends = [];
    let schNum = -1;
    let current = -1;

    let roomoption = -1;             // 0 : public, 1 : private, 2 : secret

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

    $.ajax({
        type: "GET",
        url: "./data/streamers.csv",
        dataType: "text",
        async: false,
        success: function(data) {
            var allRows = data.split(/\r?\n|\r/);
            for(var singleRow = 1; singleRow < allRows.length; singleRow++) {
                var tmp = {};
                var rowCells = allRows[singleRow].split(',');
                tmp['name'] = rowCells[0];
                tmp['platform'] = rowCells[1];
                tmp['link'] = rowCells[2];
                streamers.push(tmp);
            }
        },
        error:function(request, error) {

			      alert("fail load streamers");

		    }
    });

    $.ajax({
        type: "GET",
        url: "./data/friends.csv",
        dataType: "text",
        async: false,
        success: function(data) {
            var allRows = data.split(/\r?\n|\r/);
            for(var singleRow = 1; singleRow < allRows.length; singleRow++) {
                var tmp = {};
                var rowCells = allRows[singleRow].split(',');
                tmp['id'] = rowCells[0];
                tmp['name'] = rowCells[1];
                tmp['title'] = rowCells[2];
                tmp['secure'] = rowCells[3];
                friends.push(tmp);
            }
        },
        error:function(request, error) {

			      alert("fail load friends");

		    }
    });

    function initroomoption() {
        roomoption = -1;
        iterateOption();
    }

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

    function setReplays() {
        let replaysDiv = document.getElementById("replays");

        for(let i = current-1; i >=0; i--) {
            let replay = document.createElement("div");
            let imgSrc = "./images/replay/"+schedule[i].blue+"vs"+schedule[i].purple+".png";
            replay.className = 'replay';
            replay.id = "gid" + schedule[i].id;
            replay.innerHTML = '<p><span style="font-family: Ubuntu; font-size: large">' + schedule[i].year+'.'+schedule[i].month+'.'+schedule[i].day+' '+schedule[i].blue+' vs '+schedule[i].purple + '</span></p>';
            let num = schedule[i].bluewin*1 + schedule[i].purplewin*1;
            for(let j = 0; j < num; j++) {
                let set = document.createElement("div");
                set.content = (j+1);
                set.className = 'horizontal set';
                set.innerHTML = "\
                    <div class='thumbnailDiv'>\
                        <div class='videoHover'>\
                            <i class='fas fa-play'></i>\
                        </div>\
                        <img class='thumbnail' src='" + imgSrc + "'width='192px' height='108px'>\
                    </div>\
                    <br>\
                    <span style='font-family: Ubuntu; font-size: medium'>Set " + (j+1) + "</span>";
                replay.appendChild(set);
            }
            replaysDiv.appendChild(replay);
        }
    }

    function setRooms() {
        let friendsDiv = document.getElementById("privateRooms");

        for(let i = 0; i < friends.length; i++) {
            if(friends[i].secure == "open") {
                let friend = document.createElement("div");
                friend.className = 'horizontal room';
                friend.content = friends[i].id;
                let profLink = './images/profile/profile_'+friends[i].name+'.png';
                let chk = doesFileExist(profLink)
                let text = '<span style="font-family: Ubuntu; font-size: medium">' + friends[i].title + '</span><br><span style="font-family: Ubuntu; font-size: small">by '+friends[i].name+'</span>';
                if(chk) {
                    friend.innerHTML = "\
                    <div class='thumbnailDiv'>\
                        <div class='videoHover'>\
                            <i class='fas fa-play'></i>\
                        </div>\
                        <img class='thumbnail' src='" + profLink + "' width='192px' height='108px'>\
                    </div>\
                    <br>" + text;
                } else {
                    friend.innerHTML = "\
                    <div class='thumbnailDiv'>\
                        <div class='videoHover'>\
                            <i class='fas fa-play'></i>\
                        </div>\
                        <img class='thumbnail' src='./images/profile/profile_default.png' width='192px' height='108px'>\
                    </div>\
                    <br>" + text;
                }
                friendsDiv.appendChild(friend);
            }
        }
    }

    function setStreamers() {
        let streamerTable = document.getElementById("streamertable");
        let numRows = streamerTable.rows.length;

        for(let i = 0; i < numRows; i++) {
            streamerTable.deleteRow(0);
        }

        for(let i = 0; i < streamers.length; i++) {
            var newRow = streamerTable.insertRow(i);
            newRow.className = 'streamerLine';
            newRow.content = streamers[i].link;
            let newCell1 = newRow.insertCell(0);
            let newCell2 = newRow.insertCell(1);
            newCell1.className = 'streamerCell';
            newCell2.className = 'streamerCell';
            newCell1.innerHTML = "<img src='./images/streamer/streamer_"+streamers[i].name+".png'width='50px' height='50px' alt='"+streamers[i].name+"'>";
            newCell2.innerHTML = '<span style="font-family: Ubuntu; font-size: medium">' + streamers[i].name+"'s broadcast<br>"+streamers[i].platform+"</span>";
        }
    }

    function initSchedule() {
        let today = new Date();
        // let year = today.getFullYear();
        // let month = today.getMonth();
        // let day = today.getDate();

        let year = 2020;        
        let month = 6;
        let day = 9;

        for(let i = 0; i < schedule.length; i++) {
            if(year == schedule[i].year) {
                if(month == schedule[i].month) {
                    if(day <= schedule[i].day) {
                        current = i;
                        updateSchedule();
                        return;
                    }
                }
            }
        }
    }

    function updateSchedule() {
        let today = new Date();
        let scheduleTable = document.getElementById("scheduletable");
        scheduleTable.innerHTML = "";

        let line1;
        for(let j = schedule.length-1; j >= 0; j--) {
            line1 = document.createElement("div");
            line1.className = 'line';
            fillSchedule(line1,today, j);
            scheduleTable.appendChild(line1);
        }
        scheduleTable.scrollTop = (schedule.length - 1 - current) * 75 - 150;
    }

    function fillSchedule(line, today, i) {
        let left = document.createElement("div");
        left.className = "leftTeam divTb";
        left.innerHTML = "<img src='./images/logo/logo_" + schedule[i].blue + ".png' height='50px' width='50px' alt='"+schedule[i].blue+"'>";
        let center = document.createElement("div");
        
        let year = 2020;
        let month = 6;
        let day = 9;
        let hour = 17;
        let min = 0;

        let res="";
        if(year == schedule[i].year) {
            if(month == schedule[i].month) {
                if(day == schedule[i].day) {
                    if(hour < schedule[i].hour) {
                        res += schedule[i].hour + " : " + schedule[i].minute + "0";
                    } else if(hour == schedule[i].hour) {
                        if(min < schedule[i].min) {
                            res += schedule[i].hour + " : " + schedule[i].minute + "0";
                        } else {
                            if(i == current) {
                                res += "Now<br>";
                            }
                            res += schedule[i].bluewin + " vs " + schedule[i].purplewin;
                        }
                    } else {
                        if(schedule[i].bluewin > schedule[i].purplewin) {
                            res += "<span style='color:rgb(100,100,200)'>" + schedule[i].bluewin + "</span> vs <span style='color:rgb(200,100,100)'>" + schedule[i].purplewin + "</span>";
                        } else if(schedule[i].bluewin < schedule[i].purplewin){
                            res += "<span style='color:rgb(200,100,100)'>" + schedule[i].bluewin + "</span> vs <span style='color:rgb(100,100,200)'>" + schedule[i].purplewin + "</span>";
                        } else {
                            res += schedule[i].bluewin + " vs " + schedule[i].purplewin;
                        }
                    }
                    
                } else if(day < schedule[i].day) {
                    res += "D - " + (schedule[i].day - day).toString() + "<br>";
                    res += "<span style='font-size: small;'>" + schedule[i].hour + " : " + schedule[i].minute + "0</span>";
                } else {
                    if(schedule[i].bluewin > schedule[i].purplewin) {
                        res += "<span style='color:rgb(100,100,200)'>" + schedule[i].bluewin + "</span> vs <span style='color:rgb(200,100,100)'>" + schedule[i].purplewin + "</span>";
                    } else if(schedule[i].bluewin < schedule[i].purplewin) {
                        res += "<span style='color:rgb(200,100,100)'>" + schedule[i].bluewin + "</span> vs <span style='color:rgb(100,100,200)'>" + schedule[i].purplewin + "</span>";
                    } else {
                        res += schedule[i].bluewin + " vs " + schedule[i].purplewin;
                    }
                }
            } else if(month < schedule[i].month) {
                if(month == 5) {
                    res += "D - " + (schedule[i].day + 31 - day).toString() + "<br>";
                    res += "<span style='font-size: small;'>" + schedule[i].hour + " : " + schedule[i].minute + "0</span>";
                } else {
                    res += "D - " + (schedule[i].day + 30 - day).toString() + "<br>";
                    res += "<span style='font-size: small;'>" + schedule[i].hour + " : " + schedule[i].minute + "0</span>";
                }
            } else {
                if(schedule[i].bluewin > schedule[i].purplewin) {
                    res += "<span style='color:rgb(100,100,200)'>" + schedule[i].bluewin + "</span> vs <span style='color:rgb(200,100,100)'>" + schedule[i].purplewin + "</span>";
                } else if(schedule[i].bluewin < schedule[i].purplewin) {
                    res += "<span style='color:rgb(200,100,100)'>" + schedule[i].bluewin + "</span> vs <span style='color:rgb(100,100,200)'>" + schedule[i].purplewin + "</span>";
                } else {
                    res += schedule[i].bluewin + " vs " + schedule[i].purplewin;
                }
            }
        }
        center.innerHTML = res;
        center.className = "divTb";
        let right = document.createElement("div");
        right.className = "rightTeam divTb";
        right.innerHTML = "<img src='./images/logo/logo_" + schedule[i].purple + ".png' height='50px' width='50px' alt='"+schedule[i].purple+"'>";
        line.appendChild(left);
        line.appendChild(center);
        line.appendChild(right);
    }

    function iterateOption() {
        var option0 = document.getElementById("roomoption:0");
        var option1 = document.getElementById("roomoption:1");
        var option2 = document.getElementById("roomoption:2");
        if(roomoption == 0) {
            option0.className = "optionselected social";
            option1.className = "option social";
            option2.className = "option social";
        } else if(roomoption == 1) {
            option0.className = "option social";
            option1.className = "optionselected social";
            option2.className = "option social";
        } else if(roomoption == 2) {
            option0.className = "option social";
            option1.className = "option social";
            option2.className = "optionselected social";
        } else {
            option0.className = "option social";
            option1.className = "option social";
            option2.className = "option social";
        }
    }

    $(document).on('click','.subbt', function() {
        let inputBox = document.getElementById("titleInput");
        if(inputBox.value == "") {
            document.getElementById('noNameforRoom').innerHTML = 'Enter name for your room.';
            return;
        }
        if(roomoption == -1) {
            document.getElementById('noNameforRoom').innerHTML = 'Choose option.';
            return;
        }
        location.replace("./privateroom.html?title="+inputBox.value+"&host=Me&option="+roomoption);
    })

    $(document).on('click','.option', function() {
        let tmp = $(this).attr('id');
        roomoption = tmp.slice(11) * 1; 
        iterateOption();
    })

    $(document).on('click', '#createroom', function() {
        //alert("create room");
        initroomoption();
        location.replace("?#popup1");
    })

    $(document).on('click', '.room',function() {
        let id = this.content;
        let friend;
        for(let i = 0; i < friends.length; i++) {
            if(friends[i].id == id) {
                friend = friends[i];
                break;
            }
        }
        location.replace("./privateroom.html?title="+friend.title+"&host="+friend.name+"&option="+(friend.secure ? 1:2));
    })

    $(document).on('click', '.set',function() {
        let gid = $(this).parent().attr("id");
        let set = this.content;
        location.replace("./replay.html?gid="+gid.slice(3)+"&set="+set);
    })

    $(document).on('click','#official_streaming',function() {
        location.replace("./streaming.html")
    })

    $('#streamertable tbody').on('click','.streamerLine',function() {
        let link = this.content;
        window.open(link);
    });

    $(document).on('click','#upSchedule',function() {
        let scheduleTable = document.getElementById("scheduletable");
        scheduleTable.scrollTop-=75;
    });

    $(document).on('click','#downSchedule',function() {
        let scheduleTable = document.getElementById("scheduletable");
        scheduleTable.scrollTop+=75;
    });


    initSchedule();
    setStreamers();
    setRooms();
    setReplays();
});
    