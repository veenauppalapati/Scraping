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
request('https://www.reddit.com/', function(error, response, html){
    
    // Load the HTML to cheerio
    var $ = cheerio.load(html);
    // console.log(html)

    // create an empty array to store the scraped results
    var results = [];
    var parent = $('#siteTable').children();
    console.log('********************************************************')
    parent.each(function(index){
        results.push(parent.eq(index).children().eq(4).find('a.title').text());    
    });
    console.log(results);
 
   
})





