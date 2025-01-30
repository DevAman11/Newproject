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
      cb(null, "Upload/") 
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use('/Upload', express.static(path.join(__dirname, 'Upload')))
app.use(cors());
app.use(express.json())

const dataBase = Mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pixxelu_data"
})

dataBase.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit();
    }
    console.log("Database Connected Successfully")
})

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

app.post('/addCategory', (req, res) => {
    try {
        const { categoryName } = req.body;
        const token = jwt.sign(categoryName, "Aman@key");
        const insertCategory = "INSERT INTO Category(Token_id, Name) VALUES(?, ?)";
        dataBase.query(insertCategory, [token, categoryName], (err, result) => {
            if (err) {
                console.error("Error adding category:", err);
                return res.status(500).send("Error adding category");
            }
            res.send("Category Added Successfully");
        });
    } catch (error) {
        console.log(error, "Error In Category Adding");
        res.status(500).send("Error adding category");
    }
});

// app.post('/addPostData', upload.single('Images'), (req, res) => {
//     try {
//         const { Category, Title, Content } = req.body;
//         const token = jwt.sign({ Category }, "Aman@key");
//         const postData = 'INSERT INTO posts(Token_id, Category, Title, Content, Image) VALUES(?,?,?,?,?)';
//         dataBase.query(postData, [token, Category, Title, Content, req.file.originalname], (err, result) => {
//             if (err) {
//                 console.error("Error creating post:", err);
//                 return res.status(500).send("Error In Post Creating");
//             }
//             res.send({ "message": "Post Data Added Successfully" });
//         });
//     } catch (error) {
//         console.log("Error in Creating Post", error);
//         res.status(500).send("Error In Post Creating");
//     }

//     if (req.file) {
//         req.body.filePath = req.file.path;
//         res.send({ "msg": 'file uploaded Successfully' });
//     } else {
//         res.send(req.file);
//     }
// });

app.post('/addPostData', upload.single('Images'), (req, res) => {
    try {
        const { Category, Title, Content } = req.body;
        const token = jwt.sign({ Category }, "Aman@key");
        const postData = 'INSERT INTO posts(Token_id, Category, Title, Content, Image) VALUES(?,?,?,?,?)';
        
        // Only send the response after query completion, to avoid multiple responses.
        dataBase.query(postData, [token, Category, Title, Content, req.file.originalname], (err, result) => {
            if (err) {
                console.error("Error creating post:", err);
                if (!res.headersSent) {  // Make sure headers haven't been sent yet.
                    return res.status(500).send("Error In Post Creating");
                }
            } else {
                if (!res.headersSent) {  // Make sure headers haven't been sent yet.
                    res.send({ "message": "Post Data Added Successfully" });
                }
            }
        });
    } catch (error) {
        console.log("Error in Creating Post", error);
        if (!res.headersSent) {  // Make sure headers haven't been sent yet.
            res.status(500).send("Error In Post Creating");
        }
    }

    // If file was uploaded, send response separately.
    if (req.file) {
        if (!res.headersSent) {  // Make sure headers haven't been sent yet.
            req.body.filePath = req.file.path;
            return res.send({ "msg": 'File uploaded Successfully' });
        }
    } else {
        if (!res.headersSent) {  // Make sure headers haven't been sent yet.
            res.send(req.file);
        }
    }
});



app.get('/viewPostData', (req, res) => {
    try {
        const viewPostData = "SELECT * FROM Posts";
        dataBase.query(viewPostData, (err, result) => {
            if (err) {
                console.error('Error fetching posts:', err);
                return res.status(500).json({ msg: 'Error fetching posts', error: err.message });
            }
            res.status(200).json(result);
        });
    } catch (error) {
        console.error("Error in fetching post data:", error);
        res.status(500).json({ msg: "Error fetching posts", error: error.message });
    }
});

app.get('/viewCategory', (req, res) => {
    try {
        const catData = "SELECT * FROM Category";
        dataBase.query(catData, (err, result) => {
            if (err) {
                console.error("Error fetching categories:", err);
                return res.status(500).send("Error fetching categories");
            }
            res.send(result);
        });
    } catch (error) {
        console.log(error, "Error In Fetching Categories");
        res.status(500).send("Error fetching categories");
    }
});

app.get('/View', (req, res) => {
    try {
        const viewData = "SELECT * FROM Pixxel";
        dataBase.query(viewData, (err, result) => {
            if (err) {
                console.error("Error fetching users:", err);
                return res.status(500).send("Error fetching users");
            }
            res.send(result);
        });
    } catch (error) {
        console.log(error, "Error In Fetching Users");
        res.status(500).send("Error fetching users");
    }
});

app.patch('/Update/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { Firstname, Lastname, Username, Email } = req.body;
        const updateData = "UPDATE Pixxel SET Firstname = ?, Lastname = ?, Username = ?, Email = ? WHERE ID = ?";
        dataBase.query(updateData, [Firstname, Lastname, Username, Email, id], (err, result) => {
            if (err) {
                console.error("Error updating user:", err);
                return res.status(500).send("Error updating user");
            }
            res.send("Data Updated Successfully");
        });
    } catch (error) {
        console.log("Error in Update Data", error);
        res.status(500).send("Error updating data");
    }
});

app.delete('/Delete/:id', (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = "DELETE FROM Pixxel WHERE ID = ?";
        dataBase.query(deleteUser, [id], (err, result) => {
            if (err) {
                console.error("Error deleting user:", err);
                return res.status(500).send("Error deleting user");
            }
            res.send("Delete User Successfully");
        });
    } catch (error) {
        console.log("Error in Deleting User", error);
        res.status(500).send("Error deleting user");
    }
});

app.listen(9000, () => {
    console.log("Server Run On Port 9000");
});
