$(document).ready(function(){
    $('#edit-profile-btn').click(function() {
        $(".profile-panel").hide();
        $(".edit-profile-panel").show();
    });

    $('#editForm').on('submit', function(event) {
        event.preventDefault();
        $(".edit-profile-panel").hide();
        $(".profile-panel").show();
    });

});
