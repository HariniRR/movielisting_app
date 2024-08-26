const express = require("express");
const router = express.Router();
const Movie = require("../../db/schemas/movieSchema.js");
//  ../../ moves to main directory   ../ moves bofore 2 folders
// get request
//router .get("/", async(req,res) =>{  
   // const movies = await Movie.find(); // await is an async fun
  //  res.json(movies); });

//get with sugesstions and filters
router .get("/", async(req,res) =>{  
    const queryParams = req.query;
    const filters = {};
    if(queryParams.name){
        filters.name = {
            $regex: `^${queryParams.name}`,
            $options: "i",
        };
    }
if(queryParams.rating){
    filters.rating = {
        $gte: parseFloat(queryParams.rating),
    };
}
const movies = await Movie.find(filters);
res.json(movies);
});
// "^" rep starts with and "$options = i" rep case-insensitive


router .post("/", async(req,res) =>{ 
    try{ 
    console.log(req.body);
    const moviesData = req.body;
    const newMovie = new Movie(moviesData); //data convert to json format
    await newMovie.save();
    res.json({
        message:"movie added successfully",
    });
   }catch(error){
    console.log(error);
    res.status(500).json({
        message: "Internal server error",
    });
   }
});

//updating 1 obj, so id is obtained
router.put("/:id", async(req,res) => {
    try{
    const movieId = req.params.id;
    const updatedMoviedata = req.body;
    await Movie.findByIdAndUpdate(movieId, updatedMoviedata)
    res.json({
        message: "Movie updated successfully",
    });
     }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        })
     }
});


//getby id
router.get("/:id", async(req,res) => {
    try{
    const movieId = req.params.id; //req.params.id to seperate id from url
    const movie = await Movie.findById(movieId);
        res.json(movie); 

     }catch(error){
        if(error.kind === "ObjectId"){ 
            res.status(404).json({
            message: "Movie not found",
        })}
        else{
            res.status(500).json({
                message: "Internal server error",
            })
        }
       
     }
});

module.exports = router;
//request are saved in postman

//mongoose documentation