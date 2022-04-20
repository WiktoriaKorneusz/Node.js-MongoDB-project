// Creates a new database connection.
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let database;

const connect = async () => {
    const client = await MongoClient.connect("mongodb://0.0.0.0:27017");
    database = client.db("readit");
};

const getDb = () => {
    if (!database) {
        throw { message: "Database connection not established" };
    }
    return database;
};

// Exports module.
module.exports = {
    connectDb: connect,
    getDb: getDb,
};
