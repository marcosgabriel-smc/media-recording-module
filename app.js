const express = require('express');
const path = require('path');

const uploadRouter = require('./routes/uploadRouter');

const app = express();

app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.use('/api', uploadRouter);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
