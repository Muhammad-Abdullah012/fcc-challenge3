const mongoose = require('mongoose');
// const fs = require('fs');
const app = require('./app');

mongoose.connect(process.env.MONGO_URI);
// .catch((err) => {
//   const writeStream = fs.createWriteStream('errors_log.txt');
//   writeStream.write(err.toString());
//   writeStream.close();
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
