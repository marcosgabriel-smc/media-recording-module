const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up multer for file upload handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const now = new Date();
        const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
        cb(null, `audio-${timestamp}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Handle audio file upload
router.post('/upload-audio', upload.single('audio'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // File information is available in req.file
    console.log('File received:', req.file);

    res.json({ message: 'File uploaded successfully'});
});

module.exports = router;
