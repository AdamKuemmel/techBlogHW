const deleteCar = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard/myPosts");
    }
  }
};

document.querySelector("#deletebutton").addEventListener("click", deleteCar);
