import express from 'express';
import "dotenv/config";

const app = express();

app.use(express.json());
const PORT = process.env.PORT ;
// console.log(PORT)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

