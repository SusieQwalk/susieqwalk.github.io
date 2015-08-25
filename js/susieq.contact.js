function setupForm() {
  var contactUrl = 'http://susieqwalk.herokuapp.com/send_email',
      form = $('#contact-form'),
      notice = form.find('#notice');

  if (form.length) {

    form.submit(function(ev){
      ev.preventDefault();

      $.ajax({
        type: 'POST',
        url: contactUrl,
        data: form.serialize(),
        dataType: 'json',
        success: function(response) {
          switch (response.message) {
            case 'success':
              form.html('<p class="success">' + form.data('success') + '</p>');
              break;

            case 'failure_captcha':
            case 'failure_email':
              form.append($('<p class="error">' + form.data('error') + '</p>'));
              break;
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          notice.text(notice.data('error')).fadeIn();
        }
      });
    });
  }
}

$(setupForm);
