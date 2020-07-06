# [Team XD] DP6 : Final Report

## Members

- 20150145 Kim SangUk
 
- 20170361 Shin Yourim
 
- 20170490 Lee Jaejun
 
- 20180693 Choi Junyoung

## Screenshots

We expect those 3 solution tasks can give novel, efficient, joyful ways for users to enjoy the ‘watching’ experience.

###  Task 1 ![Task1PNG](https://raw.githubusercontent.com/gfhd0054/XD_hifi_proto/master/images/Task%201.png) 
   
###  Task 2
   ![Task2PNG](https://raw.githubusercontent.com/gfhd0054/XD_hifi_proto/master/images/Task%202.png) 
   
###  Task 3
   ![Task3PNG](https://raw.githubusercontent.com/gfhd0054/XD_hifi_proto/master/images/Task%203.png)

## Quality arguments

Our UI is invaluable in the sense of 'successful implantation of novel features'. In many redesigning processes, it is easy to success by simplifying things. However, it's dangerous to add more features since users can think it's useless or disturbing original experience. Actually we had many comments about it from lo-fi prototype, such as 'The popup is disturbing me a lot', or 'Timestamp can make the video player messy'. Therefore, we kept discussed about the appropriate design, and they were successful. Positive comments such as 'Now the popup is really fit', 'Timestamp hiding feature is satisfactory', or 'I like the ideas', has increased.

What we thought important is the natural, intuitive and entertaining interaction. For the popup quiz, we concerned about how to make the quiz with less text information and intuitive design. We decided to make the background color is shading linearly to substitute timer, and add a noticeable hovering event to quiz options. This makes the quiz highly intuitive and users can catch the purpose of it quickly.

In the DP3, there were comments that 'I don't get the meaning of color of each timestamps'. To improve this, we placed a team color on the title of replay video so users can get the meaning of color in an unconscious manner. After this, users could catch the point better. The arrangement of timestamps is inspired by the interface of in-game statistics. We expect this can be an effective metaphor for League of Legend player and impose 'This team did well at this time'.

For private room feature, to help understanding the purpose of this feature, we provide the small explanation of options while creating it.

While this kind of 'unseen' interactions are novelty of our implementation, we've also made our site that we can easily manage the league data by local files. The list of match schedule, score, list of replay videos, thumbnails, list of friends and room's owner's name, id of owner and security of each rooms, all of them are fetched from each csv file. This means it is possible that we can really adjust the ongoing league match data into our site. It increases the robustness of our site, because the error in data can be easily managed by csv file rather than traveling the html elements.

Another potential of our features is that, it can be adjustable to other sports leagues also. Baseball, basketball, Premiere leagues also support online streaming and replay videos. In the middle of COVID 19 situation, our service could meet demands for lots of fans-users! By the way, our solutions are based on the users from League of Legend match watcher. So additional needfinding step would be needed to confirm our solutions are also adjustable to other sports league. 
However, we think our three solutions 'Private space for streaming', 'Enjoyful quiz while preparing match', and 'timestamps directly on replay video player' are possible to be generalized.


## Iteration

Throughout the user testing, we have learned that users focus on the natural experience rather than new solutions. The nuance of comments was, “I want common, consistent interactions. I also hope this system can handle more unexpected user behavior. By the way, your ideas are good.”. Therefore, we decided to use our left periods for improving aesthetic, visibility, and user control.

For aesthetic aspects, there were some disturbing elements that don’t fit to the layout. Those elements are reorganized and arranged in unified structure. To give more realistic experience, background image is processed and inserted.

For visibility, friend invitation feature is upgraded so that user can see the friend list and invitation message. Hovering events are added on the video thumbnails.

For making various user interaction and controls, our chatting system is improved. Now users' own chat and others' chat is separated. Enter key can send the message. We updated feature for creating timestamp to replay video player, so that user can create their own highlights. However, there are several tasks left such as limiting reckless timestamp creation or reply tabs. It was hard to think about best design to implement, so we decided to think more about it.

For the overall iteration process, we also planned to handle some scroll events, such as hiding/showing main header or adjusting size of elements according to scroll. However, to support them, we also had to study from the bottom. We've felt there are still lots of things we can do for our sites, and lots of thing to study.

Also we could completely learn about cycle of user-centered design process. We've felt that, it is important to open ears to users' opinions, and take the iteration as a pleasure. Without it, not even a golden idea can be a sensational product.


## Individual reflection

### Junyoung Choi
I contributed to several parts. First, I made main page of the website. There are several elements in the main page; schedule of matches, recommended streamers, list of friends’ private room, and list of replay videos. Information of schedule of matches is in the csv file and I made table of the schedule that user can scroll up and down to check. User can go to website where streamers broadcast by clicking the button. Plus, there are thumbnails that are linked to the page for friends’ private room, official streaming, and replay videos which are for main function of our website. Second, I made chatting system in the official streaming and private room. With firebase, chatting log is saved and displayed according to who wrote that. Finally, I made distributed pages according to the information of the room. In the page of replay videos, there are different timestamps and title of the game. In the page of private rooms, there are different chats and title of the room. Pages are divided by information in the url. Data is selected according to the information, and each page is displayed differently.

Division of labor worked well in our team. In almost every step in project, our works are divided very equally. For example, while making high fidelity prototype, we divided what to implement. With that I can make my part assuming that other part is already completely made. However, since the project was the first meeting of our team members, step exchanging our ideas was the hard time at first. So we use KJ technique which is writing down our idea first and then talking about them. With it, we could exchange idea easier, but I felt that ice breaking may be needed to express each member’s idea well. I think this step would shorten meeting process.

I think to do user-centered design, we need some more interview sessions even user testing. Getting feedback from user could get more direct problem or solution of what we make. Thinking ourselves sometimes make us miss the point and concentrate at desultory way. So continuously interacting with users to implement in right way would lead to successful project. In the website, there is more sense of user than I thought, such as scroll event and chatting system. For example, in chatting system, if user can’t send message with key ‘enter’, user feel very strange and awkward with it. I think to satisfy the sense of the user is very important part in web-based GUI implementation.

### Sanguk Kim
I built a streaming part of our web page. The basic layout of the page and the basic structure of the recommended video and chat system have been developed. The basic structure of the chat window was established, but one of the difficulties was to build the chat system, which was solved with the help of Junyoung. After establishing the chat system, I modified the layout changes that occur depending on the contents of the chat.

Building the Web from a user perspective is a rather abstract and difficult process. This is because even if a user interview is conducted together, how the user's feedback is interpreted and how the user will react eventually involves the developers' subjective view. In this process, we had some conflicts of opinion, but we were able to resolve them through amicable dialogue. I feel sorry for the team members because I have delivered my opinion in a harsh manner since this semester has been exhausting with assignments and other studies. However, I think it was able to finish this project well thanks to the team members who did well through the smooth conversation.

### Yourim Shin
I implemented private room setting UI. I built popup of setting option for private room.popup code. First, I made in other html did not work for actual main page. Junyoung helped me at this issue. Also I was likely to lost when I look for specific div or elements in other’s code in inspect mode. overall I made an effort to be supportive, like finding features on the services we used for low-fi prototype that can easily share css code and share with teammates. We did the work by dividing so each of our members was responsible to own part. Through user-centered design process and web-based GUI implementation, I learned importance of direct observation from users. Imagination and expectation in designer’s perspective was not enough.

### Jaejun Lee
First, I have built interactive video player. I implemented our own video control bar. User can move to specific point of video by clicking timestamps directly implemented on that control bar, and also user can create them easily. In the streaming video, I’ve designed a guessing popup-quiz, with interactive, animated elements. Next, I’ve made friend invitation feature in the private streaming room. I made the main header also.

Since it was our first web design experience, we had some bugs in windows that each of us built. For example, some elements are not positioned relatively so it travels around respect to window size. In other course, I’ve used to investigate the div structure of other websites while crawling information from html source. Therefore, I could contribute to resolve the bugs in UI structure, and rearranging the hierarchy of elements in more intuitive way. Plus, the UI for watching replay video is also from me.

Lastly, I’ve improved some details to make users feel our prototype as real service, and users don’t be bored easily. I’ve added hovering event to video thumbnails and interactive video player elements. While creating private room, some errors such as empty room name are well informed by message. Also, I designed the background image.

In our team, the work distribution and communication was awesome. There was no member who wants to do less than other, and showed lots of enthusiasm. After the individual works, we shared our thoughts on each works and merged them into great piece. Everyone tried to represent their thoughts and follow the entire contents. This atmosphere itself has encouraged us to participate more actively.

However, there were sharp conflicting opinions between me and other member sometimes. In this situation, other members helped a lot by suggesting other points of view. It was not easy to change my opinion but their kind suggestion helped me to understand and change my mind. In fact, I was not good at listening others but I’ve learned how to listen by this course. I’ve felt the other’s thoughts are also as gold as mine. It is most important to have a opened door to others while arguing my own opinion.

During the whole process, I’ve learned the users are really center for the product design. When I used to think about some toy project, I didn’t consider about the users’ demands or voices at all. However, if I follow the design steps we’ve learned so far, as the needfinding and user testing step, it can make my toy project into some golden product. When I belong to company and develop new things someday, I would think users thoughts as most precious standards.

Also, I’ve felt the any usual interface we meet is not just usual things. They need to be constructed from highly concrete plan and so much considerations. Also, it was charming to get direct feedback of implementation by interface. I want to be more skillful in web implementation and keep interact with user and computer.
 
## URL of Demo Video
https://youtu.be/Kp_wNAolaYw
