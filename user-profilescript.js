document.addEventListener("DOMContentLoaded", function() {
    const editButton = document.getElementById("editButton");
    const editForm = document.getElementById("editForm");

    editButton.addEventListener("click", function() {
        if (editForm.style.display === "none") {
            editForm.style.display = "block";
        } else {
            editForm.style.display = "none";
        }
    });
});
