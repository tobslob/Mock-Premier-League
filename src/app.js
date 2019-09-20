import http from 'http';
import morgan from 'morgan';
import express from 'express';
import bodyparser from 'body-parser';

const app = express();

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Home page route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: { message: 'Welcome to Mock Premier League' }
  });
});

// handle all error
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      status: 500,
      error: 'Internal server error'
    });
  }
  return next();
});

// Handle non exist route with with proper message
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Wrong request. Route does not exist'
  });
});

const server = http.createServer(app);
const port = process.env.PORT || 5500;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening to server on 127.0.0.1:${port}`);
});

module.exports = app;
