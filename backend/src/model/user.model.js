import mongoose from "mongoose";
import "dotenv/config"

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    token: String,
})

const User = mongoose.model("User",userSchema)

export default  User;