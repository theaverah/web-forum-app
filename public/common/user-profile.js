$(document).ready(function(){
    $('#edit-profile-btn').click(function() {
        $(".profile-panel").hide();
        $(".edit-profile-panel").show();
    });

    $('#save-profile-btn').click(function() {

        
        $(".edit-profile-panel").hide();
        $(".profile-panel").show();
    });

});
