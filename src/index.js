import express from "express";
import configure from "./config/index.js";
const app = express();
configure(app);
