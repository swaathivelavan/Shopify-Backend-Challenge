const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  dbURI: process.env.database_URI_key,
};