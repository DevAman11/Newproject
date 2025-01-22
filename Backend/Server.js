const express = require('express')
const app = express()
const Mysql = require('mysql2')
const jwt = require('jsonwebtoken')
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
        const {Firstname,Lastname,Username,Email,Password} = req.body
        const token = jwt.sign(Email,Password)
        const insertData = "Insert into Pixxel(Token_id,Firstname,Lastname,Username,Email,Password) Values(?,?,?,?,?,?)"
        dataBase.query(insertData,[token,Firstname,Lastname,Username,Email,Password] , (err,result)=>{
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

app.patch('/Update/:id',(req,res) =>{
    try {
        const {id} = req.params.id
        const {Firstname,Lastname,Username,Email} = req.body
        const updateData = " UPDATE Pixxel SET Firstname = ?,Lastname = ?, Username = ?, Email = ?";
        dataBase.query(updateData,[Firstname,Lastname,Username,Email],(err,result) => {
            res.send("Data Updated Successfully")
        })
    } catch (error) {
        console.log("Error in Update Data");
    }
})

app.delete('/Delete/:id',(req,res) => {
    try {
        const {id} = req.params.id
        const deleteUser = "DELETE from Pixxel Where Id = ? ";

        dataBase.query(deleteUser,[id],(err,result) =>{
            res.send("Delete User Successfully")
        })
    } catch (error) {
        console.log(error,"Id Doesn't Match");
        
    }
})

app.listen(5000,() => {
    console.log("Server Run On Port 5000");
})