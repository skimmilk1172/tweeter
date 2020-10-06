$(document).ready(function() {
//max limit of counter is 140
  const max = 140;

  $('textarea').keyup(function() {
    //using this.val.length to get the length of the text
    let length = $(this).val().length;
    //assigning length to current length depending on value of textarea
    let length = max - length;

    $('.counter').text(length);

    if (length >= 0) {
      $('.counter').css( {"color": "black"})
    } else {
      $('.counter').css( {"color": "red"})
    }
  });
});