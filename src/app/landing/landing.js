
$(document).ready(function () {
  var submitEmail = function () {
    var obj = {
      'email': $('input').val()
    };
    var url = window.location.href;
    url = url.split('/')[0] + ':3000/register';
    $.post(url, obj, function (data) {
      console.log(data);
    });
  };
  $('.btn').click(function () {
   submitEmail();
  });
  $('input').keypress(function (e) {
    if (e.which == 13) {
      submitEmail();
      return false;
    }
  });
});