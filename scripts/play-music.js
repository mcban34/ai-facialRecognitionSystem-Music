const audioElement = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const seekBar = document.getElementById('seekBar');
const currentTimeDisplay = document.getElementById('currentTime');
const musicListHtml = document.querySelector(".musicList")

const statusInformation = {
    angry: "Sinirli",
    disgusted: "İğrenmiş",
    fearful: "Korkunç",
    happy: "Mutlu",
    neutral: "Doğal",
    sad: "Üzgün",
    surprised: "Şaşkın"
}

let isPlaying = false;

document.addEventListener("DOMContentLoaded", () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const situation = urlParams.get('situation');
    console.log(situation);
    fetch("data/data.json")
        .then(res => res.json())
        .then(value => {
            const musicList = value.filter(element => element.situation == situation);

            let currentPlayingButton = null;

            musicList.forEach(music => {
                const audioElement = document.createElement("audio");
                audioElement.src = music.path;

                //!parçanın toplam süresini hesapla
                let durationDisplay = document.createElement("p");
                durationDisplay.className = "durationDisplay"
                audioElement.addEventListener('loadedmetadata', () => {
                    const totalDuration = audioElement.duration;
                    const totalDurationMinutes = Math.floor(totalDuration / 60);
                    const totalDurationSeconds = Math.floor(totalDuration % 60);
                    durationDisplay.innerHTML = `${totalDurationMinutes}:${totalDurationSeconds < 10 ? '0' : ''}${totalDurationSeconds}`;
                });

                let isPlaying = false;

                const musicListParentDiv = document.createElement("div")
                musicListParentDiv.className = "musicListParentDiv"

                const playButton = document.createElement("button");
                playButton.innerHTML = `<i class="bi bi-play-fill"></i>`;
                playButton.className = "playButton"

                const artTitle = document.createElement("h6")
                artTitle.innerHTML = music.name
                artTitle.className = "artTitle"

                const trackName = document.createElement("p")
                trackName.innerHTML = music.trackName
                trackName.className = "trackName"

                const trackImage = document.createElement("img")
                trackImage.src = music.img
                trackImage.className = "trackImage"


                playButton.addEventListener("click", () => {
                    if (!isPlaying) {
                        const allAudioElements = document.querySelectorAll('audio');
                        allAudioElements.forEach(element => {
                            if (element !== audioElement) {
                                element.pause();
                                element.currentTime = 0;
                            }
                        });

                        if (currentPlayingButton) {
                            currentPlayingButton.innerHTML = `<i class="bi bi-play-fill"></i>`;
                        }

                        audioElement.play();
                        playButton.innerHTML = `<i class="bi bi-stop-fill"></i>`;
                        currentPlayingButton = playButton;

                        let currentPlayingTitle = music.name;
                        let currentPlayingTrack = music.trackName
                        let currentPlayingImage = music.img
                        document.querySelector(".activeMusicTitle").innerHTML = currentPlayingTitle
                        document.querySelector(".activeMusicTrack").innerHTML = currentPlayingTrack
                        document.querySelector(".activeMusicImage").src = currentPlayingImage
                    } else {
                        audioElement.pause();
                        playButton.innerHTML = `<i class="bi bi-play-fill"></i>`;
                    }
                    isPlaying = !isPlaying;
                });

                audioElement.addEventListener('timeupdate', () => {
                    const currentTime = audioElement.currentTime;
                    const duration = audioElement.duration;

                    seekBar.value = currentTime;
                    seekBar.max = duration;

                    currentTimeDisplay.innerHTML = formatTime(currentTime);
                });

                seekBar.addEventListener('input', () => {
                    audioElement.currentTime = seekBar.value;
                });

                musicListParentDiv.append(audioElement, playButton, trackImage, artTitle, trackName, durationDisplay)
                musicListHtml.appendChild(musicListParentDiv)
            });
        });
    document.querySelector(".mucisTitleContent").innerHTML = `${statusInformation[situation]}`
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


