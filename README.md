# video-sync
Syncs videos
Using a firebase static deployment and a firebase realtime database efficiently syncs video playback with an intuitive ui across everyone using the website. Also implements a login feature.

Files needed to run:
  1. public/authFirebaseConfig.js:
    - exports a const firebaseConfig that contains the, gathered from the firebase project dashboard.
      - apiKey
      - authDomain
      - databaseURL
      - projectId
      - storageBucket
      - messagingSenderId
      - appId:
      - measurementId
  2. public/firebaseConfig.js
    - exports a database instance `export { database };`.
      - First, it defines the firebase config from above (without the measurementID)
      - It initializes the app `const app = initializeApp(firebaseConfig);`
      - It gets the database using the project secrets `const database = getDatabase(app);`
      - It exports the database instance `export { database };`
