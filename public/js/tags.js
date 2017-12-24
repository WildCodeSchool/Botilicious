// delete sur une phrase : requête http en delete, puis effacer la ligne du tableau dans la page
function DeleteTag(){
  let clickedButtonId = $(this).attr('id').substr(9);
  console.log(clickedButtonId);
  $.ajax({
    url: "/admin/tag",
    method: "DELETE",
    data: {id : clickedButtonId},
  })
  .done(function(){
    console.log('to delete: ', clickedButtonId);
    // console.log(msg);
    $('#tag'+clickedButtonId).remove();
  })
  .fail(function(){
    console.log('not deleted: there was an error');
  });
};

// List the keywords associated to a tag
function ListKeywords(){
  console.log('Listing the keywords associated to a tag');
  // $.ajax({
  //   url: "/admin/tagkeywordassociations",
  //   method: "DELETE",
  //   data: {id : clickedButtonId},
  // })
  // .done(function(){
  //   console.log('to delete: ', clickedButtonId);
  //   // console.log(msg);
  //   $('#tag'+clickedButtonId).remove();
  // })
  // .fail(function(){
  //   console.log('not deleted: there was an error');
  // });

}


// Add a tag
$('#addtag').click(function(){
  $.post('/admin/tag',
  {
    text : $('#tag').val()
  },
  function(data, status){
    console.log(data);
    if (!data.error){
      $('#tag').val('');
      $('#servermessagetag').empty();
      $('#tags').append('<tr id="tag'+data.tags.id+'"><td id="tagtext'+data.tags.id+'">'+data.tags.text+'</td><td>'+data.tags.id+'</td><td><button id=deletetag'+data.tags.id+'>Supprimer</button><button id="listkeywords'+data.tags.id+'">Liste des mots-clés</button></td></tr>');
      $('#deletetag'+data.tags.id).click(DeleteTag);
      $('#listkeywords'+data.tags.id).click(ListKeywords);
      console.log('');
    } else {
      $('#servermessagetag').append(data.serverMessageTag).append('. Connection status: '+status);
    }
  });
});

// Delete a tag
$("button[id^='deletetag']").click(DeleteTag);
