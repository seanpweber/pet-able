const createAccount = async(event) => {
    event.preventDefault();
    console.log("testing")
    const name = document.querySelector("#name-login").value.trim();
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
    console.log(name, email, password)
    if (name && email && password){
        const response = await fetch("/api/user/", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" }
        });
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Failed to create account.");
        }
    }
};
document.querySelector("#signUpUser").addEventListener("click", createAccount);