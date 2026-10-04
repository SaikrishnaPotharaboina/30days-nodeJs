const mongoose = require("mongoose")


const ConnectDatabase = async () => {
    await mongoose.connect("mongodb+srv://saikrishna322004_db_user:82Dcfs4faCPjjrg5@praticenode.hf4yyjy.mongodb.net/praticenode")
}

module.exports = ConnectDatabase;


