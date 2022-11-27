/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
    //adds renders the tweets from the tweet database
    const renderTweets = function (tweets) {
        for (let tweet of tweets) {
            $("#tweets-container").prepend(createTweetElement(tweet));
        }
    };

    //creates a tweet element using the textarea input and turning it into a piece of html
    const createTweetElement = function (tweet) {
        const $tweet = $(`<article class="tweet">
      <header class="tweet-header">
        <span class="username"><img src=${tweet.user.avatars}>${tweet.user.name}</span> <span class="handle">${tweet.user.handle}</span>
      </header>
      <br>
      <p class="tweet-body">
        ${escape(tweet.content.text)}
      </p>
      <hr>
      <footer>
        ${timeago.format(tweet.created_at)} <span><i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i> <i class="fa-solid fa-heart"></i></span>
      </footer>
    </article>`);
        return $tweet;
    };
    
    //submits the form where the tweet is written to the /tweets directory with exception to if the character limit is breached
    $("form").submit(function (event) {
        event.preventDefault();
        if ($(".counter").val() < 0) {
            $("#error-msg").slideDown(400);         
        } else if ($(".counter").val() >= 140) {
            $("#error-msg").slideDown(400);     
        } else if ($(".counter").val() >= 0 && $(".counter").val() < 140) {
            $("#error-msg").slideUp(400);  
            $.ajax("/tweets", { data: $(this).serialize(), method: "POST" }) 
                .then(loadTweets());
        }
    }
    );

    //loads the tweets from /tweets and displays them with the call of loadTweets right after
    const loadTweets = function() {
        $.ajax("/tweets", { method: "GET" })
            .then(function (response) {
                renderTweets(response);
            });
    };
    loadTweets();

    //takes the input from the textarea and turns it into html to put into the createTweetElement function
    const escape = function (str) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };
});

