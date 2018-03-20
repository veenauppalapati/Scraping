var express = require ('express');
var mongojs = require('mongojs');
var PORT = 3000;
var app = express();

// Database configuration
var databaseURL = "mongodb://127.0.0.1:27017/scrape";
var collections = ["scrapedData"];

//Hook mongojs configuration to the db variable
var db = mongojs(databaseURL, collections);
db.on('error', function(error) {
    console.log('Database ERror:', error);
});

// Main routing for testing purpose
app.get('/', function(req, res) {
    res.send('hello World');
});


//Scrape data from "" mongodb db
app.get('/scrape', function(req, res){
    // Make a request for empireonline.com 
    request('https://www.empireonline.com/movies/features/best-posters/', function(error, response, html){
    
        // Load the HTML to cheerio
        var $ = cheerio.load(html);

        // Extract the data from the html
        parent.each(function(index){
            // 1.  Extract the titles 
            var titles = $('.article__text h2').text();
            // console.log(titles);

            // 2.  Extract the titles
            var image = $('.article__text h2+p span img[src=jpg].src');
            // console.log(image);

            // 3.  Extract the titles
            var description = $('.article__text h2+p+p').text();
            // console.log(description););

            // If this found element had both a title and a link
            if(titles && image && description) {
                // Insert the data in the extractedData db
                db.extractedData.insert({
                    //create properties (field names ) with values coming from extracted data
                    titles: titles,
                    image: image,
                    description: description
                },
                function(err, inserted) {
                    if(err) {
                        console.log(err);
                    }
                    else {}
                });
            }
        });
    });
});

app.listen(PORT, function(){
    console.log('app listenting to PORT:' + PORT);
})