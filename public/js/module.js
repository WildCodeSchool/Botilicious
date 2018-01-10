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


function deleteParameter() {
  const clickedButtonId = $(this).attr('id').substr(15);
  console.log(clickedButtonId);
  $(`#Parameter${clickedButtonId}`).remove();
}


$('#addParameter').click((event) => {
  // console.log('click #addParameter');
  event.preventDefault();
  // console.log($('#parameters').children().children().length);
  if ($('#parameter').val().length > 0) {
    // new parameter id
    const newParameterId = $('#parameters').children().children().length;
    // Ajouter un hidden input dans le formulaire
    // input#apiUrl.form-control(placeholder="URL d'une API" name="apiUrl")
    $('#newParameters').append(`
      <input id="newParameterType${newParameterId}" name="newParameterType" type="hidden" value=${$('#parameterType').val()}>
      <input id="newParameterTag${newParameterId}" name="newParameterTag" type="hidden" value=${$('#parameterTag').val()}>
      <input id="newParameter${newParameterId}" name="newParameter" type="hidden" value=${$('#parameter').val()}>
      <input id="newParameterValue${newParameterId}" name="newParameterValue" type="hidden" value=${$('#parameterValue').val()}>
    `);
    // Ajouter une ligne dans la liste des paramètres
    $('#parameters').append(`<tr id="Parameter${newParameterId}">
    <td>${$('#parameterType').val()}</td>
    <td>${$('#parameterTag').val()}</td>
    <td>${$('#parameter').val()}</td>
    <td>${$('#parameterValue').val()}</td>
    <td><button id=deleteParameter${newParameterId}>Supprimer</button></td>
    </tr>`);

    // Add an event listener to the new button. With an Event Delegation
    $('#parameters').on('click', `#deleteParameter${newParameterId}`, deleteParameter);

    // vider les inputs
    $('#parameter').val('');
    $('#parameterValue').val('');
  }
});

// Add a module
$('#addmodule').click((event) => {
  event.preventDefault();
  if ($('#module').val().length > 0) {
    console.log($('#newParameters').children.length);
    // console.log($("[name='newParameterTag']"));
    const parameters = [];
    const fixed = [];
    for (let i = 1; i < $('#newParameters').children.length + 1; i += 1) {
      if ($(`#newParameterTag${i}`).attr('value')) {
        parameters.push({
          type: $(`#newParameterType${i}`).attr('value'),
          tag: $(`#newParameterTag${i}`).attr('value'),
          text: $(`#newParameter${i}`).val(),
        });
      }
      if ($(`#newParameterValue${i}`).val()) {
        fixed.push({
          type: $(`#newParameterType${i}`).val(),
          text: $(`#newParameter${i}`).val(),
          value: $(`#newParameterValue${i}`).val(),
        });
      }
    }

    const dataToPost = JSON.stringify({
      name: $('#module').val(),
      description: $('#description').val(),
      api: {
        url: $('#apiUrl').val(),
        parameters,
        fixed,
      },
    });
    console.log(dataToPost);
    $.ajax({
      method: 'POST',
      url: '/admin/module',
      data: dataToPost,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    })
      .done((data, status) => {
        console.log(data);
        $('#serverMessageModule').empty();
        if (!data.error) {
          $('#module').val('');
          $('#description').val('');
          $('#apiUrl').val('');
          $('#modules').append(`
            <tr id="module${data.module.id}">
            <td id="modulename${data.module.id}">${data.module.name}</td>
            <td>${data.module.id}</td>
            <td id="moduleapiurl${data.module.id}">${data.module.api.url}</td>
            <td id="moduledescription${data.module.id}">${data.module.description}</td>
            <td><button id=deletemodule${data.module.id}>Supprimer</button></td>
            </tr>`);

          // Add an event listener to the new button. With an Event Delegation
          $('#modules').on('click', `#deletemodule${data.module.id}`, DeleteModule);
        } else {
          $('#serverMessageModule').append(data.serverMessage).append(`. Connection status: ${status}`);
        }
      });
  }
});

// Delete a module
$("button[id^='deletemodule']").click(DeleteModule);
