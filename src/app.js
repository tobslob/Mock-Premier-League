import http from 'http';
import morgan from 'morgan';
import express from 'express';
import session from 'express-session';
import trimmer from 'trim-request-body';
import bodyparser from 'body-parser';
import connectRedis from 'connect-redis';
import redis from 'redis';
import responseTime from 'response-time';
import cookieParser from 'cookie-parser';
import limiter from './config/express-rate-limit';
import messages from './utils/messages';
import connect from './database/db';
import user from './routes/userRoute';
import team from './routes/teamRoute';
import fixture from './routes/fixtureRoute';

const app = express();

// connect to database
connect();

if (process.env.NODE_ENV !== 'test') {
  const redisUri = `${process.env.REDIS_URL}`;
  const redisStore = connectRedis(session);
  const clientConnect = async () => {
    const client = await redis.createClient(redisUri);
    client.auth(process.env.REDIS_PASSWORD);

    // creating new redis store for sessioning.
    app.use(
      session({
        secret: process.env.SECRET_KEY,
        store: new redisStore({
          host: 'localhost',
          port: 6379,
          client,
          ttl: 1800,
        }),
        saveUninitialized: false,
        resave: false,
      })
    );

    client.on('connect', () => {
    // eslint-disable-next-line no-console
      console.log('Redis client connected');
    });

    client.on('error', (err) => {
    // eslint-disable-next-line no-console
      console.log(err);
    });
  };
  clientConnect();
  app.use(responseTime());
}

// limit IP api request
app.use(limiter);

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieParser());

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
