/* delete sur une phrase : requête http en delete, puis effacer la ligne
 du tableau dans la page */
function DeleteKeyword(){
  // console.log('event :', button);
  // let clickedButtonId = button.id.substr(13);
  console.log(this);
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


// function GetId(){
//   let mytags = GetTags();
//   return 1;
// };

function GetTags(TagId){
  return new Promise(function(resolve, reject) {
    let myquery;
    TagId ? myquery = '?id='+TagId : myquery = '';

    $.get('/admin/tag'+myquery)
    .done(data => {
      // console.log(data);
      // console.log($('#KeywordTag').html());
      resolve(data);
    })
  })
}

$('#keyword').focus(() =>
GetTags().then(data => {
  $('#KeywordTag').empty();
  // console.log(data);
  for (let i = 0; i < data.Tags.length; i++) {
    // console.log(data.Tags[i]);
    $('#KeywordTag').append('<option value="'+data.Tags[i].id+'">'+data.Tags[i].text+'</option>')
  }
})
);


// Add a keyword
$('#addkeyword').click(function(){
  $.post('/admin/keyword',
  {
    text : $('#keyword').val(),
    TagId : $('#KeywordTag').val()
  },
  function(data, status){
    // console.log(data);
    $('#servermessagekeyword').empty();
    if (!data.error){
      console.log('TagId :', data.keywords.TagId);
      GetTags(data.keywords.TagId).then(mytag => {
        console.log('mytag: ', mytag);
        $('#keyword').val('');
        $('#keywords').append('<tr id="keyword'+data.keywords.id+'"><td id="keywordtext'+data.keywords.id+'">'+data.keywords.text+'</td><input value='+data.keywords.TagId+' type="hidden"><td>'+mytag.Tags[0].text+'</td><td><button id=deletekeyword'+data.keywords.id+'>Supprimer</button></td></tr>');

        // Add an event listener to the new button. With an Event Delegation
        $('#keywords').on('click', '#deletekeyword'+data.keywords.id , DeleteKeyword);
      })
    } else {
      $('#servermessagekeyword').append(data.serverMessage).append('. Connection status: '+status);
    }
  });
});

// Delete a keyword
$("button[id^='deletekeyword']").click(DeleteKeyword);
