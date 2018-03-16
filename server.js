// GET THE SERVER STARTED FOR THE APP TO RUN
//==========================================

// 3.  express library
// We are going to use express library to run the server
var express = require ('express');
//===================================================================================
//===================================================================================

// We want the server to run on a port 
// DEFINE THE PORT
var PORT = process.env.PORT || 3000;
//===================================================================================
// We weant to make an instance of express library
// INSTANCE FOR EXPRESS
var app = express();
//===================================================================================
//===================================================================================


// RUN THE SERVER
app.listen(PORT, function(){
    console.log('app listening to PORT:'+ PORT)
});