import express from "express";
import setupPetRouter from "./routes/pet.js";
import authRouter from "./routes/auth.js";
import setupJWTStrategy from "./auth/index.js";
import passport from "passport";
import cors from "cors";


export default function createServer() {
    const app = express();

    app.use(cors());

    app.use(express.json());

    setupJWTStrategy(passport)

    app.use("/auth", authRouter)

    app.use("/pet", setupPetRouter(passport))

    return app;
}