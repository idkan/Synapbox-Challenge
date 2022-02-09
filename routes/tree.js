import { Router } from "express";
import fs from "fs";

const treeRouter = Router();
const animalsDataPath = "./data/animals.json";

/**
 * @api {get} /tree/animals Get all animals
 */
treeRouter.get('/', (req, res) => {
    fs.readFile(animalsDataPath, (err, data) => {
        if (err) throw err;
        res.send(JSON.parse(data));
    });
});

export default treeRouter;