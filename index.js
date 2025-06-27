import express from "express"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({log: ["query","error"]});
const app = express();
app.use(express.json());