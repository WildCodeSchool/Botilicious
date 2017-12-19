// générer la liste de mots dans la div "Ici tags de mots"
function StartTagging(){

  // trouver l'id de la phrase cliquée
  let clickedButtonId = $(this).attr('id').substr(3);
  console.log('Tag des mots listés : phrase ', clickedButtonId);

  // split de la phrase sélectionnée
  let selectedTag = $('#tagtext'+clickedButtonId)[0].firstChild.data.split(' ');
  console.log(selectedTag);
  console.log($('#sentencetag').html());

  // get pour obtenir la liste des tags
  $.get('/admin/tag', function(data){
    // $('#wordsToTag').empty();

    //changer le texte du bouton
    $('#tagtag').html('Tag des mots listés : phrase '+clickedButtonId);
    // $('#wordsToTag').html('<tr><th>Mot</th><th>Tag</th></tr>');

    // effacer le contenu de la div "Ici tags de mots"
    $('#wordsToTag').children().remove();

    // Boucler sur la liste de mots
    for (let i = 0; i < selectedTag.length; i++) {

      //
      $('#wordsToTag').append('<tr><td id="word'+i+'">'+selectedTag[i]+'<td><select id="select'+i+'"><option value="">""</option></select></td></tr>');
      for (let j = 0; j < data.tags.length; j++) {
        // console.log(data.tags[j]);
        $('#select'+i).append('<option value="'+data.tags[j].name+'">'+data.tags[j].name+'</option>')
      }
    };
  });
  // }
  // selectedTag.map( word => $('#wordsToTag').append('<tr><td>'+word+'</td><td><select><option value="'+'tag1'+'">'+'Tag1'+'</option></select></td></tr>'))
};



// delete sur une phrase : requête http en delete, puis effacer la ligne du tableau dans la page
function DeleteTag(){
  // console.log('bobo');
  let clickedButtonId = $(this).attr('id').substr(6);
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
      $('#listtags'+data.tag.id).click(ListKeywords);
      console.log('');
    } else {
      $('#servermessagetag').append(data.serverMessageTag).append('. Connection status: '+status);
    }
  });
});

// Delete a tag
$("button[id^='tagdelete']").click(DeleteTag);

// Start tagging words in a tag
$("button[id^='listkeywords']").click(StartTagging);
