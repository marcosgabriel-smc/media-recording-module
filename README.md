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

## How Does It Work?

The media capture functionality operates within the browser environment, utilizing the `navigator` object, specifically the `mediaDevices` API. This API allows access to input devices like the microphone and camera.

### Media Capture Process

1. **Checking Device Availability**:
   Before capturing media, we first verify the availability of the microphone or camera. This ensures the device permissions are granted and the devices are accessible.

2. **Capturing Audio/Video**:
   Once access to the media devices is confirmed, we use the `getUserMedia` method to capture audio and video streams. The logic for capturing **audio and video** involves:

   - **Streaming**: We capture the media stream and pass it to a `MediaRecorder` instance.
   - **Chunk Recording**: As the recording progresses, data is collected in chunks. These chunks are pushed into an array using the `ondataavailable` event of `MediaRecorder`.
   - **Blob Creation**: After recording, we compile the chunks into a `Blob`.

   **What is a Blob?**
   A `Blob` (Binary Large Object) is an object representing immutable raw data. In our context, it serves as a container for the recorded audio or video data, storing it as binary data.

3. **Creating a URL Object**:
   From the `Blob`, we generate a URL object using `URL.createObjectURL()`.

   **What is a URL Object?**
   A URL object is a temporary URL representing the `Blob` data. It allows us to reference the recorded media in the browser, making it accessible for playback or download without uploading it to a server.

4. **Playing, Downloading, or Uploading**:
   The URL object enables us to:
   - **Play**: Directly play the media in the browser.
   - **Download**: Provide a link for users to download the media.
   - **Upload**: Send the media to a server.

### Capturing Photos

For **photos**, the process differs slightly:
- We do not record chunks of data. Instead, we capture a single frame from the video stream.
- This is done using a `<canvas>` element, where the frame is drawn and then converted into a `Blob`.
- This approach allows us to quickly capture an image without continuous data recording.

### Uploading Media

For the upload process, we use the `fetch` API to send a POST request to our upload endpoint. The media data (photo, audio, or video) is included in the request body as a `FormData` object, which allows us to easily handle binary data on the server side.

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
├── public
│   ├── scripts
│   │   ├── audioRecorder.js
│   │   ├── buttons.js
│   │   ├── initializeWebcam.js
│   │   ├── photoCapture.js
│   │   └── videoRecorder.js
│   └── stylesheet
│       └── main.css
├── routes
│   └── uploadRouter.js
└── uploads

````

- **README.md**: Documentation file containing details about the project.
- **app.js**: The main server file that sets up the Express server and routes.
- **index.html**: The frontend HTML file that contains the user interface.
- **package-lock.json**: Automatically generated file that describes the exact dependency tree.
- **package.json**: Lists project dependencies and metadata.
- **public/scripts**:
  - **audioRecorder.js**: JavaScript file containing the logic for audio recording.
  - **buttons.js**: JavaScript file containing button event handlers for media actions.
  - **initializeWebcam.js**: JavaScript file for initializing the webcam stream.
  - **photoCapture.js**: JavaScript file containing the logic for capturing photos.
  - **videoRecorder.js**: JavaScript file containing the logic for video recording.
- **public/stylesheet/main.css**: Stylesheet for styling the frontend UI.
- **routes/uploadRouter.js**: Router for handling file uploads (audio, video, photo).
- **uploads**: Directory where uploaded media files are stored.


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