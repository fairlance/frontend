$(document).ready(function () {
  var input = $('input');
  var submitEmail = function () {
    var obj = {
      'email': input.val()
    };
    var urlElements = window.location.href.split('/');
    var url = urlElements[0] + '//' + urlElements[2].split(':')[0] + ':3000/register';
    $.post(url, obj)
      .done(function () {
        input.attr('placeholder', 'Thank you!');
        input.removeClass('error');
      })
      .fail(function (data) {
        console.log(data);
        input.addClass('error');
        input.attr('placeholder', data.responseJSON.error);
      });
  };
  $('.btn').click(function () {
    submitEmail();
    input.val('');
  });
  input.keypress(function (e) {
    if (e.which == 13) {
      submitEmail();
      input.val('');
      return false;
    }
  });
});