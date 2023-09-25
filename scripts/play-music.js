const audioElement = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const seekBar = document.getElementById('seekBar');
const currentTimeDisplay = document.getElementById('currentTime');

let isPlaying = false;

// Çal/Duraklat işlevini değiştir
playPauseButton.addEventListener('click', () => {
    if (!isPlaying) {
        audioElement.play();
        playPauseButton.textContent = 'Duraklat';
    } else {
        audioElement.pause();
        playPauseButton.textContent = 'Çal';
    }
    isPlaying = !isPlaying;
});

// İlerleme çubuğunu güncelle
audioElement.addEventListener('timeupdate', () => {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;
    
    // İlerleme çubuğunu güncelle
    seekBar.value = currentTime;
    seekBar.max = duration;

    // Geçen süreyi güncelle
    currentTimeDisplay.textContent = formatTime(currentTime);
});

// İlerleme çubuğunu sürükleme
seekBar.addEventListener('input', () => {
    audioElement.currentTime = seekBar.value;
});

// Süre bilgisini dakika:saniye formatına çevirme
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}