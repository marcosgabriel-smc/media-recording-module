let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;

const audioRecorder = {
    /**
     * Start recording the audio
     */
    start: function () {
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            console.error('mediaDevices API or getUserMedia method is not supported in this browser.');
            return;
        }

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];

                mediaRecorder.ondataavailable = (event) => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    audioUrl = URL.createObjectURL(audioBlob);
                    document.getElementById('start-record-btn').disabled = false;
                    document.getElementById('download-record-btn').disabled = false;
                    document.getElementById('play-record-btn').disabled = false;
                };

                mediaRecorder.start();
                document.getElementById('start-record-btn').disabled = true;
                document.getElementById('stop-record-btn').disabled = false;
            })
            .catch(error => {
                console.error('Error accessing the microphone:', error);
                showErrorMessage('Erro ao acessar o microfone.');
            });
    },

    /**
     * Stop recording the audio
     */
    stop: function () {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            document.getElementById('stop-record-btn').disabled = true;
        } else {
            console.error('No recording is in progress.');
        }
    },

    /**
     * Download the recorded audio
     */
    download: function () {
        if (audioChunks.length > 0) {
            const link = document.createElement('a');
            link.href = audioUrl;
            link.download = 'recording.wav';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('No audio data available for download.');
            showErrorMessage('Nenhum dado de áudio disponível para download.');
        }
    },

    /**
     * Play the recorded audio
     */
    play: function () {
        if (audioChunks.length > 0) {
            const audio = new Audio(audioUrl);
            audio.play();
        } else {
            console.error('No audio data available for playback.');
            showErrorMessage('Nenhum dado de áudio disponível para reprodução.');
        }
    }
};

document.getElementById('start-record-btn').addEventListener('click', () => {
    document.getElementById('error-message').style.display = 'none';
    audioRecorder.start();
});

document.getElementById('stop-record-btn').addEventListener('click', () => {
    audioRecorder.stop();
});

document.getElementById('download-record-btn').addEventListener('click', () => {
    audioRecorder.download();
});

document.getElementById('play-record-btn').addEventListener('click', () => {
    audioRecorder.play();
});

function showErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
}

export default audioRecorder;
