//takes user input data and searches for it in database
const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  // checks if exists
  if (username && password) {
    const response = await fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    //if true "/post" in url home page post feed
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
};

//take user input data and search for post in database
const signupFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  const firstname = document.querySelector("#firstName-signup").value.trim();
  const lastname = document.querySelector("#lastName-signup").value.trim();

  if (email && username && password && firstname && lastname) {
    const response = await fetch("/users/", {
      method: "POST",
      body: JSON.stringify({
        email,
        username,
        password,
        firstname,
        lastname,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
      console.log("You sucessfully logged in!");
    } else {
      alert("Failed to sign up.");
    }
  }
};

//add event listeners to browser buttons
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
