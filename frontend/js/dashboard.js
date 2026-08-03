// ===============================
// JWT CHECK
// ===============================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// ===============================
// USERNAME
// ===============================

const username = localStorage.getItem("username") || "User";
document.getElementById("username").innerText = username;

// ===============================
// LOGOUT
// ===============================

document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    window.location.href = "login.html";

});

// ===============================
// IMAGE / CAMERA VARIABLES
// ===============================

const imageInput = document.getElementById("medicineImage");
const previewImage = document.getElementById("previewImage");
const cameraPreview = document.getElementById("cameraPreview");
const captureCanvas = document.getElementById("captureCanvas");

let selectedImage = null;
let stream = null;

// ===============================
// IMAGE PREVIEW
// ===============================

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    selectedImage = file;

    const reader = new FileReader();

    reader.onload = function (e) {

        previewImage.src = e.target.result;
        previewImage.hidden = false;

    };

    reader.readAsDataURL(file);

});

// ===============================
// OCR
// ===============================

async function extractMedicineName(imageFile) {

    const status = document.getElementById("scanStatus");

    status.innerHTML = "🔍 Scanning medicine...";

    const result = await Tesseract.recognize(

        imageFile,

        "eng"

    );

    const text = result.data.text;

    console.log(text);

    return text;

}

// ===============================
// ANALYZE
// ===============================

document.getElementById("analyzeBtn").addEventListener("click", async () => {

    if (!selectedImage) {

        alert("Please upload or capture a medicine image.");

        return;

    }

    try {

        const extractedText = await extractMedicineName(selectedImage);

        console.log(extractedText);

        const medicines = [

            "Paracetamol",
            "Cetirizine",
            "Amoxicillin",
            "Ibuprofen",
            "Omeprazole"

        ];

        let medicineName = null;

        for (const medicine of medicines) {

            if (

                extractedText.toLowerCase()

                .includes(medicine.toLowerCase())

            ) {

                medicineName = medicine;

                break;

            }

        }

        if (!medicineName) {

            document.getElementById("scanStatus").innerHTML =

                "❌ Medicine not recognized.<br>Please upload a clearer image.";

            return;

        }

        document.getElementById("scanStatus").innerHTML =

            "💊 Medicine Found: <b>" + medicineName + "</b>";

        const response = await fetch(

            `http://localhost:8080/api/lookup/${medicineName}`,

            {

                headers: {

                    Authorization: "Bearer " + token

                }

            }

        );

        if (!response.ok) {

            alert("Medicine not found.");

            return;

        }

        const medicine = await response.json();

        updateCards(medicine);

        addHistory(medicine.name);

        displayHistory();

    }

    catch (e) {

        console.error(e);

        document.getElementById("scanStatus").innerHTML =

            "❌ OCR Failed.";

    }

});

// ===============================
// OPEN CAMERA
// ===============================

document.getElementById("cameraBtn").addEventListener("click", async () => {

    try {

        stream = await navigator.mediaDevices.getUserMedia({

            video: true

        });

        cameraPreview.srcObject = stream;

        cameraPreview.hidden = false;

        previewImage.hidden = true;

    }

    catch (err) {

        console.log(err);

        alert("Unable to open camera.");

    }

});

// ===============================
// CAPTURE IMAGE
// ===============================

document.getElementById("captureBtn").addEventListener("click", () => {

    if (!stream) {

        alert("Open camera first.");

        return;

    }

    const context = captureCanvas.getContext("2d");

    captureCanvas.width = cameraPreview.videoWidth;

    captureCanvas.height = cameraPreview.videoHeight;

    context.drawImage(

        cameraPreview,

        0,

        0,

        captureCanvas.width,

        captureCanvas.height

    );

    captureCanvas.toBlob(function (blob) {

        selectedImage = blob;

        previewImage.src = URL.createObjectURL(blob);

        previewImage.hidden = false;

        cameraPreview.hidden = true;

        stream.getTracks().forEach(track => track.stop());

        stream = null;

    }, "image/png");

});

// ===============================
// HISTORY
// ===============================

// Get logged-in username
const currentUser = localStorage.getItem("username") || "User";

// Create unique history key for each user
const historyKey = `scanHistory_${currentUser}`;

// Load history of current user only
let history = JSON.parse(localStorage.getItem(historyKey)) || [];

function addHistory(name) {

    history.unshift(name);

    history = history.slice(0, 10);

    localStorage.setItem(
        historyKey,
        JSON.stringify(history)
    );

}

function displayHistory() {

    const historyList = document.getElementById("historyList");

    historyList.innerHTML = "";

    history.forEach(item => {

        historyList.innerHTML += `
            <div class="history-item">
                💊 ${item}
            </div>
        `;

    });

}

displayHistory();

// ===============================
// SEARCH HISTORY
// ===============================

const historySearch = document.getElementById("historySearch");

historySearch.addEventListener("keyup", () => {

    const value = historySearch.value.toLowerCase();

    document.querySelectorAll(".history-item").forEach(item => {

        item.style.display =

            item.innerText.toLowerCase().includes(value)

                ? "block"

                : "none";

    });

});

// ===============================
// UPDATE CARDS
// ===============================

function updateCards(medicine) {

    document.getElementById("medicineName").innerText = medicine.name;

    document.getElementById("medicineUses").innerText = medicine.usedFor;

    document.getElementById("medicineDosage").innerText = medicine.dosage;

    document.getElementById("recommendedFoods").innerText = medicine.recommendedFoods;

    document.getElementById("avoidFoods").innerText = medicine.avoidFoods;

    document.getElementById("sideEffects").innerText = medicine.sideEffects;

}
// ===============================
// CHATBOT
// ===============================

const chatPopup = document.getElementById("chatPopup");
const openChat = document.getElementById("openChat");
const closeChat = document.getElementById("closeChat");
const sendMessage = document.getElementById("sendMessage");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

// Open Chat
openChat.addEventListener("click", () => {
    chatPopup.style.display = "flex";
});

// Close Chat
closeChat.addEventListener("click", () => {
    chatPopup.style.display = "none";
});

// Send Message Button
sendMessage.addEventListener("click", sendChatMessage);

// Press Enter
chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendChatMessage();
    }
});

async function sendChatMessage() {

    const message = chatInput.value.trim();

    if (message === "") return;

    // User Message
    chatBody.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    chatInput.value = "";

    chatBody.scrollTop = chatBody.scrollHeight;

    // Typing Message
    const typing = document.createElement("div");

typing.className = "typing-message";

typing.id = "typingMessage";

typing.innerHTML = `

<div class="typing-bubble">

    <span></span>

    <span></span>

    <span></span>

</div>

`;

    chatBody.appendChild(typing);

    chatBody.scrollTop = chatBody.scrollHeight;

    try {

        const response = await fetch(
            "http://localhost:8080/api/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );

        const data = await response.json();

        document.getElementById("typingMessage").remove();

        chatBody.innerHTML += `
            <div class="bot-message">
                ${data.reply}
            </div>
        `;

        chatBody.scrollTop = chatBody.scrollHeight;

    } catch (error) {

        console.error(error);

        document.getElementById("typingMessage").remove();

        chatBody.innerHTML += `
            <div class="bot-message">
                ❌ Unable to connect to MediGuide AI.
            </div>
        `;

    }

}