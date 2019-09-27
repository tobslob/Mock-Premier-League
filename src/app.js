import http from 'http';
import morgan from 'morgan';
import express from 'express';
import trimmer from 'trim-request-body';
import bodyparser from 'body-parser';
import redis from 'redis';
import responseTime from 'response-time';
import messages from './utils/messages';
import connect from './database/db';
import user from './routes/userRoute';
import team from './routes/teamRoute';
import fixture from './routes/fixtureRoute';

const app = express();

if (process.env.NODE_ENV !== 'test') {
// create and connect redis client to local instance.
  const client = redis.createClient();

  app.use(responseTime());

  // Print redis errors to the console
  client.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.log(`Error ${err}`);
  });
}

// connect to database
connect();

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Trim the parsed request body
app.use(trimmer);

// api endpoints
app.use('/api/v1/user', user);
app.use('/api/v1', team);
app.use('/api/v1', fixture);

// Home page route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { message: messages.welcome }
  });
});

// handle all error
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      status: 'error',
      data: { message: messages.serverError }
    });
  }
  return next();
});

// Handle non exist route with with proper message
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    data: { message: messages.notFound }
  });
});

const server = http.createServer(app);
const port = process.env.PORT || 5000;
const listen = messages.listenToServer;

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  server.listen(port, () => console.log(`${listen}:${port}`));
}

module.exports = app;
