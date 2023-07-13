const express = require('express');
const multer = require('multer');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
})

const upload = multer({ storage: storage });

app.post('/upload', upload.single('audio'), (req, res) => {
  res.sendStatus(200);
});

app.get('/audios', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(files);
    }
  });
});

app.get('/audio/:name', (req, res) => {
  const filePath = path.join('uploads', req.params.name);
  res.sendFile(path.resolve(filePath));
});

app.listen(3000, () => console.log('Server started on port 3000'));
