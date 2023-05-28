const mongoose = require('mongoose');

const dbName = "chat"
const url=  `mongodb+srv://mohdtalha506:7800@cluster0.c6zfpft.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url)
.then((result) => {
    console.log('Successfully Connected');
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;