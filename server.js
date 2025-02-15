// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
// Last.fm configuration from environment variables.
const LASTFM_USERNAME ='Souptik-Samanta' ;
const LASTFM_API_KEY ='3448e1e3fb98b8cf6279ff1a310b7c53' ;
// Dummy duration for now playing tracks (in seconds)
const DUMMY_DURATION = process.env.DUMMY_DURATION || 180;
// Global variable to store the currently playing track info.
let nowPlayingTrack = null;
// Serve static files from the "public" folder.
app.use(express.static('public'));
/**
 * Endpoint: /now-playing
 * Fetches recent track info from Last.fm and calculates elapsed time server-side.
 */
app.get('/now-playing', async (req, res) => {
  try {
    // Use global fetch (available in Node v18+)
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
    );
    const data = await response.json();
    if (data.recenttracks && data.recenttracks.track) {
      const track = data.recenttracks.track[0];
      const isNowPlaying = track["@attr"] && track["@attr"].nowplaying === "true";
      if (isNowPlaying) {
        // If a new track is detected, update our global record with the server's start time.
        if (!nowPlayingTrack || nowPlayingTrack.name !== track.name) {
          nowPlayingTrack = {
            name: track.name,
            artist: track.artist["#text"],
            albumArt: (track.image && track.image.length
              ? track.image[track.image.length - 1]["#text"]
              : "public/img/demo_album.png"),
            startTime: Date.now(), // Record when the track started (server time)
            duration: DUMMY_DURATION
          };
        }
        // Calculate elapsed time on the server.
        const elapsed = Math.floor((Date.now() - nowPlayingTrack.startTime) / 1000);
        return res.json({
          nowPlaying: true,
          track: nowPlayingTrack,
          elapsed: elapsed
        });
      } else {
        // No track currently playing.
        nowPlayingTrack = null;
        if (track.date && track.date.uts) {
          return res.json({
            nowPlaying: false,
            track: {
              name: track.name,
              artist: track.artist["#text"],
              albumArt: (track.image && track.image.length
                ? track.image[track.image.length - 1]["#text"]
                : "public/img/demo_album.png")
            },
            lastPlayed: new Date(track.date.uts * 1000).toLocaleString()
          });
        } else {
          return res.json({
            nowPlaying: false,
            message: "Not currently playing"
          });
        }
      }
    } else {
      return res.json({ nowPlaying: false, message: "No track data available" });
    }
  } catch (err) {
    console.error("Error in /now-playing endpoint:", err);
    res.status(500).json({ error: "Error fetching now playing data" });
  }
});
/**
 * Endpoint: /projects
 * Reads the project data from data.json and returns it as JSON.
 */
app.get('/projects', (req, res) => {
  const dataFile = path.join(__dirname, 'data.json');
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading data.json:", err);
      return res.status(500).json({ error: "Error reading projects data" });
    }
    try {
      const projects = JSON.parse(data);
      res.json(projects);
    } catch (parseError) {
      console.error("Error parsing data.json:", parseError);
      res.status(500).json({ error: "Error parsing projects data" });
    }
  });
});
// (Optional) You can add additional endpoints like /add here.
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});