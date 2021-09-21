const updatePost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title-updatePost").value.trim();
  const content = document.querySelector("#content-updatePost").value.trim();

  if (title && content) {
    const response = await fetch("/api/posts/", {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "applications/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
      console.log("You sucessfully submitted you update!");
    } else {
      alert("Failed to submit your update!");
    }
  }
};

document
  .querySelector(".updatePost-form")
  .addEventListener("submit", updatePost);
