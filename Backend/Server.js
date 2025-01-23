const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const Mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const cors = require('cors');



app.use(cors());t
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


app.post('/Save', async (req, res) => {
    try {
        const { Firstname, Lastname, Username, Email, Password } = req.body;

        const hashedPassword = await bcrypt.hash(Password, 10); 

        const token = jwt.sign({ Email }, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });

 
        const insertData = "INSERT INTO Pixxel(Token_id, Firstname, Lastname, Username, Email, Password) VALUES(?,?,?,?,?,?)"
        dataBase.query(insertData, [token, Firstname, Lastname, Username, Email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error saving data:", err);
                return res.status(500).json({ msg: "Error saving data", error: err });
            }
            res.status(200).json({ msg: "Data Saved Successfully", result });
        });
    } catch (error) {
        console.error("Error in saving data:", error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
});


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
        res.status(500).send("Error adding category");
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
        const {id} = req.params()
        const {Firstname,Lastname,Username,Email} = req.body
        const updateData = "UPDATE Pixxel SET Firstname = ?, Lastname = ?, Username = ?, Email = ? WHERE Id = ?"
        dataBase.query(updateData,[Firstname,Lastname,Username,Email,id],(err,result) => {
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

app.listen(9000,() => {
    console.log("Server Run On Port 9000");
})