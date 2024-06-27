# Media Recording Module

This project is a simple web-based media recording module that allows users to record audio, video, and take photos, with functionality to play them back, download, and upload them to a server. The project is built using HTML, JavaScript, and Node.js with Express for the server-side logic.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/yourusername/media-recording-module.git
    cd media-recording-module
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    node app.js
    ```

The server will run on `http://localhost:3000`.

## Usage

Open your browser and navigate to `http://localhost:3000`. You will see a simple interface with buttons to start recording audio/video, stop recording, play the recording, download the recording, and upload the recording, as well as take photos.

<details>
  <summary>Audio Recording</summary>

### Buttons

- **Start Recording**: Starts recording audio from the microphone.
- **Stop Recording**: Stops the current audio recording.
- **Play Recording**: Plays the recorded audio.
- **Download Recording**: Downloads the recorded audio as a `.wav` file.
- **Upload Recording**: Uploads the recorded audio to the server.

</details>

<details>
  <summary>Video Recording</summary>

### Buttons

- **Start Recording**: Starts recording video from the camera.
- **Stop Recording**: Stops the current video recording.
- **Play Recording**: Plays the recorded video.
- **Download Recording**: Downloads the recorded video as a `.mp4` file.
- **Upload Recording**: Uploads the recorded video to the server.

</details>

<details>
  <summary>Photo Capture</summary>

### Buttons

- **Capture Photo**: Captures a photo from the camera.
- **Download Photo**: Downloads the captured photo as a `.png` file.
- **Upload Photo**: Uploads the captured photo to the server.

</details>

## Project Structure

````
.
├── README.md
├── app.js
├── index.html
├── package-lock.json
├── package.json
├── routes
│   └── uploadRouter.js
├── scripts
│   ├── audioRecorder.js
│   └── buttons.js
└── uploads
````

- **app.js**: The main server file that sets up the Express server and routes.
- **index.html**: The frontend HTML file that contains the UI.
- **routes/uploadRouter.js**: The router handling file uploads.
- **scripts/audioRecorder.js**: JavaScript file containing the audio recording logic.
- **scripts/videoRecorder.js**: JavaScript file containing the video recording logic.
- **scripts/photoCapture.js**: JavaScript file containing the photo capture logic.
- **scripts/buttons.js**: JavaScript file containing the button event handlers.
- **uploads**: Directory where uploaded files are stored.

## API Endpoints

### POST `/api/upload-audio`

Uploads an audio file to the server.

#### Request

- `Content-Type`: `multipart/form-data`
- Body: Form data containing the audio file under the field `audio`.

#### Response

- `200 OK`: File uploaded successfully.
  ```json
  {
    "message": "File uploaded successfully",
    "filePath": "uploads/audio-2023-06-28_12-34-56.wav"
  }

- 400 Bad Request: No file uploaded.
  ```json
    {
    "error": "No file uploaded."
    }

### POST `/api/upload-photo`

Uploads an photo file to the server.

#### Request

- `Content-Type`: `multipart/form-data`
- Body: Form data containing the audio file under the field `photo`.

#### Response

- `200 OK`: File uploaded successfully.
  ```json
  {
    "message": "File uploaded successfully",
    "filePath": "uploads/photo-2023-06-28_12-34-56.png"
  }

- 400 Bad Request: No file uploaded.
  ```json
    {
    "error": "No file uploaded."
    }

### POST `/api/upload-video`

Uploads an video file to the server.

#### Request

- `Content-Type`: `multipart/form-data`
- Body: Form data containing the audio file under the field `video`.

#### Response

- `200 OK`: File uploaded successfully.
  ```json
  {
    "message": "File uploaded successfully",
    "filePath": "uploads/video-2023-06-28_12-34-56.mp4"
  }

- 400 Bad Request: No file uploaded.
  ```json
    {
    "error": "No file uploaded."
    }

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.