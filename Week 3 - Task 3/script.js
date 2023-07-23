console.log("Welcome to SoundScape");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("E:\Courses\Web Development- CodeWithHarry\Week 3 - Task 3\songs\song1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Way Down We Go - KALEO", filePath: "songs/1.mp3", coverPath: "covers/song_1_cover.jpg" },
    { songName: "18 - One Direction", filePath: "songs/2.mp3", coverPath: "covers/song_2_3_cover.jpg" },
    { songName: "Fireproof - One Direction", filePath: "songs/3.mp3", coverPath: "covers/song_2_3_cover.jpg" },
    { songName: "2002 - Anne Marie", filePath: "songs/4.mp3", coverPath: "covers/song_4_cover.jpg" },
    { songName: "Overtaken - One Piece EPIC VERSION", filePath: "songs/5.mp3", coverPath: "covers/song_5_cover.jpg" },
    { songName: "Yun Hi Chala Chal Rahi - Swades", filePath: "songs/6.mp3", coverPath: "covers/song_6_cover.jpg" },
    { songName: "Suno Na Suno Na - Chalte Chalte", filePath: "songs/7.mp3", coverPath: "covers/song_7_cover.jpg" },
    { songName: "Ho Gaya Hai Tujhko - Dilwale Dulhania Le Jayenge", filePath: "songs/8.mp3", coverPath: "covers/song_8_cover.jpg" },
    { songName: "Shape of You - Ed Sheeran", filePath: "songs/9.mp3", coverPath: "covers/song_9_cover.png" },
    { songName: "Bones - Imagine Dragons", filePath: "songs/10.mp3", coverPath: "covers/song_10_cover.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})