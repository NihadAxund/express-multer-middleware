import express from "express"


export const user = express.Router()


user.get("/login", (req, res)=> {
    res.send("user")
})

user.delete("/signup", (req, res)=> {
    res.send("user")
})

user.get("/messages", (req, res)=> {
    res.send("user")
})

user.delete("/profile", (req, res)=> {
    res.send("user")
})