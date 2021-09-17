//takes user input data and searches for it in database
const loginFormHandler = async (event) => {
  event.preventDefault();

  const userName = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  // checks if exists
  if (userName && password) {
    const response = await fetch("/", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
    });
    //if true "/post" in url home page post feed
    if (response.ok) {
      document.location.replace("/posts");
    } else {
      alert("Failed to log in.");
    }
  }
};

//take user input data and search for post in database
const signupFormHandler = async (event) => {
  event.preventDefault();

  //collect user input data from browser
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  //check if all are true
  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    //if response true "/" in url home page post feed
    if (response.ok) {
      document.location.replace("/");
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
