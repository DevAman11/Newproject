const express = require('express')
const app = express()
const Mysql = require('mysql2')

app.use(express.json())

const dataBase = Mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "pixxelu_data"
})

dataBase.connect((err)=>{
    console.log("Database Connected Successfully ")
})


app.post('/Save' , (req,res) => {
    try {
        const { Firstname,Lastname,Username,Email,Password} = req.body
        const insertData = "Insert into Pixxel(Firstname,Lastname,Username,Email,Password) Values(?,?,?,?,?)"
        dataBase.query(insertData,[Firstname,Lastname,Username,Email,Password] , (err,result)=>{
          res.send("Data Saved Successfully")
        })
    } catch (error) {
        console.log("Database Not Found");
    }
})

app.get('/View',(req,res) => {
    const viewData = "Select * from Pixxel"
    dataBase.query(viewData,(err,result) => {
        res.send(result)
    })
})

app.patch('/Update',(req,res) =>{
    const updateData = " update"
})

app.listen(5000,() => {
    console.log("Server Run On Port 5000");
})