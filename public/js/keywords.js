/* delete sur une phrase : requête http en delete, puis effacer la ligne
du tableau dans la page */
function DeleteKeyword() {
  // console.log('event :', button);
  // let clickedButtonId = button.id.substr(13);
  console.log(this);
  const clickedButtonId = $(this).attr('id').substr(13);
  console.log(clickedButtonId);
  $.ajax({
    url: '/admin/keyword',
    method: 'DELETE',
    data: { id: clickedButtonId },
  })
    .done(() => {
      console.log('to delete: ', clickedButtonId);
      // console.log(msg);
      $(`#keyword${clickedButtonId}`).remove();
    })
    .fail(() => {
      console.log('not deleted: there was an error');
    });
}


// get all tags (or only one with ?id=x)
function GetTags(TagId) {
  return new Promise(((resolve, reject) => {
    let myquery;
    TagId ? myquery = `?id=${TagId}` : myquery = '';

    $.get(`/admin/tag${myquery}`)
      .done((data) => {
      // console.log(data);
      // console.log($('#KeywordTag').html());
        resolve(data);
      });
  }));
}

$('#keyword').focus(() =>
  GetTags().then((data) => {
    $('#KeywordTag').empty();
    // console.log(data);
    for (let i = 0; i < data.Tags.length; i++) {
    // console.log(data.Tags[i]);
      $('#KeywordTag').append(`<option value="${data.Tags[i].id}">${data.Tags[i].text}</option>`);
    }
  }));


// Add a keyword
$('#addkeyword').click(() => {
  const datatopost = JSON.stringify({
    keywords: [
      {
        text: $('#keyword').val(),
        TagId: $('#KeywordTag').val(),
      },
    ],
  });
  $.ajax({
    method: 'POST',
    url: '/admin/keyword',
    data: datatopost,
    // processData : false,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
  })
    .done((data, status) => {
      console.log('data: ', data);
      console.log('status: ', status);

      // refresh, to be deleted later
      // location.reload();

      $('#servermessagekeyword').empty();
      if (!data.error) {
        $('#servermessagekeyword').text(data.message);
        // console.log('data.keywords[0].TagId :', data.keywords[0].TagId);
        // GetTags(data.keywords[0].TagId).then((mytag) => {
        //   console.log('mytag: ', mytag);
        //   $('#keyword').val('');
        //   $('#keywords').append(`<tr id="keyword${data.keywords[0].id}"><td id="keywordtext${data.keywords[0].id}">${data.keywords[0].text}</td><input value=${data.keywords[0].TagId} type="hidden"><td>${mytag.Tags[0].text}</td><td><button id=deletekeyword${data.keywords[0].id}>Supprimer</button></td></tr>`);
        //
        //   // Add an event listener to the new button. With an Event Delegation
        //   $('#keywords').on('click', `#deletekeyword${data.keywords[0].id}`, DeleteKeyword);
        // });
      } else {
        $('#servermessagekeyword').text(`${data.message}. Connection status: ${status}`);
      }
      // refresh, to be deleted later
      location.reload();
    });
});

// Delete a keyword
$("button[id^='deletekeyword']").click(DeleteKeyword);
