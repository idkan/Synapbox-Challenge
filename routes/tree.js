import { Router } from "express";

import { getAnimals, createAnimal } from "../controllers/tree.js";

const treeRouter = Router();

/**
 * Routes Definitions
 */
treeRouter.get('/', getAnimals);
treeRouter.post('/', createAnimal);

export default treeRouter;