const http = require("http")
const { text } = require("stream/consumers")
const server = http.createServer((req,res)=>{
    res.writeHead(200,{"content-type":'text/plain'})
    res.end("Server Created")
    console.log("Server Started");
})

server.listen(5000,()=>{
    console.log("Server Running on Port 5000");
})

const fs = require('fs')

fs.writeFile("AMAN.txt","My First NodeJs FileSystem File Created on 20 Jan 2025",(err)=>{
    if (err){
        console.log(err);
    }
    else{
        console.log("File Created Successfully");
    }
})