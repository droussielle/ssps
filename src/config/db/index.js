const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/hcmut_spss');
    console.log('Connect success');
  } catch (error) {
    console.log('Connect failed');
  }
}
module.exports = { connect };
