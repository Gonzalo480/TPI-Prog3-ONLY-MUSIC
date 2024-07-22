function togglePlayPause(element) {
    const audio = element.querySelector('audio');
    const icon = element.querySelector('.play-icon');
    const isPlaying = !audio.paused;
    

    // Pausar cualquier otra canción que esté sonando
    document.querySelectorAll('.music-item audio').forEach(a => {
        if (a !== audio) {
            a.pause();
            a.currentTime = 0;
            const otherIcon = a.closest('.music-item').querySelector('.play-icon');
            otherIcon.textContent = '▶';
        }
    });

    if (isPlaying) {
        audio.pause();
        icon.textContent = '▶';
    } else {
        audio.play();
        icon.textContent = 'll';
    }
}