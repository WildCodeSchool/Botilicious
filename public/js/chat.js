$('#parler').click(() => {
  console.log($('#message').val());
  $.post(
    '/admin/message',
    {
      message: $('#message').val(),
    },
    (data, status) => {
      console.log('data, status: ', data, status);
      // $('#chatwindow').prepend(`Weather (${data.Time} City: ${data.City} (${data.Country}) ): ${data.Weather} ${data.Temperature}°C`);
      $('#chatwindow').prepend(`Question utilisateur : ${data.text}<br>Réponse du bot: ${data.answer}<br>`);
    },
  );
});
