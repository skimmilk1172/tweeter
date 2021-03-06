$(document).ready(function() {
//max limit of counter is 140
  const max = 140;

  $('textarea').on('input', function() {
    //using this.val.length to get the length of the text
    let size = $(this).val().length;
    //assigning length to current length depending on value of textarea
    size = max - size;

    let counter = $(this).parent().find('.counter');

    counter.text(size);

    //conditional statement to make counter above or equal to 0 black and else red
    if (size >= 0) {
      counter.removeClass('color-counter')
    } else {
      counter.addClass('color-counter')
    }
  });
});
