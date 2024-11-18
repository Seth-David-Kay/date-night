// Import firebaseConfig from your local file
import { firebaseConfig } from './authFirebaseConfig.js';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submitButton = document.getElementById("submit");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

var email, password;

submitButton.addEventListener("click", function() {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Success! Welcome back!");
    })
    .catch((error) => {
      console.log("Error occurred. Try again.");
      window.alert("Error occurred. Try again.");
    });
});

// On auth change send to main page
auth.onAuthStateChanged((user) => {
    if (user) {
      window.location.href = "main.html";
    }
  }
);
