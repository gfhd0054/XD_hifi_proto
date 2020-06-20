var invited = [];

$(document).ready(function () {
    $(".header").load('./homepage.html');
    $("#video").load('./streamingvideo.html');

    chatlog = [];

    var firebaseConfig = {
        apiKey: "AIzaSyB-Y3xcqtL9lTYdWhO3cobxoHDhlD9xyUk",
        authDomain: "cs374-dp.firebaseapp.com",
        databaseURL: "https://cs374-dp.firebaseio.com",
        projectId: "cs374-dp",
        storageBucket: "cs374-dp.appspot.com",
        messagingSenderId: "170901201583",
        appId: "1:170901201583:web:bc3ec2869361d7dd0cea5a",
        measurementId: "G-71SP52TR8F"
    };

    function writeToDatabase(writer,content) {
        var newmsg = firebase.database().ref('/officialchat/').push();
        let today = new Date();
        newmsg.set({
            hour: today.getHours(),
            min : today.getMinutes(),
            writer: writer,
            content: content,
        });
    }


    function readFromDatabase() {
        let msgdiv = document.getElementById("msglog");
        msgdiv.innerHTML = "";
        return firebase.database().ref('/officialchat/').once('value',function(snapshot) {
          var myValue = snapshot.val();
          var keyList = Object.keys(myValue);
          var cnt = 0;
          for(var i = 0; i<keyList.length; i++) {
            var myKey = keyList[i];
            let msg = document.createElement("div");
            let time;
            if(myValue[myKey].hour < 10) {
                time = "0" + myValue[myKey].hour+":";
            } else {
                time = myValue[myKey].hour+":";
            }
            if(myValue[myKey].min < 10) {
                time += "0" + myValue[myKey].min;
            } else {
                time += myValue[myKey].min;
            }

            if(myValue[myKey].writer == "Me") {
                msg.className = "mymsg";
                res = "<span style='font-size: x-small; color: rgba(150,150,150,1);'>" + time + "</span>";
                res += "<span style='float: right; color: rgba(100,100,200,1);'>" + myValue[myKey].writer + "</span><br>";
                res += "<span style='float: right;'>" + myValue[myKey].content + "</span>";
            } else {
                msg.className = "singlemsg";
                res = "<span style='color: rgba(100,100,200,1);'>" + myValue[myKey].writer + "</span>";
                res += "<span style='float: right; font-size: small; color: rgba(150,150,150,1);'>" + time + "</span><br>";
                res += myValue[myKey].content;
            }
            msg.innerHTML = res;
            msgdiv.appendChild(msg);

          }
          msgdiv.scrollTop = msgdiv.scrollHeight;
  
        });
      }


    function submitMsg() {
        let inputBox = document.getElementById("message_data");
        if(inputBox.value == "") {
            return;
        }
        writeToDatabase("Me",inputBox.value);
        readFromDatabase();
        inputBox.value = "";
    }

    function bindEvents() {
        var sendBtn = document.getElementById("message_button");
        sendBtn.onclick = function() {
            submitMsg();
        }

        document.addEventListener("keyup", function (event) {
      
            if(event.key == "Enter") {
              submitMsg();
            }
          }, true);
    }

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    //showMsg();
    readFromDatabase();
    bindEvents();
});
