const mongoose = require('mongoose');
const mongoURI = 'mongodb://abubaker88:zaah,.765@ac-ttnxo3g-shard-00-00.vhog7fj.mongodb.net:27017,ac-ttnxo3g-shard-00-01.vhog7fj.mongodb.net:27017,ac-ttnxo3g-shard-00-02.vhog7fj.mongodb.net:27017/go-food?ssl=true&replicaSet=atlas-8oaxbk-shard-0&authSource=admin&retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
        
        const collection = await mongoose.connection.db.collection("foodData2");
        collection.find({}).toArray(async function(err,data){
            const food = await mongoose.connection.db.collection("foodCategory");
            food.find({}).toArray(function(err,catData){
                global.foodData2 = data;
                global.foodCategory = catData;
                //console.log(global.foodData2);
                //console.log(global.foodCategory);
            })
        });
        
        //global.foodData2 = data;
        //console.log(global.foodData2);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;
