let mediaRecorder;
let videoChunks = [];
let videoBlob;
let videoUrl;

const videoRecorder = {
    /**
     * Start recording video
     */
    start: function () {
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            console.error('mediaDevices API or getUserMedia method is not supported in this browser.');
            showErrorMessage('mediaDevices API or getUserMedia method is not supported in this browser.');
            return;
        }

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        // If only video is necessary, disable audio true. 
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                videoChunks = [];

                mediaRecorder.ondataavailable = (event) => {
                    videoChunks.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    videoBlob = new Blob(videoChunks, { type: 'video/mp4' });

                    // Revoke any previously created URL to avoid memory leaks
                    if (videoUrl) {
                        URL.revokeObjectURL(videoUrl);
                    }

                    videoUrl = URL.createObjectURL(videoBlob);

                    // Re-enable start button and enable download, play, and upload buttons
                    document.getElementById('start-video-record-btn').disabled = false;
                    document.getElementById('download-video-btn').disabled = false;
                    document.getElementById('play-video-btn').disabled = false;
                    document.getElementById('upload-video-btn').disabled = false;
                };

                mediaRecorder.start();
                document.getElementById('start-video-record-btn').disabled = true;
                document.getElementById('stop-video-record-btn').disabled = false;
            })
            .catch(error => {
                console.error('Error accessing the camera:', error);
                showErrorMessage('Erro ao acessar a câmera.');
            });
    },

    /**
     * Stop recording video
     */
    stop: function () {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            document.getElementById('stop-video-record-btn').disabled = true;
        } else {
            console.error('No recording is in progress.');
            showErrorMessage('Nenhuma gravação está em andamento.');
        }
    },

    /**
     * Download the recorded video
     */
    download: function () {
        if (videoChunks.length > 0) {
            const link = document.createElement('a');
            link.href = videoUrl;
            link.download = 'recording.mp4';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('No video data available for download.');
            showErrorMessage('Nenhum dado de vídeo disponível para download.');
        }
    },

    /**
     * Play the recorded video
     */
    play: function () {
        if (videoChunks.length > 0) {
            const video = document.createElement('video');
            video.src = videoUrl;
            video.controls = true;
            document.body.appendChild(video);
            video.play();
        } else {
            console.error('No video data available for playback.');
            showErrorMessage('Nenhum dado de vídeo disponível para reprodução.');
        }
    },

    /**
     * Upload the recorded video to the server
     */
    upload: async function () {
        if (videoChunks.length > 0) {
            const formData = new FormData();
            formData.append('video', videoBlob, 'recording.mp4');

            try {
                const response = await fetch('/api/upload-video', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Upload successful:', result);
                    showErrorMessage('Upload successful');
                } else {
                    console.error('Error during fetch /upload');
                    showErrorMessage('Erro durante o envio. Tente novamente.');
                }

            } catch (error) {
                console.error('Error uploading file:', error);
                showErrorMessage('Erro salvando o arquivo de vídeo.');
            }
        } else {
            console.error('No video data available for upload.');
            showErrorMessage('Nenhum dado de vídeo disponível para upload.');
        }
    }
};

function showErrorMessage(message) {
    alert(message);
}

export default videoRecorder;
