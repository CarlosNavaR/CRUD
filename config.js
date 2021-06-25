const user = '';
const password = '';
const uri = '';

module.exports = {
  port: process.env.PORT || 8080,
  db: process.env.MONGODB || 'mongodb://localhost:27017/test',
  urlParser: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
};
