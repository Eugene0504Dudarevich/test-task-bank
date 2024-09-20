const express = require('express');
const cors = require('cors');
const fs = require('fs');

const PORT = 9000;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('API works correctly');
});
app.get('/api/transactions/', async (request, response) => {
    fs.readFile('db.json', (error, data) => {
        if (error) {
            console.error(error);
            throw error;
        }
        const transactions = JSON.parse(data);
        response.send(transactions).status(200);
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));