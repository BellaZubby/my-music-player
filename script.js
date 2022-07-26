const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeE1 = document.getElementById('current-time');
const durationE1 = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const repeatBtn = document.getElementById('repeat');
const shuffleBtn = document.getElementById('shuffle');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// music
const songs = [
    {
        name: 'memories-1',
        displayName: 'Memories',
        artist: 'Maroon 5'
    },
    {
        name: 'oceans-1',
        displayName: 'Oceans',
        artist: 'Hillsong'
    },
    {
        name: 'This is me-1',
        displayName: 'This is me',
        artist: 'The-Greatest-Showman-Ft-Keala-settle'
    },
    {
        name: 'titanium-1',
        displayName: 'Titanium',
        artist: 'David-Guetta-Ft-Sia'
    },
    {
        name: 'unstoppable-1',
        displayName: 'Unstoppable',
        artist: 'Sia'
    }
];


console.log(songs);
// check if playing
let isPlaying = false
// play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

// pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

// update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `songs/${song.name}.mp3`;
    image.src = `Album-cover/${song.name}.avif`;
}

// current song
let songIndex = 0

// previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


let isRandom = false;
// next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length-1 && isRandom === false) {
        songIndex = 0;
    }else if (isRandom === true) {
        let randIndex = Math.floor(Math.random() * songs.length);
        songIndex = randIndex;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// on load select first song
loadSong(songs[songIndex]);

// for repeat

music.loop = false;
function repeatSong() {
    if (music.loop != true) {
        music.loop = true;
        repeatBtn.style.color = "black"
        repeatBtn.setAttribute('title','remove-loop');
        music.play();   
    }else {
        music.loop = false;
        repeatBtn.style.color = "";
        repeatBtn.setAttribute('title','loop');
        music.play()
    }
    } 
    // for shuffle

    function randSong() {
        isRandom ? pauseRandom() : playRandom();  
    }

    function playRandom() {
        isRandom = true;
        shuffleBtn.style.color = "black";
        shuffleBtn.setAttribute('title','remove-shuffle');
    }
    function pauseRandom() {
        isRandom = false;
        shuffleBtn.style.color = "";
        shuffleBtn.setAttribute('title','shuffle');
    }
        
// update progress bar and time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // update progressBar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // cal dipslay for duration minutes
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration element to avoid NaN
        if (durationSeconds) {
            durationE1.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // cal display for current Time
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        if (currentSeconds) {
            currentTimeE1.textContent = `${currentMinutes}:${currentSeconds}`;
        }

    }

}

// set progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    console.log(width);
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
    

}










// event listener
prevBtn.addEventListener('click', prevSong);
repeatBtn.addEventListener('click', repeatSong);
shuffleBtn.addEventListener('click',randSong);
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);


