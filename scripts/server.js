const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    // Use the current date and time as the filename
    const date = new Date();
    const filename = `${date.getMinutes()}_${date.getHours()}_${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}.ogg`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('audio'), (req, res) => {
  res.sendStatus(200);
});

app.get('/audios', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    res.send(files);
  });
});

app.get('/audio/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploads', req.params.filename));
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
