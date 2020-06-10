# XD_hifi_proto

High fidelity prototype of XD - League of Legend streaming service platform
* Clone from XD_proto repository due to the git-lfs error. https://github.com/gfhd0054/XD_proto

## Collaborators
Undergraduate students in KAIST,
- Jaejun Lee (gfhd0054@kaist.ac.kr)
- Sanguk Kim (new93788@kaist.ac.kr)
- Yourim Shin (phrinee@kaist.ac.kr)
- Junyoung Choi (joonchoi518@kaist.ac.kr)

## Hosting
link : https://gfhd0054.github.io/XD_hifi_proto/

### Intruction

## Codes
**body.css**

- Simple css file removing body margin

**homepage.html, toolbar.css, homepage.js**

- Uppermost toolbar UI.
- Adjusted to other pages consistently
- Containing home button for entire site.

**index.html, main.css, main.js**

- Main homepage UI and interactions
- Pop-up UI and interactions while creating private room. - Task 1.

**newroom.css**

- Pop-up (creating private room) design.

**streaming.html, streaming.js**

- window for public broadcasting match, their UI elements and interactions.
- Video player element is here, by importing streamingvideo.html.
- Public chatting room is implemented, utilizing firebase.

**privateroom.html, privateroom.js**

- Derived from streaming.html, streaming.js.
- Having different chatting context, host name, and room name for each room.
- Support 'invite friend' feature

**streaming.css**

- css file for designing elements in streaming.html and privateroom.html, since two html files are sharing similar experience of 'watching online streaming video'.

**replay.html, replay.css, replay.js**

- Showing match replays.
- replayvideo.html is imported for its video player.

**streamingvideo.html, streamingvideo.css, streamingvideo.js**

- UI element for video player that support streaming environment.
- 

**replayvideo.html, replayvideo.css, replayvideo.js**


**others**

- code snippets for testing


## Resources

## References
1. jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
2. Create A Custom HTML5 Video Player - https://youtu.be/yY6XnbWnK4o
3. 
