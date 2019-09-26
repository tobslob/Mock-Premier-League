require('dotenv').config();

const mongooseConnect = `mongodb+srv://${process.env.USER_NAME}:${process.env.SECRET_KEY}@premier-league-gz6sx.mongodb.net/test?retryWrites=true&w=majority`;
const url = `mongodb://${process.env.USER_NAME}:${process.env.SECRET_KEY}@premier-league-shard-00-00-gz6sx.mongodb.net:27017,premier-league-shard-00-01-gz6sx.mongodb.net:27017,premier-league-shard-00-02-gz6sx.mongodb.net:27017/test?ssl=true&replicaSet=Premier-League-shard-0&authSource=admin&retryWrites=true&w=majority`;

export { mongooseConnect, url };
