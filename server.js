const express = require('express');
const fs = require('fs');
const Papa = require('papaparse');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/players', (req, res) => {
    fs.readFile('players.csv', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the CSV file');
            return;
        }

        Papa.parse(data, {
            header: true,
            complete: function(results) {
                res.json(results.data);
            }
        })
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})