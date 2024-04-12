$(document).ready(function(){
    $('#edit-profile-btn').click(function() {
        console.log("Edit button clicked");
        $(".profile-panel").hide();
        $(".edit-profile-panel").show();
    });

    $('#editForm').on('submit', function(event) {
        event.preventDefault();
        console.log("Edit button clicked");
        $(".edit-profile-panel").hide();
        $(".profile-panel").show();
    });

});
