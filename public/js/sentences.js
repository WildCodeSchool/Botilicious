// duplicate sentence : placer la phrase cliquée dans l'input près du bouton 'Ajouter'
function DuplicateSentence() {
  const clickedButtonId = $(this).attr('id').substr(9);
  console.log('duplicate:', clickedButtonId);
  const selectedSentence = $(`#sentencetext${clickedButtonId}`)[0].firstChild.data;
  // console.log(selectedSentence);
  $('#sentence').val(selectedSentence);

  const selectednext = $(`#sentencenext${clickedButtonId}`)[0].textContent;
  console.log(selectednext);
  $('#sentenceInputNext').val(selectednext);
}


// delete sur une phrase : requête http en delete, puis effacer la ligne du tableau dans la page
function DeleteSentence() {
  const clickedButtonId = $(this).attr('id').substr(14);
  console.log(clickedButtonId);
  $.ajax({
    url: '/admin/sentence',
    method: 'DELETE',
    data: { id: clickedButtonId },
  })
    .done(() => {
      console.log('to delete: ', clickedButtonId);
      // console.log(msg);
      $(`#sentence${clickedButtonId}`).remove();
    })
    .fail(() => {
      console.log('not deleted: there was an error');
    });
}


// get all tags (or only one with ?id=x)
function GetTags(TagId) {
  // return new Promise(((resolve, reject) => {
  return new Promise(((resolve) => {
    let myquery;
    TagId ? myquery = `?id=${TagId}` : myquery = '';

    $.get(`/admin/tag${myquery}`)
      .done((data) => {
      // console.log(data);
      // console.log($('#KeywordTag').html());
        resolve(data);
      });
  }));
}


// get all keywords (or only one with ?id=x
function GetKeywords(KeywordId) {
  // return new Promise(((resolve, reject) => {
  return new Promise(((resolve) => {
    let myquery;
    KeywordId ? myquery = `?id=${KeywordId}` : myquery = '';
    console.log('myquery: ', myquery);

    $.get(`/admin/keyword${myquery}`)
      .done((data) => {
        console.log('Keyword: ', data);
        // console.log($('#KeywordTag').html());
        resolve(data);
      });
  }));
}


// générer la liste de mots dans la div "Ici tags de mots"
function StartTagging() {
  // trouver l'id de la phrase cliquée
  const clickedButtonId = $(this).attr('id').substr(3);
  console.log('Tag des mots listés : phrase ', clickedButtonId);

  // const selectedSentence = $(`#sentencetext${clickedButtonId}`)[0].firstChild.data.split(' ');
  // phrase sélectionnée
  const selectedSentence = $(`#sentencetext${clickedButtonId}`)[0].firstChild.data;
  // console.log('selectedSentence: ', selectedSentence);
  // console.log({ sentence: selectedSentence });
  // console.log($('#sentencetag').html());

  Promise.all([$.ajax({
    method: 'POST',
    url: '/admin/sentenceAutotag',
    data: { sentence: selectedSentence },
    // processData : false,
    // contentType: 'application/json; charset=utf-8',
    dataType: 'json',
  }), GetTags()])
    .then((results) => {
      // console.log('results: ', results);
      // const arraySentence = results[0].sentence.split(' ');
      // console.log('arraySentence: ', arraySentence);
      const sentenceToTag = results[0].array;
      console.log('sentenceToTag: ', sentenceToTag);
      // changer le texte du bouton
      $('#sentencetag').html(`Tag des mots listés : phrase ${clickedButtonId}`);

      // effacer le contenu de la div "Ici tags de mots"
      $('#wordsToTag').children().remove();

      // Boucler sur la liste de mots
      for (let i = 0; i < sentenceToTag.length; i += 1) {
        // add a line for each word
        $('#wordsToTag').append(`<tr><td id="word${i}">${sentenceToTag[i]}<td><select id="select${i}"><option value="">(aucun)</option></select></td></tr>`);

        // boucler sur les tags
        for (let j = 0; j < results[1].Tags.length; j += 1) {
          // console.log(data.Tags[j]);
          $(`#select${i}`).append(`<option value="${results[1].Tags[j].id}">${results[1].Tags[j].text}</option>`);
        }

        // console.log('results[0].pattern[i]: ', results[0].pattern[i]);
        const currentTag = results[1].Tags.find(tag => `<${tag.text}>` === results[0].pattern[i]);
        console.log('currentTag: ', currentTag);
        if (typeof currentTag !== 'undefined') {
          $(`#select${i}`).val(currentTag.id);
        }
      }
    })
    .catch(error => console.log(error));
}

// Add a sentence
$('#addSentence').click(() => {
  $.post(
    '/admin/sentence',
    {
      text: $('#sentence').val(),
      type: $('#sentenceType').val(),
      next: $('#sentenceInputNext').val(),
    },
    (data, status) => {
      console.log(data);
      if (!data.error) {
        $('#sentence').val('');
        $('#sentencenext').val('');
        $('#servermessage').empty();
        $('#sentences').append(`<tr id="sentence${data.sentence.id}"><td id="sentencetext${data.sentence.id}">${data.sentence.text}</td><td>${data.sentence.type}</td><td>${data.sentence.id}</td><td>${data.sentence.next}</td><td><button id=delete${data.sentence.id}>Supprimer</button><button id=duplicate${data.sentence.id}>Dupliquer</button><button id="tag${data.sentence.id}">Tag sur les mots</button></td></tr>`);
        // $("#sentences").on("click", "#tag", StartTagging);
        $(`#deletesentence${data.sentence.id}`).click(DeleteSentence);
        $(`#duplicate${data.sentence.id}`).click(DuplicateSentence);
        $(`#tag${data.sentence.id}`).click(StartTagging);
        console.log('');
      } else {
        // $('#servermessage').text(data.serverMessage);
        $('#servermessage').empty();
        $('#servermessage').append(data.serverMessage).append(`. Connection status: ${status}`);
      }
    },
  );
});


// Delete a sentence
$("button[id^='deletesentence']").click(DeleteSentence);


// Duplicate a sentence
$("button[id^='duplicate']").click(DuplicateSentence);


// Start tagging words in a sentence
$("button[id^='tag']").click(StartTagging);

// Post the list of tags
$("button[id^='sentencetag']").click(() => {
  // console.log('tagging');
  // const clickedButtonId = $(this)[0].innerHTML.substr(29);
  // console.log(clickedButtonId);

  // console.log($('#wordsToTag'));
  const mykeywords = [];
  const wordsToTag = $('#wordsToTag').children();
  // console.log(wordsToTag.children[0].children[0].innerHTML);

  // let counter = 0;
  for (let i = 0; i < wordsToTag.length; i += 1) {
    // if ($('#select'+i).val().length > 0){

    // mykeywords[counter] =
    // {
    //   'text' : $('#word'+i).html(),
    //   'TagId' : $('#select'+i).val()
    // };
    // counter++;
    mykeywords.push({
      text: $(`#word${i}`).html(),
      TagId: $(`#select${i}`).val(),
    });
    // }
  }

  // console.log('mykeywords: ', mykeywords);
  // let datatopost = {tags : [{word:'test1',tag:'time'},{word:'toto1',tag:'place'}]};

  if (mykeywords.length > 0) {
    const datatopost = JSON.stringify({ keywords: mykeywords });
    // let datatopost = {tags : mykeywords};
    console.log(datatopost);
    $.ajax({
      method: 'POST',
      url: '/admin/keyword',
      data: datatopost,
      // processData : false,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    })
      .done((data) => {
        console.log('data: ', data);

        // refresh, to be deleted later
        // location.reload();
        this.reload();
      });
    //
    // $.post('/admin/keyword', datatopost, function(resdata, status){
    //   console.log(resdata, status);
    //   if (!resdata.error){
    //     // $('#sentence').val('');
    //     // $('#servermessage').empty();
    //     // $('#sentences').append('<tr><td id="sentence'+data.sentence.id+'">'+data.sentence.text.text+'</td><td>'+data.sentence.text.type+'</td><td>'+data.sentence.id+'</td><td><button id=delete'+data.sentence.id+'>Delete</button><button id=modify'+data.sentence.id+'>Duplicate</button><button id="tag">Tag words</button></td></tr>');
    //     // console.log("tag"+data.sentence.id);
    //   } else {
    //     // $('#servermessage').text(data.serverMessage);
    //     // $('#servermessage').append(data.serverMessage).append('. Connection status: '+status);
    //   }
    // });
  }
});
