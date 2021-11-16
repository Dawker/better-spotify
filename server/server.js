const express = require("express");
require('dotenv').config()
const lyricsFinder = require("lyrics-finder")
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET_ID,
    refreshToken
  });
  spotifyApi.refreshAccessToken().then(
    (data) => {
      const { access_token, expires_in } = data.body;
      res.send({
        accessToken: access_token,
        expiresIn: expires_in
      })
    }).catch(() => {
      res.send(400);
    })
});

app.post('/login', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET_ID,
  });

  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in

    })
    console.log("log in")
  }).catch((err) => {
    console.log(err)
    res.send(400).json("Error", err)
  })
});

app.get('/lyrics', async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
  res.json({ lyrics });
})

app.listen(3001, () => console.log("listening on 3001"))