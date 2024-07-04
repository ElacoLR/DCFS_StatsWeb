const express = require('express');
const fs = require('fs');
const Papa = require('papaparse');
const path = require('path');

const app = express();
const PORT = 3000;

// Merge csv files:
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvDir = 'CSV';
const csvFiles = fs.readdirSync(csvDir)
	.filter(file => path.extname(file).toLowerCase() === '.csv')
	.map(file => path.join(csvDir, file));
const outputCSV = 'mergedCSV.csv';

const results = [];

const readCsvFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(path.resolve(filePath)) // 경로를 절대 경로로 변환
      .pipe(csv())
      .on('data', (data) => rows.push(data))
      .on('end', () => {
        resolve(rows);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

const writeCsvFile = (filePath, data) => {
    const csvWriter = createCsvWriter({
        path: filePath,
        header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
    });

    return csvWriter.writeRecords(data);
};

const mergeCsvFiles = async () => {
    try {
        for (const file of csvFiles) {
            const rows = await readCsvFile(path.resolve(file));
            results.push(...rows);
        }

        if (results.length > 0) {
            await writeCsvFile(outputCSV, results);
            console.log('Merged successfully.');
        } else {
            console.log('No data found');
        }
    } catch (error) {
        console.error('Error merging: ', error);
    }
};

mergeCsvFiles();

app.use(express.static('public'));

app.get('/players', (req, res) => {
    fs.readFile('mergedCSV.csv', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the CSV file');
            return;
        }

        Papa.parse(data, {
            header: true,
            complete: function(results) {
                const sortedData = results.data.sort((a, b) => b.asset - a.asset);
                res.json(sortedData);
            }
        })
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})