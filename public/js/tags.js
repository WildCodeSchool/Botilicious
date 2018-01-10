// delete sur une phrase : requête http en delete, puis effacer la ligne du tableau dans la page
function DeleteTag() {
  const clickedButtonId = $(this).attr('id').substr(9);
  console.log(clickedButtonId);
  $.ajax({
    url: '/admin/tag',
    method: 'DELETE',
    data: { id: clickedButtonId },
  })
    .done(() => {
      console.log('to delete: ', clickedButtonId);
      // console.log(msg);
      $(`#tag${clickedButtonId}`).remove();
    })
    .fail(() => {
      console.log('not deleted: there was an error');
    });
}

// List the keywords associated to a tag
function ListKeywords() {
  // console.log($(this));
  const clickedButtonId = $(this).attr('id').substr(12);

  console.log('Listing the keywords associated to the tag #: ', clickedButtonId);

  $.get(`/admin/keyword?TagId=${clickedButtonId}`)
    .done((data) => {
      $('#listkeywords').empty();
      console.log('data: ', data);
      data.Keywords.map(keyword => $('#listkeywords').append(`<tr><td>${keyword.text}</td><td>${keyword.tag}</td></tr>`));
    })
    .fail(() => {
      console.log('no list: there was an error');
    });
}


// Add a tag
$('#addtag').click(() => {
  $.post(
    '/admin/tag',
    {
      text: $('#tag').val(),
    },
    (data, status) => {
      console.log(data);
      if (!data.error) {
        $('#tag').val('');
        $('#servermessagetag').empty();
        $('#tags').append(`<tr id="tag${data.tags.id}"><td id="tagtext${data.tags.id}">${data.tags.text}</td><td>${data.tags.id}</td><td><button id=deletetag${data.tags.id}>Supprimer</button><button id="listkeywords${data.tags.id}">Liste des mots-clés</button></td></tr>`);

        // Add an event listener to the new button. With an Event Delegation
        $('#tags').on('click', `#deletetag${data.tags.id}`, DeleteTag);

        $(`#listkeywords${data.tags.id}`).click(ListKeywords);
        console.log('');
      } else {
        $('#servermessagetag').empty();
        $('#servermessagetag').append(data.serverMessageTag).append(`. Connection status: ${status}`);
      }
    },
  );
});

// Delete a tag
$("button[id^='deletetag']").click(DeleteTag);

// Get list of keywords linked to a specific tag
$("button[id^='listkeywords']").click(ListKeywords);
