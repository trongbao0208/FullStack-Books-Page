import express from "express"
import mysql from "mysql"
import * as dotenv from 'dotenv'
import cors from "cors";

dotenv.config()

const app = express()

//Create connection
const db = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:"test"
})

// If there is an auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your password'

app.get("/", (req, res) =>{
    res.json("Hello, this is the backend");
})

app.use(express.json());
app.use(cors());

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUE (?)"
    const values = [req.body.title, req.body.desc, req.body.cover, req.body.price]

    db.query(q,[values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been created successfully")
    })
})


app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    
    db.query(q, [bookId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully")
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc`=?, `cover` =?, `price` =? WHERE id = ?";

    const values =[req.body.title, req.body.desc, req.body.cover, req.body.price]
    
    db.query(q, [...values, bookId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated successfully.")
    })
})

app.listen(8800, () => {
    console.log("Connected to backend!1");

})