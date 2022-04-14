// import { Router } from 'express';
const express = require('express');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

var router = express.Router();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

let products = [];

fs.readFile('routes/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), listProducts);
});

/* Auth stuff */

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listProducts(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: '1oDPelFjCP-LXlG4XWtm6M-zUv-jTu8h5n-oGUznjBXQ',
      range: 'decks-titus!C2:K',
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      if (rows.length) {
        // Print columns A and E, which correspond to indices 0 and 4.
        rows.map((row) => {
          var item = [row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8]];
          products.push(item);
        });
      } else {
        console.log('No data found.');
      }
    }
  );
}

function sortProducts(input) {
  
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', products });
});

module.exports = router;
