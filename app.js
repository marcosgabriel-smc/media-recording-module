const express = require('express');


const app = express();

app.use(express.static('./scripts'));


app.use('/', (req, res) => {
    res.sendFile('./index.html')
});

app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:3000`);
});