const mongoose = require('mongoose');
const config = require('config');
const dbURI = config.get('mongoURI');

const dbConnect = async () => {
    try{
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log('Database Connected...');
    }catch (err) {
        console.log(`DB Connection failed: ${err.message}`);
       //Exit Process with failure
       process.exit(1);
    }
}


module.exports = dbConnect;