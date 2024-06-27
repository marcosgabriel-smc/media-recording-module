import audioRecorder from './audioRecorder.js';

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-record-btn');
    const stopButton = document.getElementById('stop-record-btn');
    const downloadButton = document.getElementById('download-record-btn');
    const playButton = document.getElementById('play-record-btn');
    const uploadButton = document.getElementById('upload-record-btn');    

    startButton.addEventListener('click', () => {        
        audioRecorder.start();
    });

    stopButton.addEventListener('click', () => {
        audioRecorder.stop();
    });

    downloadButton.addEventListener('click', () => {
        audioRecorder.download();
    });

    playButton.addEventListener('click', () => {
        audioRecorder.play();
    });

    uploadButton.addEventListener('click', () => {
        audioRecorder.upload();
    });
});
