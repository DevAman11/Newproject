const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const Mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Upload/"); 
    },
    filename: (req, file, cb) => {
      // Save file with original name
      cb(null,file.originalname);
    }
  });
  
  // Initialize multer with the storage configuration
  const upload = multer({ storage: storage });

  app.use('/Upload', express.static(path.join(__dirname, 'Upload')));


app.use(cors());
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

        if (!Firstname || !Lastname || !Username || !Email || !Password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const token = jwt.sign({ Email }, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });

        const insertData = "INSERT INTO Pixxel(Token_id, Firstname, Lastname, Username, Email, Password) VALUES(?,?,?,?,?,?)";
        dataBase.query(insertData, [token, Firstname, Lastname, Username, Email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error saving data:", err);
                return res.status(500).json({ msg: "Error saving data", error: err.message });
            }
            res.status(200).json({ msg: "Data Saved Successfully", result });
        });
    } catch (error) {
        console.error("Error in saving data:", error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
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


app.post('/addPostData', upload.single('Images') ,(req,res) => {
    try {
        const  {Category,Title,Content,Images} = req.body
        const token = jwt.sign({Category},"Aman@key")
        const postData = 'Insert Into posts(Token_id,Category,Title,Content,Image) Values(?,?,?,?,?)'
        dataBase.query(postData,[token,Category,Title,Content,req.file.originalname],(err,result) => {
            res.send({"message":"Post Data Added Succesfully"})
        } )

    } catch (error) {
        console.log("error in Creating Post");
        res.status(500).send("Error In Post Creating")
    }
    if (req.file) {
        req.body.filePath = req.file.path
        res.send({"msg":'file uploaded Successfully'});
      }
      else{
        res.send(req.file)
      }
    
    //   File uploaded successfully
      res.send(`File uploaded successfully! File saved`);
})

// app.get('/viewPostData ' ,(req,res) => {
//     const viewPostData = "Select * from Posts"
//     dataBase.query(viewPostData,(err,result) => {
//         res.send(result)
//     })
// })


app.get('/viewPostData', (req, res) => {
    const viewPostData = "SELECT * FROM Posts";  // SQL query to fetch all posts
    dataBase.query(viewPostData, (err, result) => {
        if (err) {
            console.error('Error fetching posts:', err);
            return res.status(500).json({ msg: 'Error fetching posts', error: err.message });
        }
        res.status(200).json(result);  // Send the result as a JSON response
    });
});

app.get('/viewCategory' , (req,res) => {
    const catData = "Select * from Category"
    dataBase.query(catData,(err,result) => {
        res.send(result)
    })
})
app.get('/View',(req,res) => {
    const viewData = "Select * from Pixxel"
    dataBase.query(viewData,(err,result) => {
        res.send(result)
    })
})

app.patch('/Update/:id',(req,res) =>{
    try {
        const {id} = req.params
        const {Firstname,Lastname,Username,Email} = req.body
        const updateData = "UPDATE Pixxel SET Firstname = ?, Lastname = ?, Username = ?, Email = ? WHERE ID = ?"
        dataBase.query(updateData,[Firstname,Lastname,Username,Email,id],(err,result) => {
            res.send("Data Updated Successfully")
        })
    } catch (error) {
        console.log("Error in Update Data");
    }
})

app.delete('/Delete/:id',(req,res) => {
    try {
        const {id} = req.params
        const deleteUser = "DELETE from Pixxel Where ID= ? ";

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