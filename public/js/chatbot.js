// delete sur une phrase : requête http en delete, puis effacer la ligne du tableau dans la page
function DeleteChatbot() {
  const clickedButtonId = $(this).attr('id').substr(13);
  console.log(clickedButtonId);
  $.ajax({
    url: '/admin/chatbot',
    method: 'DELETE',
    data: { id: clickedButtonId },
  })
    .done(() => {
      console.log('to delete: ', clickedButtonId);
      // console.log(msg);
      $(`#chatbot${clickedButtonId}`).remove();
    })
    .fail(() => {
      console.log('not deleted: there was an error');
    });
}


// Add a chatbot
$('#addchatbot').click((event) => {
  event.preventDefault();
  if ($('#chatbot').val().length > 0) {
    $.post(
      '/admin/chatbot',
      {
        name: $('#chatbot').val(),
      },
      (data, status) => {
        console.log(data);
        $('#serverMessageChatbot').empty();
        if (!data.error) {
          $('#chatbot').val('');
          $('#chatbots').append(`<tr id="chatbot${data.chatbot.id}"><td id="chatbotname${data.chatbot.id}">${data.chatbot.name}</td><td>${data.chatbot.id}</td><td><button id=deletechatbot${data.chatbot.id}>Supprimer</button></td></tr>`);

          // Add an event listener to the new button. With an Event Delegation
          $('#chatbots').on('click', `#deletechatbot${data.chatbot.id}`, DeleteChatbot);
        } else {
          $('#serverMessageChatbot').append(data.serverMessageChatbot).append(`. Connection status: ${status}`);
        }
      },
    );
  }
});

// Delete a chatbot
$("button[id^='deletechatbot']").click(DeleteChatbot);
