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
      $('#sentences').append('<tr id="sentence'+data.sentence.id+'"><td>'+data.sentence.text+'</td><td>'+data.sentence.type+'</td><td>'+data.sentence.id+'</td><td><button id=delete'+data.sentence.id+'>Delete</button><button id=modify'+data.sentence.id+'>Modify</button> </td></tr>');
      // $('#sentences').append(JSON.stringify(data));
    } else {
      $('#servermessage').append(data.serverMessage);
    }
  });
});
