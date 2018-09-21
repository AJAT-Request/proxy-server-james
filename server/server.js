const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/listings', proxy({target: 'http://localhost:3001', changeOrigin: true}));

app.use('/reviews', proxy({target: 'http://localhost:3002', changeOrigin: true}));

app.use('/bookingBox', proxy({target: 'http://localhost:3003', changeOrigin: true}));

app.get('/rooms/:roomId', (req, res) => {
  // currRoom = Number(req.params.roomId) + 1;
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
