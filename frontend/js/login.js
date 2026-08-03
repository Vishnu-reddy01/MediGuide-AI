const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:8080/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })

        });

        if (!response.ok) {

            alert("Invalid Email or Password");

            return;

        }

        const data = await response.json();

        // Save JWT Token
        localStorage.setItem("token", data.token);

        // Save email (used for scan history)
        localStorage.setItem("email", email);

        // Save display name
        if (data.name) {

            localStorage.setItem("username", data.name);

        } else {

            // Temporary fallback until backend returns name
            localStorage.setItem("username", email.split("@")[0]);

        }

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

});