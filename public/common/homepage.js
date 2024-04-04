
$(document).ready(function() {
    $('.search-icon').click(function() {
        var searchText = $('.search-text').text();
        alert('Searching for: ' + searchText);
    });

    $('.new-thread-button').click(function() {
        alert('Start New Thread button clicked');
    });

    $('.side-menu-button').click(function() {
        var buttonText = $(this).text();
        alert(buttonText + ' button clicked');
    });
});
