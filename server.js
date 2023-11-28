/* eslint-disable no-unused-vars */
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import path from "path";
import express from "express";

const app = express();
const port = 3000;

app.use(cors());

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.send(`Serving files on localhost:${port}`);
});

app.listen(port, () => {
  console.log(`Serving files on localhost:${port}`);
});
