$(document).ready(function () {
    $(".header").load('./homepage.html');
    $("#video").load('./replayvideo.html');

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

    function initSetting() {
        let gid = getData("gid");
        let set = getData("set");
        for(let i = 0; i < schedule.length; i++) {
            if(gid == schedule[i].id) {
                let title = document.getElementById("pageTitle");
                let res = '<span class="'+schedule[i].blue+'">'+schedule[i].blue+'</span>';
                res += '<span class="vs"> vs </span>';
                res += '<span class="'+schedule[i].purple+'">' +schedule[i].purple+ '</span>';
                res += '<span class="barrier"> | </span>';
                res += '<span class="smallText"> set '+set+' </span>';
                res += '<span class="barrier"> | </span>';
                let m,d;
                if(schedule[i].month < 10) {
                    m = "0" + schedule[i].month;
                } else {
                    m = schedule[i].month;
                }
                if(schedule[i].day < 10) {
                    d = "0" + schedule[i].day;
                } else {
                    d = schedule[i].day;
                }
                res += '<span class="smallText"> '+schedule[i].year+'.'+m+'.'+d+' </span>';
                title.innerHTML = res;
                return;
            }
        }
    }

    initSetting();
});
