import express from "express";
import { flashcardRouter } from "./routers/flashcardRouter";
import cors from 'cors';

export const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
	res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Virtual Medical Site Backend</title>
    </head>
    <body>
        <h1>Welcome to the Virtual Medical Site backend</h1>
        <p>Version: <strong>1.1</strong></p>
    </body>
    </html>
  `);
});

app.use("/api/flashcards", flashcardRouter);
