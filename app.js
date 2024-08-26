require("dotenv").config(); // to conn env with express
const moviesRoutes = require("./routes/movies/moviesRoutes.js");
const db = require("./db/index.js");
const express = require("express");  //import express from node moduless
const app = new express();  //obj creation for express class

    //const port = 8080; 
    //port is a logical entity to connect with the prc in our system{above 3000 can be free}
const port = process.env.PORT || 8080;
//PORT moved from enironment file(prc level) if not available 8080 is used. for which .env was istalled 
     //env file shouldn't posted to git

 db();
 app.use(express.json());
app.use("/movies",moviesRoutes);


app.listen(port, () =>{   //a call back function(argument is op os another function)
    console.log(`Express app listerning at http://localhost:${port}`);
}); //express is said to listern port num 8080 i.e. here the communication starts with express

//after exec this file (node app.js) the server starts
//ctrl+c to terminate (the listerning to the port stops and D:\movielisting_app> comes)
//gitignore the files or folder that shouldn't be pushed to git hub