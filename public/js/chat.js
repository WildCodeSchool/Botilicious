document.onreadystatechange = function () {
  document.getElementById("parler").onclick = postamessage;
  function postamessage(event){
    // event.preventDefault();
    let message = "message="+document.getElementById("message").value;
    // console.log(message);

    var xhr = new XMLHttpRequest();
    xhr.open("post","/main/postamessage", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // console.log(xhr);

    xhr.onreadystatechange = function() {
      console.log("test reponse xhr");
      if (xhr.readyState == 4 && xhr.status == 200) {
        // Typical action to be performed when the document is ready:
        console.log(xhr);
        console.log(xhr.responseText);
        document.getElementById('chatwindow').innerHTML = '<p>Chatbot: ' + xhr.responseText + '</p><p>User: ' + document.getElementById("message").value + '</p>' + document.getElementById('chatwindow').innerHTML;
        // var response = JSON.parse(xhr.responseText);
        // console.log('response.list[0] : ', response.list[0]);
      } else {
        console.log("Statut de la réponse: %d (%s)", xhr.status, xhr.statusText);
      }
    }
    console.log(message);
    xhr.send(message);

  }
}
