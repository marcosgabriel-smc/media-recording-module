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

                    // Revoke any previously created URL to avoid memory leaks
                    if (audioUrl) {
                        URL.revokeObjectURL(audioUrl);
                    }

                    audioUrl = URL.createObjectURL(audioBlob);

                    // Re-enable start button and enable download and play buttons
                    document.getElementById('start-record-btn').disabled = false;
                    document.getElementById('download-record-btn').disabled = false;
                    document.getElementById('play-record-btn').disabled = false;
                    document.getElementById('upload-record-btn').disabled = false;
                };

                mediaRecorder.start();
                document.getElementById('start-record-btn').disabled = true;
                document.getElementById('stop-record-btn').disabled = false;
            })
            .catch(error => {
                console.error('Error accessing the microphone:', error);
                alertMessage('Erro ao acessar o microfone.');
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
            alertMessage('No recording is in progress.')
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
            alertMessage('Nenhum dado de áudio disponível para download.');
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
            alertMessage('Nenhum dado de áudio disponível para reprodução.');
        }
    },

    /**
     * Upload the recorded audio to the server
     */
    upload: async function () {
        if (audioChunks.length > 0) {
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.wav');

            try {
                const response = await fetch('/api/upload-audio', {
                    method: 'POST',
                    body: formData,
                });
                
                if (response.ok) {
                    const result = await response.json();
                    console.log('Upload successful:', result);
                    alertMessage('Upload successful');
                } else {
                    console.error('Error during fetch /upload');
                    alertMessage('Tente novamente.');
                }
                
            } catch (error) {
                console.error('Error uploading file:', error);
                alertMessage('Erro salvando o arquivo de áudio.');
            }
        } else {
            console.error('No audio data available for upload.');
            alertMessage('Nenhum dado de áudio disponível para upload.');
        }
    }
};

function alertMessage(message) {
    alert(message);
}

export default audioRecorder;
