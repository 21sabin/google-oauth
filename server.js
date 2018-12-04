const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
var app = express();
app.set('view engine','ejs');
app.set('views','./views')


const googleConfig = {
    clientId: '973025605826-nh3sa7tno4uc8l3ejre87rd4i9go53n3.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: '5_zsUIaHAhARe4rb-bKpcccr', // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: 'http://localhost:300/google-auth' // this must match your google api settings
  };


  function createConnection() {
    return new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirect
    );
  }

  const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
  ];
  
  /**
   * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
   */
  function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: defaultScope
    });
  }
  
  /**
   * Create the google url to be sent to the client.
   */
  function urlGoogle() {
    const auth = createConnection(); // this is from previous step
    const url = getConnectionUrl(auth);
    return url;
  }

app.get('/',( request , respone )=>{
    const url = urlGoogle();
    respone.render('login',{
        url
    })
})

app.listen(3000,()=>{
    console.log("server started at 3000")
})