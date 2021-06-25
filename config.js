require('dotenv').config();

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.8ftv4.mongodb.net/dbCRUD?retryWrites=true&w=majority`;

module.exports = {
  port: process.env.PORT || 8080,
  db: process.env.MONGODB || uri,
  urlParser: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
};
