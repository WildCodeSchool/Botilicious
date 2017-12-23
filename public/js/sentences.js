// duplicate sentence : placer la phrase cliquée dans l'input près du bouton 'Ajouter'
function DuplicateSentence(){
  let clickedButtonId = $(this).attr('id').substr(9);
  console.log('duplicate:', clickedButtonId);
  let selectedSentence = $('#sentencetext'+clickedButtonId)[0].firstChild.data;
  // console.log(selectedSentence);
  $('#sentence').val(selectedSentence);
}



// delete sur une phrase : requête http en delete, puis effacer la ligne du tableau dans la page
function DeleteSentence(){
  let clickedButtonId = $(this).attr('id').substr(14);
  console.log(clickedButtonId);
  $.ajax({
    url: "/admin/sentence",
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
};

// générer la liste de mots dans la div "Ici tags de mots"
function StartTagging(){

  // trouver l'id de la phrase cliquée
  let clickedButtonId = $(this).attr('id').substr(3);
  console.log('Tag des mots listés : phrase ', clickedButtonId);

  // split de la phrase sélectionnée
  let selectedSentence = $('#sentencetext'+clickedButtonId)[0].firstChild.data.split(' ');
  console.log(selectedSentence);
  // console.log($('#sentencetag').html());

  // get pour obtenir la liste des tags
  $.get('/admin/tag', function(data){
    console.log(data);
    // $('#wordsToTag').empty();

    //changer le texte du bouton
    $('#sentencetag').html('Tag des mots listés : phrase '+clickedButtonId);
    // $('#wordsToTag').html('<tr><th>Mot</th><th>Tag</th></tr>');

    // effacer le contenu de la div "Ici tags de mots"
    $('#wordsToTag').children().remove();

    // Boucler sur la liste de mots
    for (let i = 0; i < selectedSentence.length; i++) {

      // boucler sur les tags
      $('#wordsToTag').append('<tr><td id="word'+i+'">'+selectedSentence[i]+'<td><select id="select'+i+'"><option value="">""</option></select></td></tr>');
      for (let j = 0; j < data.Tags.length; j++) {
        // console.log(data.tags[j]);
        $('#select'+i).append('<option value="'+data.Tags[j].text+'">'+data.Tags[j].text+'</option>')
      }
    };
  });
  // }
  // selectedSentence.map( word => $('#wordsToTag').append('<tr><td>'+word+'</td><td><select><option value="'+'tag1'+'">'+'Tag1'+'</option></select></td></tr>'))
};

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
      $('#sentences').append('<tr id="sentence'+data.sentence.id+'"><td id="sentencetext'+data.sentence.id+'">'+data.sentence.text+'</td><td>'+data.sentence.type+'</td><td>'+data.sentence.id+'</td><td><button id=delete'+data.sentence.id+'>Supprimer</button><button id=duplicate'+data.sentence.id+'>Dupliquer</button><button id="tag'+data.sentence.id+'">Tag sur les mots</button></td></tr>');
      // $("#sentences").on("click", "#tag", StartTagging);
      $('#deletesentence'+data.sentence.id).click(DeleteSentence);
      $('#duplicate'+data.sentence.id).click(DuplicateSentence);
      $('#tag'+data.sentence.id).click(StartTagging);
      console.log('');
    } else {
      // $('#servermessage').text(data.serverMessage);
      $('#servermessage').append(data.serverMessage).append('. Connection status: '+status);
    }
  });
});


// Delete a sentence
$("button[id^='deletesentence']").click(DeleteSentence);


// Duplicate a sentence
$("button[id^='duplicate']").click(DuplicateSentence);


// Start tagging words in a sentence
$("button[id^='tag']").click(StartTagging);

// Post the list of tags
$("button[id^='sentencetag']").click(function(){

  // console.log('tagging');
  let clickedButtonId = $(this)[0].innerHTML.substr(29);
  console.log(clickedButtonId);

  // let word = $('#word0').html();
  // let select = $('#select0').val();
  // console.log(word);
  // let mytags = [];
  // let mytags = {'word0':'tag0', 'word1':'tag1'}
  // let mytags = [
  //   {
  //     word: 'word1',
  //     keyword: 'tag1'
  //   },
  //   {
  //     word: 'word2',
  //     keyword: 'tag2'
  //   }
  // ];

  // let word;

  // console.log($('#wordsToTag'));
  let mytags = [];
  let wordsToTag = $('#wordsToTag').children();
  // console.log(wordsToTag.children[0].children[0].innerHTML);
  // console.log($('#word0').html());

  for (let i = 0; i < wordsToTag.length; i++) {
    // console.log(mytags);
    // mytags[i] =
    // {
    //   'word'+i : $('#word'+i).html(),
    //   'keyword'+i : $('#select'+i).val()
    // };
    if ($('#select'+i).val()){
      mytags[i] = {'word  ' : $('#word'+i).html(), 'keyword' : $('#select'+i).val()};
    }
  }

  console.log('mytags: ', mytags);
  let datatopost = {'tags': mytags};

  if (mytags.length > 0){
    $.ajax(
      {
        type: "POST",
        url: '/admin/tag',
        data: datatopost,
        dataType: "json"
      }
    )
    .done(function(){
      console.log('browser: data sent')
    });
  }
  //
  // $.post('/admin/keyword', datatopost, function(resdata, status){
  //   console.log(resdata, status);
  //   if (!resdata.error){
  //     // $('#sentence').val('');
  //     // $('#servermessage').empty();
  //     // $('#sentences').append('<tr><td id="sentence'+data.sentence.id+'">'+data.sentence.text+'</td><td>'+data.sentence.type+'</td><td>'+data.sentence.id+'</td><td><button id=delete'+data.sentence.id+'>Delete</button><button id=modify'+data.sentence.id+'>Duplicate</button><button id="tag">Tag words</button></td></tr>');
  //     // console.log("tag"+data.sentence.id);
  //   } else {
  //     // $('#servermessage').text(data.serverMessage);
  //     // $('#servermessage').append(data.serverMessage).append('. Connection status: '+status);
  //   }
  // });

});
