// delete sur une phrase : requête http en delete, puis effacer la ligne du tableau dans la page
function DeleteKeyword(){
  let clickedButtonId = $(this).attr('id').substr(13);
  console.log(clickedButtonId);
  $.ajax({
    url: "/admin/keyword",
    method: "DELETE",
    data: {id : clickedButtonId},
  })
  .done(function(){
    console.log('to delete: ', clickedButtonId);
    // console.log(msg);
    $('#keyword'+clickedButtonId).remove();
  })
  .fail(function(){
    console.log('not deleted: there was an error');
  });
};

$('#keyword').focus(function(){
  $.get('/admin/tag', function(data){
    // console.log(data);
    // console.log($('#KeywordTag').html());
    $('#KeywordTag').empty();
    for (let i = 0; i < data.Tags.length; i++) {
      // console.log(data.tags[j]);
      $('#KeywordTag').append('<option value="'+data.Tags[i].text+'">'+data.Tags[i].text+'</option>')
    }
  });
});


// Add a keyword
$('#addkeyword').click(function(){
  $.post('/admin/keyword',
  {
    text : $('#keyword').val()
  },
  function(data, status){
    console.log(data);
    if (!data.error){
      $('#keyword').val('');
      $('#servermessagekeyword').empty();
      $('#keywords').append('<tr id="keyword'+data.keywords.id+'"><td id="keywordtext'+data.keywords.id+'">'+data.keywords.text+'</td><td>'+data.keywords.idTag+'</td><td>'+data.keywords.id+'</td><td><button id=deletekeyword'+data.keywords.id+'>Supprimer</button></td></tr>');
      $('#deletekeyword'+data.keywords.id).click(DeleteKeyword);
      $('#listkeywords'+data.keywords.id).click(ListKeywords);
      console.log('');
    } else {
      $('#servermessagekeyword').append(data.serverMessageKeyword).append('. Connection status: '+status);
    }
  });
});

// Delete a keyword
$("button[id^='deletekeyword']").click(DeleteKeyword);
