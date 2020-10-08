
const escape = (str) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = (tweetData) => {
  const { name, avatars, handle } = tweetData.user;
  const { text } = tweetData.content;
  const dateCreated = tweetData.created_at;
  return `<article class="tweet">
            <header>
              <div>
              <img src="${avatars}"></img>
                <span>${name}</span>
                <span class="tweet-handle">${handle}</span>
              </div>
            </header>
            <section>
              <span class="tweet-text">${escape(text)}</span>
            </section>
            <footer>
              <span>${dateCreated}</span>
              </div>
            </footer>
          </article>`
 };



 const renderTweets = (tweets) => {
  $('#tweets-container').empty();
  for (const tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    $('#tweets-container').prepend(tweetElement);
  }
}
$(document).ready(() => {
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET', dataType: "json" })
    .then(function (result) {
      renderTweets(result);
    });
  }
  loadTweets();
  const $form = $('#new-tweet-area');
  const $text = $('#tweet-area');
  $form.submit((event) => {
    event.preventDefault();
    if ($text.val().length > 140) {
      $(".error").text("Your Chirp is Too Long");
      return
    } else if (!$text.val()) {
      $(".error").text("Chirp Box is Empty");
      return
    }
    $.ajax({
      url: '/tweets', 
      method: 'POST',
      data: $form.serialize(),
      success:() => {
        console.log("successful")
        loadTweets();
        $('#counter').text(140);
        $('#tweet-area').val('').focus();
      },
      error: (error) => {
        console.log(error);
      }
    })
  });
})