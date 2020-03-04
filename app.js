const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, './client/dist')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('*', (req, res) => {
  res.send('<h1>page not found</h1>');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
