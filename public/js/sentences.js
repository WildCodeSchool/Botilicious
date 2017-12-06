$("#addSentence").click(function(){
  console.log($("#message").val());
  $.post("/admin/postasentence",
  {
    sentence : $("#sentence").val(),
    type : $('#sentence option:selected').text()
  },
  function(data, status){
    console.log(data);
    $('#sentences').append('<tr id="'+data.+'"><td>'+data.sentence+'</td><td>'+data.type+'</td></tr>');
    // $('#sentences').append(JSON.stringify(data));
  });
});
