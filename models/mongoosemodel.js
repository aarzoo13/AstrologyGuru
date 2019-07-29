const mongoose = require("mongoose");

/*
 * mongoose schema for mongodb collections
 */

// user_queries collection
const userqueriesSchemaDB = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    message: { type: String, default: "" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: { type: Number, default: 1 }
});
const UserQueriesDB = mongoose.model("user_queries", userqueriesSchemaDB);

// zodiac_signs collection
const zodiacsignsScemaDB = new mongoose.Schema({
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    start_date: { type: String, default: "" },
    start_date: { type: String, default: "" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: { type: Number, default: 1 }
});
const ZodiacSignsDB = mongoose.model("zodiac_signs", zodiacsignsScemaDB);

// numerologies collection
const numerologiesSchemaDB = new mongoose.Schema({
    life_number: { type: String, default: "" },
    traits: { type: String, default: "" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    status: { type: Number, default: 1 }
});
const NumerologiesDB = mongoose.model("numerologies", numerologiesSchemaDB);


/*
 * .mongoose schema for mongodb collections
 */

module.exports = {
    UserQueriesDB: UserQueriesDB,
    ZodiacSignsDB: ZodiacSignsDB,
    NumerologiesDB: NumerologiesDB
};