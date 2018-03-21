var express = require ('express');
var request = require ('request');
var mongojs = require('mongojs');
var cheerio = require('cheerio');
var PORT = 3000;
var app = express();

// Database configuration
var databaseURL = "mongodb://127.0.0.1:27017/scrape";

//Hook mongojs configuration to the db variable
var db = mongojs(databaseURL);
db.on('error', function(error) {
    console.log('Database ERror:', error);
});

// Main routing for testing purpose
app.get('/', function(req, res) {
    res.send('hello World');
});

// Retrieve data from the db
app.get('/all', function(req, res) {
    // Find all results form the scrapedData collection in the the db   
    db.extractedData.find({}, function(error, found){
        if(error) {
            console.log(error);            
        }
        else {
            res.json(found);
        }
    })
})
//Scrape data from "" mongodb db
app.get('/scrape', function(req, res){
    // Make a request for empireonline.com 
    request('https://www.empireonline.com/movies/features/best-posters/', function(error, response, html){
    
        // Load the HTML to cheerio
        var $ = cheerio.load(html);

        var parent =  $('.article__text h2');
        var results = [];
           
           // console.log(description););
        // Extract the data from the html
        parent.each(function(index, element){
            var titles = $(element).text();
        
            // var image = $('.article__text h2+p span img[src$=jpg].src');
            var image = $(element).next('p').children('span').children('img').attr('src');
            // console.log(image);
            // var description = $('.article__text h2+p+p').text();
            var description = $(element).next().next('p').text();
            console.log(description)
        
        // console.log(description););
            results.push({
                titles: titles,
                image: image,
                description: description
            });

        });
        // console.log(titles);
          // If this found element had both a title and a link
          if(results) {
            // before inserting any data, it drops
            db.extractedData.drop();
            // Insert the data in the extractedData db
            db.extractedData.insert(results,
            function(err, inserted) {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(inserted)
                }
            });
        }
    });
});

app.listen(PORT, function(){
    console.log('app listenting to PORT:' + PORT);
})