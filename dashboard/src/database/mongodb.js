const mongoose = require('mongoose');
module.exports = mongoose.connect(process.env.mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
