import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"

// Resolve __dirname for ESM and load .env from backend root (backend/.env)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, "../../.env")

dotenv.config({ path: envPath })

// Helpful debugging output so you can see where dotenv looked and the current cwd
console.log("cwd:", process.cwd())
console.log("dotenv path:", envPath)
console.log("MONGO_URL:", process.env.MONGO_URL)

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            console.warn("MONGO_URL not set — skipping MongoDB connection (use a real MONGO_URL in backend/.env for DB functionality)");
            return;
        }

        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(` MongoDB connected: ${conn.connection.host} `)
    } catch (error) {
        console.log("MongoDB connection error: ", error)
        process.exit(1)
    }
}

