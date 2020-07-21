const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0,
};

const dbConnectionURL = {
  LOCALURL: 'mongodb://mongo:27017/items_db',
};
mongoose.connect(dbConnectionURL.LOCALURL, options);
const db = mongoose.connection;
db.on(
  'error',
  console.error.bind(
    console,
    'Mongodb Connection Error:' + dbConnectionURL.LOCALURL
  )
);
db.once('open', () => {
  console.log('Mongodb Connection Successful');
});
