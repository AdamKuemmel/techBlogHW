const newPost = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector("#title-newPost").value.trim();
  const postContent = document.querySelector("#content-newPost").value.trim();

  console.log(postTitle + postContent);

  console.log(JSON.stringify({ postTitle, postContent }));

  if (postTitle && postContent) {
    const response = await fetch("/api/posts", {
      method: "Post",
      body: JSON.stringify({ postTitle, postContent }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(response);

    if (response.ok) {
      document.location.replace("/");
      console.log("You sucessfully submitted your post!");
    } else {
      alert("Failed to submit your post!");
    }
  }
};

document.querySelector(".newPost-form").addEventListener("submit", newPost);
