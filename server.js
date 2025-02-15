// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Last.fm configuration (replace values if needed)
const LASTFM_USERNAME = 'Souptik-Samanta';
const LASTFM_API_KEY = '3448e1e3fb98b8cf6279ff1a310b7c53';
// Dummy duration for now playing tracks (in seconds)
const DUMMY_DURATION = 180;

// Global variable to store the currently playing track info.
let nowPlayingTrack = null;

// Serve static files from the "public" folder.
app.use(express.static('public'));

// New endpoint to provide now-playing data (with elapsed time computed server-side)
app.get('/now-playing', async (req, res) => {
  try {
    // Using the global fetch (no need for node-fetch)
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
            albumArt:
              (track.image && track.image.length
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
              albumArt:
                (track.image && track.image.length
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

// (Optional) Other endpoints like /projects or /add would go here.

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
