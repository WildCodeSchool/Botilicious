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

function postKeywords() {
  // console.log('tagging');

  const clickedButtonId = $(this).attr('id').substr(11);
  // const clickedButtonId = $(this).attr('id');
  console.log(clickedButtonId);

  const mykeywords = [];
  const wordsToTag = $(`#wordsToTag${clickedButtonId}`).children();
  console.log(wordsToTag[0].children.length);

  for (let i = 0; i < wordsToTag[0].children.length - 1; i += 1) {
    mykeywords.push({
      text: $(`#word${clickedButtonId}-${i}`).html(),
      TagId: $(`#select${clickedButtonId}-${i}`).val(),
    });
  }

  // console.log('mykeywords: ', mykeywords);
  // let datatopost = {tags : [{word:'test1',tag:'time'},{word:'toto1',tag:'place'}]};

  if (mykeywords.length > 0) {
    const datatopost = JSON.stringify({ keywords: mykeywords });
    // let datatopost = {keywords : mykeywords};
    console.log(datatopost);
    $.ajax({
      method: 'POST',
      url: '/admin/keyword',
      data: datatopost,
      // processData : false,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    })
      .done((resdata, status) => {
        console.log('data: ', resdata);

        if (!resdata.error) {
          $('#serverMessageSentenceTagging').text(resdata.message);
          // $('#wordsToTag > tbody').remove();
          $('#wordsToTag').children().remove();
          // $('#keywords').append(`<tr><td id="keyword${keyword.id}">${keyword.text.text}</td><td>${keyword.text.type}</td><td>${keyword.id}</td><td><button id=delete${keyword.id}>Delete</button><button id=modify${keyword.id}>Duplicate</button><button id="tag">Tag words</button></td></tr>`);
        } else {
          $('#serverMessageSentenceTagging').text(`${resdata.error}. Connection status: ${status}`);
        }
        // refresh, to be deleted later
        location.reload();
      });
  }
}


function Autotag(sentence) {
  const promise = new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: '/admin/sentenceAutotag',
      data: { sentence },
      // processData : false,
      // contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    })
      .done(res => resolve(res));
  });
  return promise;
}

// générer la liste de mots dans la div "Ici tags de mots"
function StartTagging() {
  $('#serverMessageSentenceTagging').empty();
  // trouver l'id de la phrase cliquée
  const clickedButtonId = $(this).attr('id').substr(3);
  console.log('Tag des mots listés : phrase ', clickedButtonId);

  // phrase sélectionnée
  const selectedSentence = $(`#sentencetext${clickedButtonId}`)[0].firstChild.data;
  // console.log('selectedSentence: ', selectedSentence);
  // console.log({ sentence: selectedSentence });
  // console.log($('#sentencetag').html());

  Promise.all([Autotag(selectedSentence), GetTags()])
    .then((results) => {
      console.log('results: ', results);

      let sentenceToTag;

      // effacer le contenu de la div "Ici tags de mots"
      $('#wordsToTag').children().remove();

      results[0].asAnArray.map((pattern, index) => {
        sentenceToTag = pattern;
        console.log('sentenceToTag: ', sentenceToTag);

        let currentWord;
        let currentTag;

        $('#wordsToTag').append(`<div id="pattern${index}">
        <button id="sentencetag${index}">Tag des mots listés</button>
        <div id="serverMessageSentenceTagging${index}"></div>
        <table id="wordsToTag${index}" style="width:400px;border:1px solid black;"><tr id="headers"><th>Mot</th>
        <th>Tag</th>
        </tr>
        </table>
        </div>
        <br>
        <br>`);

        // changer le texte du bouton
        $(`#sentencetag${index}`).html(`Tag des mots listés : phrase ${clickedButtonId} - pattern ${index}`);
        $(`#sentencetag${index}`).click(postKeywords);

        // Boucler sur la liste de mots
        for (let i = 0; i < sentenceToTag.length; i += 1) {
        // add a line for each word
          $(`#wordsToTag${index}`).append(`<tr><td id="word${index}-${i}">${sentenceToTag[i]}<td><select id="select${index}-${i}"><option value="">(aucun)</option></select></td></tr>`);

          // boucler sur les tags
          for (let j = 0; j < results[1].Tags.length; j += 1) {
          // console.log(data.Tags[j]);
            $(`#select${index}-${i}`).append(`<option value="${results[1].Tags[j].id}">${results[1].Tags[j].text}</option>`);
          }

          // le mot en cours
          currentWord = results[0].asAnArray[index][i];
          // console.log('currentWord: ', currentWord);
          // trouver ce mot en cours dans la liste des keywords
          currentTag = results[0].foundKeywords.find(keyword => keyword.text === currentWord);
          // console.log('currentTag: ', currentTag);
          // si le mot est trouvé, sélectionner la bonne option dans le select en html
          if (typeof currentTag !== 'undefined') {
            $(`#select${index}-${i}`).val(currentTag.TagId);
          }
        }
        return null;
      });
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
        $('#sentenceInputNext').val('');
        $('#servermessage').empty();
        $('#sentences').append(`<tr id="sentence${data.sentence.id}"><td id="sentencetext${data.sentence.id}"></td><td>${data.sentence.type}</td><td>${data.sentence.id}</td><td id="sentencenext${data.sentence.id}">${data.sentence.next}</td><td><button id=deletesentence${data.sentence.id}>Supprimer</button><button id=duplicate${data.sentence.id}>Dupliquer</button><button id="tag${data.sentence.id}">Tag sur les mots</button></td></tr>`);
        // append du text et pas du HTML comme au-dessus
        $(`#sentencetext${data.sentence.id}`).append(document.createTextNode(data.sentence.text));
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
$("button[id^='sentencetag']").click(postKeywords);
