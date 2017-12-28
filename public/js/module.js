// delete sur une phrase : requête http en delete, puis effacer la ligne du tableau dans la page
function DeleteModule() {
  const clickedButtonId = $(this).attr('id').substr(12);
  console.log(clickedButtonId);
  $.ajax({
    url: '/admin/module',
    method: 'DELETE',
    data: { id: clickedButtonId },
  })
    .done(() => {
      console.log('to delete: ', clickedButtonId);
      // console.log(msg);
      $(`#module${clickedButtonId}`).remove();
    })
    .fail(() => {
      console.log('not deleted: there was an error');
    });
}


// Add a module
$('#addmodule').click((event) => {
  event.preventDefault();
  if ($('#module').val().length > 0) {
    $.post(
      '/admin/module',
      {
        name: $('#module').val(),
        description: $('#description').val(),
        apiurl: $('#apiurl').val(),
      },
      (data, status) => {
        console.log(data);
        $('#serverMessageModule').empty();
        if (!data.error) {
          $('#module').val('');
          $('#description').val('');
          $('#apiurl').val('');
          $('#modules').append(`<tr id="module${data.module.id}"><td id="modulename${data.module.id}">${data.module.name}</td><td>${data.module.id}</td><td id="moduleapiurl${data.module.id}">${data.module.apiurl}</td><td id="moduledescription${data.module.id}">${data.module.description}</td><td><button id=deletemodule${data.module.id}>Supprimer</button></td></tr>`);

          // Add an event listener to the new button. With an Event Delegation
          $('#modules').on('click', `#deletemodule${data.module.id}`, DeleteModule);

        } else {
          $('#serverMessageModule').append(data.serverMessage).append(`. Connection status: ${status}`);
        }
      },
    );
  }
});

// Delete a module
$("button[id^='deletemodule']").click(DeleteModule);
