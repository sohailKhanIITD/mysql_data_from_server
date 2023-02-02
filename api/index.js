const express = require('express');
const app = express();
const request = require("request");
const http = require('http').createServer(app);
const Util = require('./util.js');
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "mysql-109051-0.cloudclusters.net",
    port: 10253,
    user: "admin",
    password: "C3xF8hGx",
    database: "test"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // con.query("SELECT * FROM movies;", function (err, result) {
    //     if (err) throw err;
    //     console.log("Result: " + result[0].tconst);
    //   });
});

// to accept Json data
app.use(express.json());



app.get('/api/v1/longest-duration-movies', function(req,res){
    con.query("SELECT tconst,primaryTitle,runtimeMinutes,genres FROM movies ORDER BY runtimeMinutes DESC LIMIT 10;", function(err, result){
        if(err){
            console.log(err)
            res.send("error").status(500)
        }
        else{
            res.send(result).status(200)
        }
    })
});


app.get('/api/v1/top-rated-movies', function(req,res){
    con.query(`SELECT movies.tconst, movies.primaryTitle, movies.genres, rating.averageRating
                FROM movies, rating
                WHERE movies.tconst=rating.tconst and rating.averageRating>6.0`, 
    function(err, result){
        if(err){
            console.log(err)
            res.send("error").status(500)
        }
        else{
            res.send(result).status(200)
        }
    })
});

/*
Json Format
{
    tconst: String,
    titleType: String
    primaryTitle: String
    runtimeMinutes: Int
    genres: String
}
*/
app.post('/api/v1/new-movie', function(req,res, next){
    row = req.body
    // console.log(row)
    con.query(`INSERT INTO movies (tconst, titleType, primaryTitle, runtimeMinutes, genres) VALUES ("${row.tconst}","${row.titleType}","${row.primaryTitle}",${row.runtimeMinutes},"${row.genres}")`, function(err, result){
        if(err){
            console.log(err)
            res.send("error").status(500)
        }
        else{
            console.log("new movies record inserted")
            console.log(result)
            res.send("success").status(200)
        }
    })
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});