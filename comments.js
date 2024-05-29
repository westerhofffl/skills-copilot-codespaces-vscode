// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Read comments
app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', (error, data) => {
    if (error) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send(JSON.parse(data));
  });
});

// Post comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  fs.readFile('./comments.json', (error, data) => {
    if (error) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const comments = JSON.parse(data);
    comments.push(newComment);
    fs.writeFile('./comments.json', JSON.stringify(comments), (error) => {
      if (error) {
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send('Comment added');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});