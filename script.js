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
const db = firebase.firestore();

console.log("✅ Firebase Connected Successfully");