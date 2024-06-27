let photoBlob;
let photoUrl;

const photoCapture = {
    /**
     * Capture a photo from the user's camera
     */
    capture: function () {
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            console.error('mediaDevices API or getUserMedia method is not supported in this browser.');
            showErrorMessage('mediaDevices API or getUserMedia method is not supported in this browser.');
            return;
        }

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                const videoElement = document.createElement('video');
                videoElement.srcObject = stream;
                videoElement.play();

                const canvasElement = document.createElement('canvas');
                const context = canvasElement.getContext('2d');

                videoElement.addEventListener('loadeddata', () => {
                    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
                    videoElement.pause();
                    stream.getTracks().forEach(track => track.stop());

                    canvasElement.toBlob(blob => {
                        photoBlob = blob;

                        if (photoUrl) {
                            URL.revokeObjectURL(photoUrl);
                        }

                        photoUrl = URL.createObjectURL(photoBlob);

                        // Enable download and upload buttons
                        document.getElementById('download-photo-btn').disabled = false;
                        document.getElementById('upload-photo-btn').disabled = false;

                        // Display the captured photo
                        const imgElement = document.getElementById('captured-photo');
                        imgElement.src = photoUrl;
                        imgElement.style.display = 'block';
                    }, 'image/png');
                });
            })
            .catch(error => {
                console.error('Error accessing the camera:', error);
                showErrorMessage('Erro ao acessar a câmera.');
            });
    },

    /**
     * Download the captured photo
     */
    download: function () {
        if (photoBlob) {
            const link = document.createElement('a');
            link.href = photoUrl;
            link.download = 'photo.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('No photo data available for download.');
            showErrorMessage('Nenhum dado de foto disponível para download.');
        }
    },

    /**
     * Upload the captured photo to the server
     */
    upload: async function () {
        if (photoBlob) {
            const formData = new FormData();
            formData.append('photo', photoBlob, 'photo.png');

            try {
                const response = await fetch('/api/upload-photo', {
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
                showErrorMessage('Erro salvando a foto.');
            }
        } else {
            console.error('No photo data available for upload.');
            showErrorMessage('Nenhum dado de foto disponível para upload.');
        }
    }
};

function showErrorMessage(message) {
    alert(message);
}

export default photoCapture;
