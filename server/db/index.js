/* ================================= SETUP ================================= */

require('dotenv').config();

const {
  MONGOLAB_URI,
  TEST_DB_URI,
} = process.env;


/* ================================ EXPORTS ================================ */

module.exports = {

  development: {
    url: MONGOLAB_URI,
  },

  testing: {
    url: TEST_DB_URI,
  },

  production: {
    url: MONGOLAB_URI,
  },

};
