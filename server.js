import express from "express"
import { config } from "dotenv"
import morgan from "morgan"
import parser from "body-parser"
import multer from "multer"
import path from "path"
import { productRouter } from "./routers/productsRouter.js"
import { user } from "./routers/userRouter.js"

config()
const PORT = process.env.PORT

const directory =  path.join(process.cwd(), "uploads")

const upload = multer({dest: directory,
    limits: { fileSize: 1024 * 1024 }
})

const server = express()

//multer middleware 

server.use(upload.single("file"), (req, res, next) => {
    if (req.file) {
      next();
    } else {
      const error = new Error('File is required');
      error.status = 501;
      next(error);
    }
  });


server.use(parser.urlencoded({extended: false}))
server.use(express.json()) // Server middleware
server.use(morgan("combined"))

server.use("/", productRouter)////////////////////////////////////////////////////////////////////////////////////////
server.use("/user", user)



server.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`)
})

