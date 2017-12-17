// générer la liste de mots dans la div "Ici tags de mots"
function StartTagging(){

  // trouver l'id de la phrase cliquée
  let clickedButtonId = $(this).attr('id').substr(3);
  console.log('tag words in sentence #:', clickedButtonId);

  // split de la phrase sélectionnée
  let selectedSentence = $('#sentencetext'+clickedButtonId)[0].firstChild.data.split(' ');
  console.log(selectedSentence);
  console.log($('#sentencetag').html());

  // get pour obtenir la liste des tags
  $.get('/admin/keyword', function(data){
    // $('#wordsToTag').empty();

    //changer le texte du bouton
    $('#sentencetag').html('Tag the sentence #: '+clickedButtonId);
    // $('#wordsToTag').html('<tr><th>Mot</th><th>Tag</th></tr>');

    // effacer le contenu de la div "Ici tags de mots"
    $('#wordsToTag').children().remove();

    // Boucler sur la liste de mots
    for (let i = 0; i < selectedSentence.length; i++) {

      //
      $('#wordsToTag').append('<tr><td id="word'+i+'">'+selectedSentence[i]+'<td><select id="select'+i+'"><option value="">""</option></select></td></tr>');
      for (let j = 0; j < data.tags.length; j++) {
        // console.log(data.tags[j]);
        $('#select'+i).append('<option value="'+data.tags[j].name+'">'+data.tags[j].name+'</option>')
      }
    };
  });
  // }
  // selectedSentence.map( word => $('#wordsToTag').append('<tr><td>'+word+'</td><td><select><option value="'+'tag1'+'">'+'Tag1'+'</option></select></td></tr>'))
}

// Add a sentence
$('#addSentence').click(function(){
  $.post('/admin/sentence',
  {
    sentence : $('#sentence').val(),
    type : $('#sentenceType').val()
  },
  function(data, status){
    console.log(data);
    if (!data.error){
      $('#sentence').val('');
      $('#servermessage').empty();
      $('#sentences').append('<tr><td id="sentencetext'+data.sentence.id+'">'+data.sentence.text+'</td><td>'+data.sentence.type+'</td><td>'+data.sentence.id+'</td><td><button id=delete'+data.sentence.id+'>Delete</button><button id=modify'+data.sentence.id+'>Duplicate</button><button id="tag'+data.sentence.id+'">Tag words</button></td></tr>');
      // $("#sentences").on("click", "#tag", StartTagging);
      $('#tag'+data.sentence.id).click(StartTagging);
      console.log('');
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
$("button[id^='tag']").click(StartTagging);

$("button[id^='sentencetag']").click(function(){

  console.log('tagging');
  let clickedButtonId = $(this)[0].innerHTML.substr(20);
  console.log(clickedButtonId);

  // let word = $('#word0').html();
  // let select = $('#select0').val();
  // console.log(word);

  let tags = {};
  let word;
  let wordsToTag = $('#wordsToTag').children();
  // console.log(wordsToTag.children[0].children[0].innerHTML);
  // console.log($('#word0').html());

  for (var i = 0; i < wordsToTag.length; i++) {
    word = $('#word'+i).html();
    console.log(word);
    tags[word] = $('#select'+i).val();
  }

  let datatopost = {
    id : clickedButtonId,
    tags : tags
  };

  $.post('/admin/keyword', datatopost, function(resdata, status){
    console.log(status);
    if (!resdata.error){
      // $('#sentence').val('');
      // $('#servermessage').empty();
      // $('#sentences').append('<tr><td id="sentence'+data.sentence.id+'">'+data.sentence.text+'</td><td>'+data.sentence.type+'</td><td>'+data.sentence.id+'</td><td><button id=delete'+data.sentence.id+'>Delete</button><button id=modify'+data.sentence.id+'>Duplicate</button><button id="tag">Tag words</button></td></tr>');
      // console.log("tag"+data.sentence.id);
    } else {
      // $('#servermessage').text(data.serverMessage);
      // $('#servermessage').append(data.serverMessage).append('. Connection status: '+status);
    }
  });

});
