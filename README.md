# Backstreet Boys Player
This project is a single page web app that fetches a list of urls of video and audio content along with titles and images. The goal is to display them, with the option to play, pause, skip forward, and go back by track until there is nothing more to play.

## Running Locally
To run this locally, pull down the repo and run ```npm i && npm start``` from the terminal.
**NOTE:** If you have an issue running, check your node version. This was created on node ```v10.19.0```

## Requirements
- Ability to playback both audio and video tracks
- Display the currently playing track’s title and artwork/video
- Display a list of all playable tracks
	- Indicate the currently playing track in the list
	- Ability to click a track in the list to start playing it
- Ability to skip to next or previous track
- Ability to automatically start playing the next track when current track ends
- Ability to stop playback if there are no tracks to skip/advance to
- Track playback does not need to start on page load, playback is user-initiated

Here’s a rough wireframe of what your app should look like:
<img width="593" alt="Screen Shot 2021-03-19 at 8 45 16 PM" src="https://user-images.githubusercontent.com/30905686/111854126-11628880-88f4-11eb-8370-af385957fc3c.png">

## Notes on Project
First and foremore, this was some of the most fun I've had working on a project. It's a fun concept with some challenges along the way to make you think.

### Approach
Before starting the timer, I took some time to look at the wireframe and figure out if this would be better in React or with Vanilla JS. I ended up choosing React since it already has state management. I may go back and try it with Vanilla JS (thinking you could do a Node server and use Pug.js to create the template server side and then send it to the client).

### Basic State Structure
Once I settled on React, then I took some time to plot out what needed to happen. Basically it became a home component (```App.js```) with two branches: the track list and the track player. These branches would then need to inform the other on their changes. That meant that all major state needed to be housed in ```App.js```. From there I broke out my tasks (get the data, parse the data, present the data, and manipulate the data)

### Media Elements
I needed to decide if I wanted to find a package to handle the media elements. I decided given the time frame it would be better to just lean into my knowledge of the regular audio and video tags. Since they match - outside of the names - I utilized that to just update the source depending on the current track.

### Layout
I tried to stick to the wireframe but did manage to get a few additional features in there. I knew from the beginning that - personally as a user - I would want the audio and video separated out. I'm fine switching between the two, but my brain would be confused without it being clear. I also tried to make it as clear as possible what kind of experience the user was about to have by having clear labels on the nav.

Responsiveness was also something I wanted to get in there. Even just basic responsiveness (although I wish I had a little bit of time to do some more responsiveness).

### Assumptions
There were a few things that were open ended from the description and requirements that I had to make decisions on for this project.
	- Duplicate Tracks: I noticed what appeared to be duplicate audio and video items. At first glance, I thought I should take the time to remove the duplicate tracks. Then I examined each mediaUrl and realized they never repeat. Therefore I decided to keep all tracks, but in a real life scenario, I'd have this conversation with Product and then either the backend or frontend may need to remove duplicate tracks.
	- Sorting Options: In the description it said "displaying them (the tracks) in order", however it didn't say what the order should be. I knew I wanted to sort them by medium due to personal preference, but looking at the wire frame I assumed the brief actually meant to sort by title name (especially since none of the tracks had an id number). I decided to do both, but in real life I would need to talk to Product about this.

### Wish List
I tried to stick as close to the 2 hour time limit (excluding my pre-building planning, any non-building tasks (i.e. pull requests), and this README). Had I had more time there was a list of things I would have liked to do:
	- Unit Tests: This was a big one that I wanted to get into the project (and meant to). I was short on time and I hadn't applied the styles yet. I also wanted some time at the end to do some code cleanup. Therefore, the unit tests got cut from the list since it was not listed as a requirement or mentioned in the brief. Normally, I would write them as I go along, but I had planned to do them at the end and just ran out of time.
	- Track Duration: Since this was not mentioned in the requirements, I decided it was a nice to have but not a must. I wanted to utilize ```Moment.js``` if there was time to display each tracks duration when it was playing
	- Refactor Pointer Logic: Towards the end I was not thrilled with my pointer logic. I feel it could have been cleaner to just grab the index of the item in the array rather than having an index on each individual track to look for
	- Refactor Props: For ```TrackList.js``` and ```TrackButton.js```, I had quite a few props being passed down. I feel it would have been cleaner to pass down a ```callback``` and ```data``` object that could then just be destructured out within each component
	- Refactor Buttons: In both ```TrackList.js``` and ```TrackPlayer.js``` I have buttons that could have been refactored back to their own components like ```TrackButton.js``` is. Just didn't have time to get to it
	- Track Title Cleanup: I thought about removing the "by Backstreet Boys" from each track, but didn't want to spend too much time on that when I still had other tasks to achieve
	- Responsiveness: While I managed to get some responsiveness in there, there is a ton more I could have done
