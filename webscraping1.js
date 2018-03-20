// Require all the packages for Web Scraping 
//===================================================================================
// 1.  Request package
// We need request package to makes HTTP request for HTML page
var request = require ('request');
//===================================================================================
// 2.  cheerio Package
// We need cheerio package to parse our HTML and helps us find elements
var cheerio = require ('cheerio');
//===================================================================================

//Use request and store the elements
// request('https://www.epicurious.com/', function(error, response, html){
    
//     // Load the HTML to cheerio
//     var $ = cheerio.load(html);
//     // console.log(html)

//     // create an empty array to store the scraped results
//     var results = [];
    
//         var parent = $('article.article-hero-featured-item').children();
//         console.log(parent);
//      parent.each(function(index){
//         results.push(parent.eq(index).children('a.title').text());
        
//      });   

//    console.log(results);
// })

request('https://www.empireonline.com/movies/features/best-posters/', function(error, response, html){
    
    // Load the HTML to cheerio
    var $ = cheerio.load(html);
    // console.log(html)

    // create an empty array to store the scraped results
    var results = [];
    
    var parent =  $('.article__text h2')
    
    parent.each(function(index){
    var titles = $('.article__text h2').text();
    // console.log(titles);
    var image = $('.article__text h2+p span img[src=jpg].src');
    console.log(image);
    var description = $('.article__text h2+p+p').text();
    // console.log(description););
        results.push({
            titles: titles,
            description: description
        });
    // console.log(results);
    });
})


