const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fsButton = player.querySelector('.fullscreen');


function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}


function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(event) {
    const position = video.duration * (event.offsetX / progress.offsetWidth);
    video.currentTime = position
}

function handleFullScreen() {
    if (inFullscreen) {
        document.exitFullscreen();
    } else {
        video.requestFullscreen();
    }
}

function updateInFullscreen(event) {
    inFullscreen = document.fullscreenElement ? true : false;
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach((button) => button.addEventListener('click', skip));
ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) => range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', scrub);

let mouseDown = false;
progress.addEventListener('mousemove', () => mouseDown && scrub(event));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mousedown', () => mouseDown = false);

let inFullscreen = false;
fsButton.addEventListener('click', handleFullScreen);
document.addEventListener('fullscreenchange', updateInFullscreen);