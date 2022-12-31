import express from "express";
import { addFoods, deleteFoods, getFoods, getOneFoods, updateOneFoods } from "../controllers/foods.js";
import { verifyToken } from "./verify.js";

export const foodsRouter = express.Router()

foodsRouter.post('/foods', verifyToken, addFoods)
foodsRouter.get('/foods', getFoods)
foodsRouter.get('/foods/:id', getOneFoods)
foodsRouter.put('/foods/:id', updateOneFoods)
foodsRouter.delete('/foods/:id', deleteFoods)