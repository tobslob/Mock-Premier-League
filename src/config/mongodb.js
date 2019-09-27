require('dotenv').config();

const mongooseConnect = `mongodb+srv://${process.env.USER_NAME}:${process.env.SECRET_KEY}@premier-league-gz6sx.mongodb.net/test?retryWrites=true&w=majority`;

export default mongooseConnect;
