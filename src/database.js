const mongoose = require('mongoose');

mongoose.connect('URI_MongoDB', {
    
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));