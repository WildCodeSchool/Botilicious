// Add a sentence
$('#addSentence').click(function(){
  $.post('/admin/postasentence',
  {
    sentence : $('#sentence').val(),
    type : $('#sentenceType').val()
  },
  function(data, status){
    console.log(data);
    if (!data.error){
      $('#sentence').val('');
      $('#servermessage').empty();
      $('#sentences').append('<tr><td id="sentence'+data.sentence.id+'">'+data.sentence.text+'</td><td>'+data.sentence.type+'</td><td>'+data.sentence.id+'</td><td><button id=delete'+data.sentence.id+'>Delete</button><button id=modify'+data.sentence.id+'>Duplicate</button><button id=tag'+data.sentence.id+'>Tag words</button></td></tr>');
    } else {
      // $('#servermessage').text(data.serverMessage);
      $('#servermessage').append(data.serverMessage).append('. Connection status: '+status);
    }
  });
});


// Delete a sentence
$("button[id^='delete']").click(function(){
  // console.log('bobo');
  let clickedButtonId = $(this).attr('id').substr(6);
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


// Duplicate a sentence
$("button[id^='duplicate']").click(function(){
  let clickedButtonId = $(this).attr('id').substr(9);
  console.log('duplicate:', clickedButtonId);
  let selectedSentence = $('#sentencetext'+clickedButtonId)[0].firstChild.data;
  // console.log(selectedSentence);
  $('#sentence').val(selectedSentence);
});


// Tag words in a sentence
$("button[id^='tag']").click(function(){
  let clickedButtonId = $(this).attr('id').substr(3);
  console.log('tag words in sentence #:', clickedButtonId);
  // splitted
  let selectedSentence = $('#sentencetext'+clickedButtonId)[0].firstChild.data.split(' ');
  console.log(selectedSentence);
  $.get('/admin/tags', function(data){
    // $('#wordsToTag').empty();
    $('#tagsentence').append(' #: '+clickedButtonId);
    $('#wordsToTag').html('<tr><th>Mot</th><th>Tag</th></tr>');
    for (let i = 0; i < selectedSentence.length; i++) {
      $('#wordsToTag').append('<tr id="word'+i+'"><td>'+selectedSentence[i]+'<td><select id="select'+i+'"><option value="">""</option></select></td></tr>');
      for (let j = 0; j < data.tags.length; j++) {
        // console.log(data.tags[j]);
        $('#select'+i).append('<option value="'+data.tags[j].name+'">'+data.tags[j].name+'</option>')
      }
    };
  });
  // }
  // selectedSentence.map( word => $('#wordsToTag').append('<tr><td>'+word+'</td><td><select><option value="'+'tag1'+'">'+'Tag1'+'</option></select></td></tr>'))
});

$('#sentencetag').click(function(){
  console.log('toto');
  let clickedButtonId = $(this).text();
  console.log(clickedButtonId);
  //
  // $.post('/admin/tagSentence',
  // {
  //   sentence : $('#sentence').val(),
  //   type : $('#sentenceType').val()
  // },
  // function(data, status){
  //   console.log(data);
  //   if (!data.error){
  //     $('#sentence').val('');
  //     $('#servermessage').empty();
  //     $('#sentences').append('<tr><td id="sentence'+data.sentence.id+'">'+data.sentence.text+'</td><td>'+data.sentence.type+'</td><td>'+data.sentence.id+'</td><td><button id=delete'+data.sentence.id+'>Delete</button><button id=modify'+data.sentence.id+'>Duplicate</button><button id=tag'+data.sentence.id+'>Tag words</button></td></tr>');
  //   } else {
  //     // $('#servermessage').text(data.serverMessage);
  //     $('#servermessage').append(data.serverMessage).append('. Connection status: '+status);
  //   }
  // });

});
