import { database } from './firebaseConfig.js';
import { firebaseConfig } from './authFirebaseConfig.js';
import { ref, set, onValue } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

const videoPlayer = document.getElementById('videoPlayer');
const fileInput = document.getElementById('fileInput');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Download link
document.getElementById('downloadLink').addEventListener('click', function(event) {
    event.preventDefault();
    // Verify auth
    const user = auth.currentUser;
    if (!user) {
      window.location.href = "login.html";
    } else{
      window.location.href = 'https://gwu.box.com/s/er4n29b70pyaxjvmhokl7omdhyxh4qbj';
    }
});

// Handle file selection
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];  // Get the selected file
  // Verify auth
  const user = auth.currentUser;
  if (!user) {
    window.location.href = "login.html";
  } else {
    if (file) {
      const fileURL = URL.createObjectURL(file);  // Convert the file to a URL
      videoPlayer.src = fileURL;  // Set the video source to the file URL
      videoPlayer.load();  // Load the video into the player
      console.log(`Loaded file: ${file.name}`);  // Debugging: Log the loaded file name
    } else {
      console.log("No file selected");  // Debugging: Log if no file was selected
    }
  }
});

// Display to console when the database content changes
const updateDatabaseContent = () => {
  const playbackRef = ref(database, 'playback');
  onValue(playbackRef, (snapshot) => {
    const data = snapshot.val();
    // On a change, change the playback so that it matches the database
    if (data.playing) {
      videoPlayer.play();
    }
    else {
      videoPlayer.pause();
    }
    if (Math.abs(videoPlayer.currentTime - data.timestamp) > 0.1) {
      videoPlayer.currentTime = data.timestamp;
    }
  });
};

// Listen to changes in playback (play/pause)
videoPlayer.addEventListener('play', () => {
  const playbackRef = ref(database, 'playback');
  set(playbackRef, { playing: true, timestamp: videoPlayer.currentTime});
  console.log('Video is playing');
});

videoPlayer.addEventListener('pause', () => {
  const playbackRef = ref(database, 'playback');
  set(playbackRef, { playing: false, timestamp: videoPlayer.currentTime});
  console.log('Video is paused');
});

// Reset button that will reset the video to the beginning and pause playback
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', () => {
  // Verify auth
  const user = auth.currentUser;
  if (!user) {
    window.location.href = "login.html";
  } else {
    videoPlayer.currentTime = 0;
    videoPlayer.pause();
    const playbackRef = ref(database, 'playback');
    set(playbackRef, { playing: false, timestamp: 0 });
    console.log('Video is reset');
  }
});

// Initial call to update database content
updateDatabaseContent();

// Check if user is logged in on page load (so no one can access the page without logging in by typing the URL)
auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "login.html";
    }
  }
);
