const playlistSongs = document.getElementById('playlist-songs');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const shuffleButton = document.getElementById('shuffle');

const allSongs = [
    {
      id: 0,
      title: "Scratching The Surface",
      artist: "Quincy Larson",
      duration: "4:25",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
    },
    {
      id: 1,
      title: "Can't Stay Down",
      artist: "Quincy Larson",
      duration: "4:15",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
    },
    {
      id: 2,
      title: "Still Learning",
      artist: "Quincy Larson",
      duration: "3:51",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
    },
    {
      id: 3,
      title: "Cruising for a Musing",
      artist: "Quincy Larson",
      duration: "3:34",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
    },
    {
      id: 4,
      title: "Never Not Favored",
      artist: "Quincy Larson",
      duration: "3:35",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
    },
    {
      id: 5,
      title: "From the Ground Up",
      artist: "Quincy Larson",
      duration: "3:12",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
    },
    {
      id: 6,
      title: "Walking on Air",
      artist: "Quincy Larson",
      duration: "3:25",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
    },
    {
      id: 7,
      title: "Can't Stop Me. Can't Even Slow Me Down.",
      artist: "Quincy Larson",
      duration: "3:52",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
    },
    {
      id: 8,
      title: "The Surest Way Out is Through",
      artist: "Quincy Larson",
      duration: "3:10",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
    },
    {
      id: 9,
      title: "Chasing That Feeling",
      artist: "Quincy Larson",
      duration: "2:43",
      src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
   },
];
const audio = new Audio();
let userData = {
    songs : [...allSongs],
    currentSong : null,
    songCurrentTime : 0,
};

const playSong = id => {
    const song = userData?.songs.find((song)=>id === song.id);
    audio.src = song.src;
    audio.title = song.title;

    //if there is no song is playing or you want to play another song
    if(userData?.currentSong === null || userData?.currentSong.id !== song.id){
        audio.currentTime = 0;
    }
    //if you want to play the same song(for example you paused and you want to continue)
    else{
        audio.currentTime = userData?.songCurrentTime;
    }
    userData.currentSong = song;
    playButton.classList.add('playing');

    highlightCurrentSong();
    setPlayerDisplay();
    setPlayButtonAccessibleText();
    audio.play();
};
const pauseSong = () => {
    //save the time you paused the song at (ama agy a3ml play tany abd2 mn nfs almkan)
    userData.songCurrentTime = audio.currentTime;
  
    playButton.classList.remove("playing");
    audio.pause();
};
const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);
const playNextSong = () => {
    //if there is no playing song then play the first one in the playlist
    if(userData?.currentSong === null){
        playSong(userData?.songs[0].id);
    }
    else{
        const currentSongIndex = getCurrentSongIndex();
        //if the current song is the last one then play the first song
        if(currentSongIndex === userData?.songs.length - 1){
            playSong(userData?.songs[0].id);
        }
        else{
            playSong(userData?.songs[currentSongIndex + 1].id);
        }
    }
};
const playPreviousSong = () => {
    //if there is no playing song then there is no previous song
    if (userData?.currentSong === null) return;
    else {
        const currentSongIndex = getCurrentSongIndex();
        const previousSong = userData?.songs[currentSongIndex - 1];

        playSong(previousSong.id);
    }
};
const shuffle = () =>{
    userData?.songs.sort(()=>Math.random() - 0.5);
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    renderSongs(userData?.songs);
    pauseSong();
    playSong(userData?.songs[0].id);
    setPlayerDisplay();
    setPlayButtonAccessibleText();
};
const deleteSong = id => {
    if(userData?.currentSong?.id === id){
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        pauseSong();
        setPlayerDisplay();
    }
    userData.songs = userData?.songs.filter((song)=>song.id !== id);
    renderSongs(userData?.songs);
    highlightCurrentSong();
    setPlayButtonAccessibleText();

    if(userData?.songs.length === 0){
        const resetButton = document.createElement('button');
        const resetText = document.createTextNode('Reset Playlist');

        resetButton.id = "reset";
        resetButton.ariaLabel = "Reset Playlist";
        resetButton.appendChild(resetText);
        playlistSongs.appendChild(resetButton);

        resetButton.addEventListener('click',()=>{
            userData.songs = [...allSongs];
            renderSongs(sortSongs());
            setPlayButtonAccessibleText();
            resetButton.remove();
        });
    }
};
const setPlayerDisplay = () => {
    const playingTitle = document.getElementById('player-song-title');
    const songArtist = document.getElementById('player-song-artist');
    const currentTitle = userData?.currentSong?.title;
    const currentArtist = userData?.currentSong?.title;

    playingTitle.textContent = currentTitle ? currentTitle : "";
    songArtist.textContent = currentArtist ? currentArtist : "";
};
const sortSongs = () => {
    userData?.songs.sort((a,b)=>{
        if(a.title < b.title){
            return -1;
        }
        if(a.title > b.title){
            return 1;
        }
        return 0;
    });
    return userData?.songs;
}
const renderSongs = array => {
    const songsHtml = array.map((song) => {
        return `<li class="playlist-song" id="song-${song.id}">
            <button class="playlist-song-info" onclick="playSong(${song.id})">
                <span class="playlist-song-title">${song.title}</span>
                <span class="playlist-song-artist">${song.artist}</span>
                <span class="playlist-song-duration">${song.duration}</span>
            </button>
            <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
        </li>`;
    }).join("");
    playlistSongs.innerHTML = songsHtml;
};
const highlightCurrentSong = () =>{
    //get all playlist-song elements
    const playlistSongElements = document.querySelectorAll('.playlist-song');
    //get the song that is playing to highlight it
    const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);
    //remove the aria-current attribute from all the song elements
    playlistSongElements.forEach((song)=>{
        song.removeAttribute('aria-current');
    });
    //if there is playing song then set the aria-current attribute for it
    if(songToHighlight){
        songToHighlight.setAttribute('aria-current',"true");
    }
};
const setPlayButtonAccessibleText = () => {
    const song = userData?.currentSong || userData?.songs[0];

    playButton.setAttribute("aria-label",
        song?.title ? `Play ${song.title}` : "Play"
    );
};


playButton.addEventListener('click',()=>{
    if(userData?.currentSong === null){
        playSong(userData?.songs[0].id);
    }
    else{
        playSong(userData?.currentSong?.id);
    }
});
pauseButton.addEventListener('click',pauseSong);
nextButton.addEventListener('click',playNextSong);
previousButton.addEventListener('click',playPreviousSong);
shuffleButton.addEventListener('click',shuffle);
audio.addEventListener('ended',()=>{
    const currentSongIndex = getCurrentSongIndex();
    const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;
    if(nextSongExists){
        playNextSong();
    }
    else{
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        pauseSong();
        setPlayButtonAccessibleText();
        setPlayerDisplay();
        highlightCurrentSong();
    }
});

renderSongs(sortSongs());
setPlayButtonAccessibleText();