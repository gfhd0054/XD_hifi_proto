$(document).ready(function () {
    $(".header").load('./homepage.html');

    let schedule = [];
    let streamers = [];
    let friends = [];
    let schNum = -1;
    let current = -1;

    let roomoption;             // 0 : public, 1 : private, 2 : secret

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
                tmp['secure'] = rowCells[2];
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
                set.innerHTML = "<img class='thumbnail' src='" + imgSrc + "'width='192px' height='108px'><br><span style='font-family: Ubuntu; font-size: medium'>Set " + (j+1) + "</span>";
                replay.appendChild(set);
            }
            replaysDiv.appendChild(replay);
        }
    }

    function setRooms() {
        let friendsDiv = document.getElementById("private");

        for(let i = 0; i < friends.length; i++) {
            if(friends[i].secure == "open") {
                let friend = document.createElement("div");
                friend.className = 'horizontal room';
                friend.content = friends[i].id;
                let profLink = './images/profile/profile_'+friends[i].name+'.png';
                let chk = doesFileExist(profLink)
                let text = '<span style="font-family: Ubuntu; font-size: medium">' + friends[i].name + "'s room</span>";
                if(chk) {
                    friend.innerHTML = "<img class='thumbnail' src='" + profLink + "' width='192px' height='108px'><br>" + text;
                } else {
                    friend.innerHTML = "<img class='thumbnail' src='./images/profile/profile_default.png' width='192px' height='108px'><br>" + text;
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
                        updateSchedule(i);
                        return;
                    }
                }
            }
        }
    }

    function updateSchedule(i) {

        let today = new Date();
        let scheduleTable = document.getElementById("scheduletable");
        let numRows = scheduleTable.rows.length;

        for(let i = 1; i < numRows-1; i++) {
            scheduleTable.deleteRow(1);
        }

        schNum = i;
        var newRow = scheduleTable.insertRow(1);
        newRow.className = 'line';
        newRow.innerHTML = fillSchedule(today, i-2);
        newRow = scheduleTable.insertRow(1);
        newRow.className = 'line';
        newRow.innerHTML = fillSchedule(today, i-1);
        newRow = scheduleTable.insertRow(1);
        newRow.className = 'line';
        newRow.innerHTML = fillSchedule(today, i);
        newRow = scheduleTable.insertRow(1);
        newRow.className = 'line';
        newRow.innerHTML = fillSchedule(today, i+1);
        newRow = scheduleTable.insertRow(1);
        newRow.className = 'line';
        newRow.innerHTML = fillSchedule(today, i+2);
        return;

    }

    function fillSchedule(today, i) {
        res = "<img src='./images/logo/logo_" + schedule[i].blue + ".png' height='50px' width='50px' alt='"+schedule[i].blue+"' class='leftTeam'>";
        // let year = today.getFullYear();
        // let month = today.getMonth();
        // let day = today.getDate();
        // let hour = today.getHours();
        // let min = today.getMinutes();

        let year = 2020;
        let month = 6;
        let day = 9;
        let hour = 17;
        let min = 0;

        if(year == schedule[i].year) {
            if(month == schedule[i].month) {
                if(day == schedule[i].day) {
                    if(hour < schedule[i].hour) {
                        res += schedule[i].hour + " : " + schedule[i].minute + "0";
                    } else if(hour == schedule[i].hour) {
                        if(min < schedule[i].min) {
                            res += schedule[i].hour + " : " + schedule[i].minute + "0";
                        } else {
                            res += schedule[i].bluewin + " vs " + schedule[i].purplewin;
                        }
                    } else {
                        res += schedule[i].bluewin + " vs " + schedule[i].purplewin;
                    }
                    
                } else if(day < schedule[i].day) {
                    res += "D - " + (schedule[i].day - day).toString();
                } else {
                    res += schedule[i].bluewin + " vs " + schedule[i].purplewin;
                }
            } else if(month < schedule[i].month) {
                if(month == 5) {
                    res += "D - " + (schedule[i].day + 31 - day).toString();
                } else {
                    res += "D - " + (schedule[i].day + 30 - day).toString();
                }
            } else {
                res += schedule[i].bluewin + " vs " + schedule[i].purplewin;
            }
        }
        return res + "  <img src='./images/logo/logo_" + schedule[i].purple + ".png' height='50px' width='50px' alt='"+schedule[i].purple+"' class='rightTeam'>";
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
            return;
        }
        if(roomoption == -1) {
            return;
        }
        alert(inputBox.value);
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
        alert(friend.name + "'s room");
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

    $('#scheduletable tbody').on('click','#upSchedule',function() {
        if(schNum >= schedule.length - 4) return;
        updateSchedule(schNum + 1);
    });

    $('#scheduletable tbody').on('click','#downSchedule',function() {
        if(schNum <= 2) return;
        updateSchedule(schNum - 1);
    });




    initSchedule();
    setStreamers();
    setRooms();
    setReplays();

});

