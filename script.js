const firebaseConfig = {
  apiKey: "AIzaSyBq0UDvcp9Sdq7pQhcLadl20ju-VLX4l8s",
  authDomain: "kotahostel-23d4d.firebaseapp.com",
  projectId: "kotahostel-23d4d",
  storageBucket: "kotahostel-23d4d.firebasestorage.app",
  messagingSenderId: "618520036441",
  appId: "1:618520036441:web:deb85bb9ec148f44381d48",
  measurementId: "G-PFXFZBG947"
};

// Firebase Initialize
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();


// ================= REGISTER =================

function register() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)

    .then((userCredential) => {

      return db.collection("users").doc(userCredential.user.uid).set({

        name: name,
        email: email,
        phone: "",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()

      });

    })

    .then(() => {

      document.getElementById("message").innerText =
      "Registration Successful!";

    })

    .catch((error) => {

      document.getElementById("message").innerText =
      error.message;

    });

}



// ================= LOGIN =================

function login() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)

    .then(() => {

      document.getElementById("message").innerText =
      "Login Successful!";

    })

    .catch((error) => {

      document.getElementById("message").innerText =
      error.message;

    });

}



// ================= LOGOUT =================

function logout() {

  auth.signOut().then(() => {

    document.getElementById("message").innerText =
    "Logged Out!";

  });

}



// ================= LOAD HOSTELS =================

const hostelList = document.getElementById("hostelList");

if (hostelList) {

  db.collection("hostels").get()

  .then((querySnapshot) => {

    let html = "";

    querySnapshot.forEach((doc) => {

      const hostel = doc.data();

      html += `

      <div class="card" onclick="openHostel('${doc.id}')">

      <img src="${hostel.image}" width="100%">

      <h3>${hostel.name}</h3>

      <p><b>Location:</b> ${hostel.location}</p>

      <p><b>Price:</b> ₹${hostel.price}/month</p>

      <p><b>WiFi:</b> ${hostel.wifi}</p>

      <p><b>Food:</b> ${hostel.food}</p>

      <p><b>AC:</b> ${hostel.ac}</p>

      </div>

      `;

    });

    hostelList.innerHTML = html;

  });

}



// ================= OPEN DETAILS =================

function openHostel(id) {

  localStorage.setItem("hostelId", id);

  window.location.href = "hostel.html";

}



// ================= DETAILS PAGE =================

function loadHostelDetails() {

  const hostelId = localStorage.getItem("hostelId");

  if (!hostelId) return;

  db.collection("hostels").doc(hostelId).get()

  .then((doc) => {

    if (!doc.exists) {

      alert("Hostel Not Found");

      return;

    }

    const h = doc.data();
    alert(JSON.stringify(h));
    alert(h.location);

    document.getElementById("image").src = h.image;
    document.getElementById("name").innerText = h.name;
    document.getElementById("location").innerText = h.location;
    document.getElementById("price").innerText = h.price;
    document.getElementById("wifi").innerText = h.wifi;
    document.getElementById("food").innerText = h.food;
    document.getElementById("ac").innerText = h.ac;

  });

}



// ================= AUTO LOAD =================

if (window.location.pathname.includes("hostel.html")) {

  loadHostelDetails();

}
