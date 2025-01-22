const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const Mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const joi = require('joi')
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


// app.post('/Login', async (req,res) => {
//     const {Email,Password} = req.body
//     const token = jwt.sign(Email,Password)
//     res.status().json({token})
// })

app.post('/Save', async (req,res) =>{
    const {Firstname,Lastname,Username,Email,Password} = req.body
    const joiData = await joi.object({
        Firstname:joi.string().required(),
        Lastname:joi.string().required(),
        Username:joi.string().required(),
        Email:joi.string().email().required(),
        Password:joi.string().min(6).max(20).required()
    })

   try {
    const {error,value} = joiData.validate({Firstname,Lastname,Username,Email,Password,Password})
    if(error){
        res.status(400).json({msg:error.details[0].message})
    }
    
    const token = jwt.sign(Email,Password)
    const insertData = "Insert into Pixxel(Token_id,Firstname,Lastname,Username,Email,Password) Values(?,?,?,?,?,?)"
    dataBase.query(insertData,[token,Firstname,Lastname,Username,Email,Password] , (err,result)=>{
      res.json({err,result,msg:"Data Saved Successfully"})
    })
   } catch (error) {
    console.log("Database Not Found");
   }
})

app.post('/addCategory',(req,res) => {
    try {
        const {categoryName} = req.body
        const token = jwt.sign(categoryName,"Aman@key")
        const insertCategory = " Insert into Category(Token_id,Name) Values(?,?)"

        dataBase.query(insertCategory,[token,categoryName],(err,result) => {
            res.send("Category Addded Successfully")
        })
    } catch (error) {
        console.log(error,"Error In Category Adding");
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