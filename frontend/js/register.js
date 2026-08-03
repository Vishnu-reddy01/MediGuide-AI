// ===============================
// REGISTER
// ===============================

const registerForm = document.getElementById("registerForm");

const errorMessage = document.getElementById("errorMessage");

const successMessage = document.getElementById("successMessage");

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    errorMessage.innerText = "";
    successMessage.innerText = "";

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    // ===============================
    // VALIDATION
    // ===============================

    if (!name || !email || !password || !confirmPassword) {

        errorMessage.innerText = "Please fill all fields.";

        return;

    }

    if (password.length < 6) {

        errorMessage.innerText =
            "Password must be at least 6 characters.";

        return;

    }

    if (password !== confirmPassword) {

        errorMessage.innerText =
            "Passwords do not match.";

        return;

    }

    // ===============================
    // REGISTER API
    // ===============================

    try {

        const response = await fetch(
            "http://localhost:8080/api/auth/register",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: name,

                    email: email,

                    password: password

                })

            }
        );

        const message = await response.text();

        if (response.ok) {

            successMessage.innerText =
                "✅ Registration Successful! Redirecting...";

            setTimeout(() => {

                window.location.href = "login.html";

            }, 2000);

        } else {

            errorMessage.innerText = message;

        }

    } catch (error) {

        console.error(error);

        errorMessage.innerText =
            "Unable to connect to server.";

    }

});