const initializeWebcam = {
    start: function () {
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            console.error('mediaDevices API or getUserMedia method is not supported in this browser.');
            showErrorMessage('mediaDevices API or getUserMedia method is not supported in this browser.');
            return;
        }

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                const videoElement = document.getElementById('webcam-stream');
                videoElement.srcObject = stream;
                videoElement.style.display = 'block';
                videoElement.play();
            })
            .catch(error => {
                console.error('Error accessing the webcam:', error);
                showErrorMessage('Erro ao acessar a câmera.');
            });
    }
};

function showErrorMessage(message) {
    alert(message);
}

export default initializeWebcam;
