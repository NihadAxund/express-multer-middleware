import express from "express"
import { checkAuthHeader, testMiddle } from "../middlewares/authmiddleware.js"
import fs from "fs/promises"
import path from "path"

export const productRouter = express.Router()
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { renameSync } from "fs"

const currentDirectory = dirname(fileURLToPath(import.meta.url));

function * generateUniqueID(){
    let id = 0
    while(true){
        yield id
        id++
    }
}
const getId = generateUniqueID()

let products = [] // [{name": "user", id: 1}]
productRouter.get("/", checkAuthHeader,testMiddle,(request, response) => {
    response.status(200).json(products)
})

// {
//     fieldname: 'file',
//     originalname: 'tapsiriq.txt',
//     encoding: '7bit',
//     mimetype: 'text/plain',
//     destination: 'C:\\Users\\fatullayev_m\\Desktop\\node-st\\ders_streams\\express-middleware\\uploads',
//     filename: 'c1574127fc805d64eebe7a52052721fe',
//     path: 'C:\\Users\\fatullayev_m\\Desktop\\node-st\\ders_streams\\express-middleware\\uploads\\c1574127fc805d64eebe7a52052721fe',
//     size: 57
//   }





productRouter.post("/upload", async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("File error.");
    }
    console.log(req.body);
    console.log(req.file);
    const { originalname } = req.file;
    const newStorageDirectory = path.join(currentDirectory, '..', 'storages');
    const newFilePath = path.join(newStorageDirectory, originalname);
    renameSync(req.file.path, newFilePath);
    return res.status(200).send("ok");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});




    //  fs.rename(originalPath, newFilePath, (err) => {
    //     if (err) {
    //         console.error('Error moving file:', err);
    //         res.status(500).send('Internal Server Error');
    //     } else {
    //         console.log('File moved successfully.');
    //         res.status(200).send('OK');
    //     }
    // });



    // fs.rename(originalPath, newFilePath, (err) => {
    //     if (err) {
    //         console.error('Error moving file:', err);
    //         res.status(500).send('Internal Server Error');
    //     } else {
    //         console.log('File moved successfully.');
    //         res.status(200).send('OK');
    //     }
    // });

productRouter.post("/", (req, res) => {
    console.log(req.body)
    const product = {...req.body, id: getId.next().value}
    products.push(product)
    res.status(200).send('OK')
})

productRouter.delete("/:id", (req, res) => {
    let param = req.params.id
    let item = products.findIndex(el => el.id == param)
    if (item == -1){
        res.status(400).json({message: "Not Found"})
    }else {
        products.splice(item, 1)
        res.status(200).json(products)
    }
})

productRouter.put("/:id", (req, res) => {
    let param = req.params.id
    let name = req.bod
    let item = products.findIndex(el => el.id == param)
    if (item == -1){
        res.status(400).json({message: "Not Found"})
    }else {
        products.splice(item, 1)
        res.status(200).json(products)
    }
})