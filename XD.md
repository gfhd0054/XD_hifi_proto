# [Team XD] DP4: Hi-fi prototype
 
## Members
 
- 20150145 Kim SangUk
 
- 20170361 Shin Yourim
 
- 20170490 Lee Jaejun
 
- 20180693 Choi Junyoung
 
## POV
 
- "League of Legend" league match viewers, who watch it regularly...
 
- are looking for more enjoyable way to watch matches...
 
- since user wants to lightly enjoy the league contents, neither too detailed information nor boring.
  
 
## Target users

- "League of Legend" league match viewers who felt boring at current system that just watching game.
 
 
## Solutions

1. **Private room** for watching official league match so that users can share synchronized/private conversation with their friends.
 
  
 
2. **Pop-up game** (Predicting random game elements in league matches, such as “who will take first kill”) while live match. Good predictors get prizes.
 
  
 
3. **Timestamps** directly implemented on replay video player.
 
   - Users can shift to a specific highlight by this timestamp.
 
   - Users can actively create the timestamp by voting to specific time moment or timestamp itself.
 
   - Timestamp is colored with specific team color, since the highlight has a spotlighted team that played well.
 
   - It would provide a comfortable way to travel around the replay video, and encourage the participation and belongings of fans.


## Tasks

Solutions are translated into three user-level tasks in our prototype. Below the task is scenario of each task.
**Assumed** that user is **already logged in** and the date is **2020.06.09**.
 
1. Watch live match in the 'private room' with your friends.
   1. Click 'create room' button to create your room. Set the room name. Set option as 'Private'. 
   2. OR click friend’s room button to enter friend's room and watch matches together.
   3. While watching, you can also invite friends to your room.
   4. You can chat with your friends.
   5. You can remove your room by clicking "quit" button and leave friend's room by clicking "leave" button.
   
 
2. Go to the official streaming. Enjoy it and take a pop-up game.
   1. Make sure you are in main page.
   2. Go to watch official streaming of the league matches by clicking "Public Broadcast" text or thumbnail in the main page.
   3. Videos would be auto-played.
   4. Pop-up game will appear. Time to solve quiz is shown intuitively. When time set, pop-up disappears automatically. It is not necessary to solve.
   5. When the answer is confirmed in-match, pop-up would tell you whether you're correct or not. It will disappear in a few seconds.
   6. You can keep enjoying watching matches.

 
3. Watch the replay video [2020. 06. 07 DRX vs DWG set1]
   1. There are list of replay videos at the bottom of main page.
   2. Find corresponding replay video, [2020. 06. 07 DRX vs DWG set1].
   3. Start watching that interesting game.
   4. On the video player controls, some colored bands would be there.
   5. Experience and check what are they for.

 

## Implementation Notes

### URL of prototype

- https://gfhd0054.github.io/XD_hifi_proto/

### URL of Git repository

- https://github.com/gfhd0054/XD_hifi_proto

### Libraries and frameworks

- FontAwesome for icons : https://use.fontawesome.com/releases/v5.0.8/css/all.css
- Google Fonts(Ubuntu family) : https://fonts.googleapis.com/css?family=Ubuntu
- jQuery Easing v1.3 : http://gsgd.co.uk/sandbox/jquery/easing/

## Representative Screenshots

### 1. Task 1
   ![Task1PNG](https://i.ibb.co/MRHPvf9/Task-1.png) 
   
### 2. Task 2
   ![Task2PNG](https://i.ibb.co/B30mMNX/Task-2.png) 
   
### 3. Task 3
   ![Task3PNG](https://i.ibb.co/X7bcwWJ/Task-3.png)

## Individual Reflections

### SangUk
- Which part of the UI did you directly contribute to?
   - Streaming Page of the website
      - basic layout
      - recommended video
      - basic chatting structure
- What were some of the difficulties you faced?
   - Build Chatting system(Thanks to Jun-young, it could be implemented.)
- List one of useful implementation skill you learned while working on this milestone.
   - working experience with team mates in real time using Git Hub
### Yourim
- Which part of the UI did you directly contribute to?

- What were some of the difficulties you faced?

- List one of useful implementation skill you learned while working on this milestone.

### Jaejun
- Which part of the UI did you directly contribute to?
   - Toolbar at the upmost of window.
   - Custom video player for streaming.
      - Supported basic controls: play, pause, mute, unmute.
      - Task 2: Pop-up game interface, predicting in-game elements and check the answer.
   - Custom video player for match replay.
      - Supported basic controls: play, pause, mute, unmute, progress bar.
      - Task 3: Timestamps implemented on the progress bar. flag icon for timestamp visibility.
      - vote interface for each timestamps.
   - UI for replay page.
   - Complements
      - Hover event on public broadcast image on main page.
      - Detail design in public or private streaming page.
      - 'Invite friend' feature.
      - Exception case handling while creating private room.
   
- What were some of the difficulties you faced?
   - Dealing with large file. (In the beginning, our video was 1.6B total.)
      - Tried to host the video somewhere and get it as iframe. -> Failed due to video controls of that host.
      - Tried to use git-lfs. -> Failed due to the total size of file exceed limit.
      - I've not found proper solution. So we decided to chunk the video at least the user can do his task.

- List one of useful implementation skill you learned while working on this milestone.
   - Jquery.animate() for making interactive UI elements.

### Junyoung
- Which part of the UI did you directly contribute to?
   - Main page of the website
      - schedule, recommended streamer
      - list friends' room
      - list replay list
   - Chatting system in the official streaming and private room
   - Distributing pages according to the information of the room
      - replay of different game
      - room of different person 

- What were some of the difficulties you faced?
   - Adjust the size of the element to organize UI good to see. e.g. width and height of div
  
- List one of useful implementation skill you learned while working on this milestone.
   - creating and using "div" element by javascript as child or parent of other "div" element from database or data file.

## Studio Reflections

1. Is there no sign-up function though there are chatting and friend systems?
   - We assume that it is already logged in. We should tell user before starting user test clearly.

2. How the timestamp in the replay video is generated?
   - It is now hard-coded data, but we would develop it so that users can create it. We would also approach to generate timestamp data from user vote, using GMM or something else.
   
3. Development after studio reflection
   - Schedule
     - User can not only click the arrow button but also scoll to control schedule
     - User can see more detailed information of the schdule of games (e.g. current game, time)
   - Chatting system
     - Distribute friend's chat and user's chat
     
 4. Future plan
    - Pop-up game.
       - Add real-time vote status display.
    - Timestamp
       - Make user can create own timestamp.

## References
- Create A Custom HTML5 Video Player, https://youtu.be/yY6XnbWnK4o
- Chatting message design from zoom chat, https://zoom.us/
- function *doesFileExist()* in main.js, https://www.kirupa.com/html5/checking_if_a_file_exists.htm
- Pop-up feature structure, https://codepen.io/imprakash/pen/GgNMXO
