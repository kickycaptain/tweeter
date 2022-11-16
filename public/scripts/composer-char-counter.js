$(document).ready(function() {
    $('#tweet-text').on('input', function() {
        $(".counter").val((140 - $(this).val().length)) 
        if ($(".counter").val() < 0) {
            $(".counter").css("color", "red")
        } else if ($(".counter").val() >= 0) {
            $(".counter").css("color", "black")
        }
        // console.log($(this).siblings("output").val())
        // console.log(140 - $(this).val().length); 
    });
});