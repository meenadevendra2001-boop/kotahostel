const firebaseConfig = {
  apiKey: "AIzaSyBq0UDvcp9Sdq7pQhcLadl20ju-VLX4l8s",
  authDomain: "kotahostel-23d4d.firebaseapp.com",
  projectId: "kotahostel-23d4d",
  storageBucket: "kotahostel-23d4d.firebasestorage.app",
  messagingSenderId: "618520036441",
  appId: "1:618520036441:web:deb85bb9ec148f44381d48"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("message").innerText = "Registration Successful!";
    })
    .catch((error) => {
      document.getElementById("message").innerText = error.message;
    });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("message").innerText = "Login Successful!";
    })
    .catch((error) => {
      document.getElementById("message").innerText = error.message;
    });
}

function logout() {
  auth.signOut().then(() => {
    document.getElementById("message").innerText = "Logged Out!";
  });
}
