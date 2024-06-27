import audioRecorder from './audioRecorder.js';
import videoRecorder from './videoRecorder.js';
import photoCapture from './photoCapture.js';
import initializeWebcam from './initializeWebcam.js';

document.addEventListener('DOMContentLoaded', () => {
    const startAudioButton = document.getElementById('start-audio-record-btn');
    const stopAudioButton = document.getElementById('stop-audio-record-btn');
    const downloadAudioButton = document.getElementById('download-audio-btn');
    const playAudioButton = document.getElementById('play-audio-btn');
    const uploadAudioButton = document.getElementById('upload-audio-btn');

    const startVideoButton = document.getElementById('start-video-record-btn');
    const stopVideoButton = document.getElementById('stop-video-record-btn');
    const downloadVideoButton = document.getElementById('download-video-btn');
    const playVideoButton = document.getElementById('play-video-btn');
    const uploadVideoButton = document.getElementById('upload-video-btn');

    const capturePhotoButton = document.getElementById('capture-photo-btn');
    const downloadPhotoButton = document.getElementById('download-photo-btn');
    const uploadPhotoButton = document.getElementById('upload-photo-btn');

    const initializeWebcamButton = document.getElementById('initialize-webcam-btn');

    // Audio event listeners
    startAudioButton.addEventListener('click', () => {
        audioRecorder.start();
    });

    stopAudioButton.addEventListener('click', () => {
        audioRecorder.stop();
    });

    downloadAudioButton.addEventListener('click', () => {
        audioRecorder.download();
    });

    playAudioButton.addEventListener('click', () => {
        audioRecorder.play();
    });

    uploadAudioButton.addEventListener('click', () => {
        audioRecorder.upload();
    });

    // Video event listeners
    startVideoButton.addEventListener('click', () => {
        videoRecorder.start();
    });

    stopVideoButton.addEventListener('click', () => {
        videoRecorder.stop();
    });

    downloadVideoButton.addEventListener('click', () => {
        videoRecorder.download();
    });

    playVideoButton.addEventListener('click', () => {
        videoRecorder.play();
    });

    uploadVideoButton.addEventListener('click', () => {
        videoRecorder.upload();
    });

    // Photo event listeners
    capturePhotoButton.addEventListener('click', () => {
        photoCapture.capture();
    });

    downloadPhotoButton.addEventListener('click', () => {
        photoCapture.download();
    });

    uploadPhotoButton.addEventListener('click', () => {
        photoCapture.upload();
    });

    // Webcam initialization event listener
    initializeWebcamButton.addEventListener('click', () => {
        initializeWebcam.start();
    });
});
