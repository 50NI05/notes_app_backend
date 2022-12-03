const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://AMD:9262865472@cluster0.uwe0v8q.mongodb.net/?retryWrites=true&w=majority', {
    
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));