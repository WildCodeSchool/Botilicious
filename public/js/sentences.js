$('#addSentence').click(function(){
  // console.log($('#message').val());
  $.post('/admin/postasentence',
  {
    sentence : $('#sentence').val(),
    type : $('#sentence option:selected').text()
  },
  function(data, status){
    // console.log(data);
    $('#sentences').append('<tr id="sentence'+data.id+'"><td>'+data.sentence+'</td><td>'+data.type+'</td><td>'+data.id+'</td><td><button id=delete'+data.id+'>Delete</button><button id=modify'+data.id+'>Modify</button> </td></tr>');
    // $('#sentences').append(JSON.stringify(data));
  });
});
