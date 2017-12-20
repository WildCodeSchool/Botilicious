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


// Add a tag
$('#tagadd').click(function(){
  $.post('/admin/tags',
  {
    text : $('#tag').val()
  },
  function(data, status){
    console.log(data);
    if (!data.error){
      $('#tag').val('');
      $('#servermessagetag').empty();
      $('#tags').append('<tr id="tag'+data.tag.id+'"><td id="tagtext'+data.tag.id+'">'+data.tag.text+'</td><td>'+data.tag.type+'</td><td>'+data.tag.id+'</td><td><button id=delete'+data.tag.id+'>Delete</button><button id="listtags'+data.tag.id+'">Liste des tags</button></td></tr>');
      $('#delete'+data.tag.id).click(DeleteTag);
      $('#listtags'+data.tag.id).click(ListTags);
      console.log('');
    } else {
      $('#servermessagetag').append(data.serverMessageTag).append('. Connection status: '+status);
    }
  });
});

// Delete a tag
$("button[id^='tagdelete']").click(DeleteTag);
