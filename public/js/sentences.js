$("button[name^='delete']").click(function(){
  // console.log('bobo');
  let clickedButtonId = $(this).attr('name').substr(6);
  console.log(clickedButtonId);
  $.ajax({
    url: "/admin/sentenceDelete",
    method: "DELETE",
    data: {id : clickedButtonId},
  })
  .done(function(){
    console.log('to delete: ', clickedButtonId);
    // console.log(msg);
    $('#sentence'+clickedButtonId).remove();
  })
  .fail(function(){
    console.log('not deleted: there was an error');
  });
});

$('#addSentence').click(function(){
  console.log($('#sentenceType').val());
  document.getElementById('servermessage').innerHTML = '';
  $.post('/admin/postasentence',
  {
    sentence : $('#sentence').val(),
    type : $('#sentenceType').val()
  },
  function(data, status){
    console.log(data);
    if (!data.error){
      $('#sentence').val('');
      $('#sentences').append('<tr><td id="sentence'+data.sentence.id+'">'+data.sentence.text+'</td><td>'+data.sentence.type+'</td><td>'+data.sentence.id+'</td><td><button id=delete'+data.sentence.id+'>Delete</button><button id=modify'+data.sentence.id+'>Duplicate</button> </td></tr>');
      // $('#sentences').append(JSON.stringify(data));
    } else {
      $('#servermessage').append(data.serverMessage);
    }
  });
});

$("button[name^='duplicate']").click(function(){
  let clickedButtonId = $(this).attr('name').substr(9);
  console.log('duplicate:', clickedButtonId);
  let selectedSentence = $('#sentencetext'+clickedButtonId)[0].firstChild.data;
  // console.log(selectedSentence);
  $('#sentence').val(selectedSentence);
});
