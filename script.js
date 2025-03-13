// 📌 Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyDzzfiA07QiAEUrzpQ8OB2aq5n7LsScGnE",
    authDomain: "cfjvfj-cca83.firebaseapp.com",
    projectId: "cfjvfj-cca83",
    storageBucket: "cfjvfj-cca83.appspot.com",
    messagingSenderId: "719886543488",
    appId: "1:719886543488:web:G-GMMTVKHXC8"
};

// 📌 Firebase başlat
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

   
    const loginScreen = document.getElementById("login-screen");
    const chatScreen = document.getElementById("chat-screen");
    const usernameInput = document.getElementById("username");
    const startChatBtn = document.getElementById("start-chat");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const chatMessages = document.getElementById("chat-messages");

    // Kullanıcı ismini localStorage ile sakla
    let username = localStorage.getItem("username");

    if (username) {
        loginScreen.style.display = "none";
        chatScreen.style.display = "block";
    }

    startChatBtn.addEventListener("click", function () {
        username = usernameInput.value.trim();
        if (username !== "") {
            localStorage.setItem("username", username);
            loginScreen.style.display = "none";
            chatScreen.style.display = "block";
        }
    });

    // Mesaj gönderme
    sendBtn.addEventListener("click", function () {
        const message = messageInput.value.trim();
        if (message !== "") {
            db.collection("messages").add({
                username: username,
                text: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            messageInput.value = "";
        }
    });

    // Gerçek zamanlı mesaj dinleme
    db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
        chatMessages.innerHTML = "";
        snapshot.forEach(doc => {
            const msg = doc.data();
            const messageDiv = document.createElement("div");
            messageDiv.innerHTML = `<strong>${msg.username}:</strong> ${msg.text}`;
            chatMessages.appendChild(messageDiv);
        });
    });
