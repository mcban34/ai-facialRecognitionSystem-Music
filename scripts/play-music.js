const audioElement = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const seekBar = document.getElementById('seekBar');
const currentTimeDisplay = document.getElementById('currentTime');
const musicListHtml = document.querySelector(".musicList")

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

                let isPlaying = false;
                const playButton = document.createElement("button");
                playButton.textContent = "Çal";

                const artTitle = document.createElement("h3")
                artTitle.innerHTML = music.name

                playButton.addEventListener("click", () => {
                    if (!isPlaying) {
                        const allAudioElements = document.querySelectorAll('audio');
                        allAudioElements.forEach(element => {
                            if (element !== audioElement) {
                                element.pause();
                            }
                        });

                        if (currentPlayingButton) {
                            currentPlayingButton.textContent = 'Çal';
                        }

                        audioElement.play();
                        playButton.textContent = 'Duraklat';
                        currentPlayingButton = playButton;
                    } else {
                        audioElement.pause();
                        playButton.textContent = 'Çal';
                    }
                    isPlaying = !isPlaying;
                });

                audioElement.addEventListener('timeupdate', () => {
                    const currentTime = audioElement.currentTime;
                    const duration = audioElement.duration;

                    seekBar.value = currentTime;
                    seekBar.max = duration;

                    currentTimeDisplay.textContent = formatTime(currentTime);
                });

                seekBar.addEventListener('input', () => {
                    audioElement.currentTime = seekBar.value;
                });

                musicListHtml.appendChild(audioElement);
                musicListHtml.appendChild(playButton);
                musicListHtml.appendChild(artTitle)
               
            });
        });
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


