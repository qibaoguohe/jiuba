$(document).ready(function () {
  var cho = true;
  $('.fix_cho div').click(function () {
    if (cho == true) {
      $('.fix_cho ul').fadeIn(500);
      cho = false;
    }
    else {
      $('.fix_cho ul').fadeOut(500);
      cho = true;
    }
  });
});
