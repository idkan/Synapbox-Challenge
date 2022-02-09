import fs from "fs";

const animalsDataPath = "./data/animals.json";

// TODO: Get the current id to avoid duplicates and hardcode
const nextID = 8;


/**
 * Helper functions Definition
 */
const readFile = (filePath, callback) => {
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        callback(JSON.parse(data));
    });
}

const writeFile = (filePath, data, callback) => {
    fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
        callback(JSON.parse(data));
    });
}

const traverseTreeNode = (animalTree, nodeId, newAnimalNode) => {
    const searchAnimal = (animalTree, nodeId, newAnimalNode) => {
        for (let currentNode in animalTree) {
            const [id] = Object.keys(animalTree[currentNode]);

            // console.log(`id: ${id} ++ nodeId: ${nodeId}`);
            if (Number(id) === Number(nodeId)) {
                animalTree[currentNode][id].children.push(newAnimalNode);
            }
            // * Recursive call
            searchAnimal(animalTree[currentNode][id].children, nodeId, newAnimalNode);
        }
    }
    // * Search in root node.
    searchAnimal(animalTree['1'].children, nodeId, newAnimalNode);
}


/**
 * @api {get} /tree/animals Get all animals
 */
export const getAnimals = (req, res) => {
    readFile(animalsDataPath, (data) => {
        res.send(data);
    }, true);
}

/**
 * @api {post} /tree/animals Create a new animal
 */
export const createAnimal = (req, res) => {
    const { parent, label } = req.body;

    if (!parent || !label) {
        res.status(400).send({
            error: "Bad Request",
            message: "Missing required parameters"
        });
    }

    // TODO: Get the last id from animals.json and increment it
    const id = Math.floor(Math.random() * 100) + nextID;

    const newAnimal = {};
    newAnimal[id] = {
        label: label,
        children: []
    };

    readFile(animalsDataPath, (data) => {
        traverseTreeNode(data, parent, newAnimal);

        writeFile(animalsDataPath, JSON.stringify(data), () => {
            res.status(201).send({
                message: "Animal created successfully",
                data: newAnimal
            });
        }, true);
    });
}