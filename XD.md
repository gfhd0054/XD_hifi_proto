# [Team XD] DP4: Hi-fi prototype
 
## Members
 
- 20150145 Kim SangUk
 
- 20170361 Shin Yourim
 
- 20170490 Lee Jaejun
 
- 20180693 Choi Junyoung
 
## POV
 
- "League of Legend" league match viewers, who watch it regularly...
 
- are looking for more enjoyable way to watch matches...
 
- since user wants to lightly enjoy the league contents, not too detailed information.
  
 
## Target users

- "League of Legend" league match viewers who felt boring at current system, just watching game.
 
 
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
 
1. Watch live match in the 'private room' with your friends.
   1. Click create room button to create your room. you should set name of your room and option for it. 
   2. OR click friend’s room button to enter friend's room and watch matches together.
   3. While watching, you can also invite friends to your room.
   4. You can chat with your friends.
   5. You can remove your room by clicking "quit" button and leave friend's room by clicking "leave" button.
   
 
2. Go to the official streaming. Enjoy it and take a pop-up game.
   1. Go to watch official streaming of the league matches by clicking "Public Broadcast" text or thumbnail in the main page.
   2. Clicking the play button or video itself to play the current streaming.
   3. Popup for quiz will appear. Time to solve quiz is shown intuitively. When time set, popup disappear automatically. popup  Solving is not necessary.
   4. When the question situation is happened, popup to tell whether you are correct or not appears. It will disappear like quiz popup.
   5. You can keep enjoying watching matches.

 
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

- We developed video player feature from youtube.


### Representative Screenshots

1. Task 1
   ![Alt text](./images/Task%201.png) 
   
2. Task 2
   ![Alt text](./images/Task%202.png) 
   
3. Task 3
   ![Alt text](./images/Task%203.png)