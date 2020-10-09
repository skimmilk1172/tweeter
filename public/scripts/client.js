
const escape = (str) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = (tweetData) => {
  const { name, avatars, handle } = tweetData.user;
  const { text } = tweetData.content;
  const dateCreated = tweetData.created_at;
  return ` <article class="tweets">
  <header> 
    <div>
      <img src=${avatars} />
      <p>${name}</p>   
      </div>
      <p class='username'>${handle}</p>
  </header>  
  <p class="new-tweet-area"> ${escape(text)}</p>
  <footer> 
    <p>${time(dateCreated)}</p>  
    <div> 
      <p>1</p> 
      <p>2</p> 
      <p>3</p> 
    </div>
  </footer>
 </article>`
 
 };




const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet)
    $(`#section`).append($tweet)
  } 
} 
 
$(document).ready(() => {  
  loadTweets()
  $('form').on('submit', event => { 
    event.preventDefault()
    const postData = $('#tweet-area').val()
    if (isGood(postData) === true) {  
      $.ajax({
        type: 'POST', 
        url: '/tweets', 
        data: $('#tweet-area').serialize() 
      }).then(() => {
        loadTweets()
        $('form').trigger('reset')
        $('#counter').text(140)}) 
    } else if (isGood(postData) === false) {
      $('form').slideDown(() => {
        sendAlert('Your Chirp Box is Empty')
      })
    } else {
      $('form').slideDown(()=> {
        sendAlert('Your Chirp is Too Long')
      })
    }
  }) 
}) 

const sendAlert = function (errorType) {
  $('.error').text(errorType) 
  $('.error').slideDown(() => {
    setTimeout(() => {
      $('.error').slideUp(() => {
      })      
    }, 4000);
  })
}

const loadTweets = () => {
  $.ajax({
    type: 'GET', 
    url: '/tweets', 
    dataType: 'JSON'
  }).then(function (data) {
    $(`#section`).html('')
    const reverse = data.reverse() 
    renderTweets(reverse)
  })
} 

const isGood = (tweet) => {
  if (tweet.length >= 1 && tweet.length <= 140) {
    return true;
  } else if (tweet.length > 140) {
    return 'chrip too long'
  } else {
    return false;
  }
}

const time = ms => {
  const difference = Date.now() - ms;
  if (difference < 1000) {
    return "Just now";
  } else if (difference < 60000) {
    return Math.floor(difference / 1000) + " second(s)";
  } else if (difference < 360000) {
    return Math.floor(difference / 60000) + " minute(s)";
  } else if (difference < 86400000) {
    return Math.floor(difference / 360000) + " hour(s)";
  } else if (difference < 31536000000) {
    return Math.floor(difference / 86400000) + " day(s)";
  } else {
    return Math.floor(difference / 31536000000) + " year(s)";
  }
};