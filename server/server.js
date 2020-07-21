const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const router = require('./src/routes/items');
require('./src/database');

router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use('/items', router);

app.get('/', (req, res) => {
  res.send('Hi');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
