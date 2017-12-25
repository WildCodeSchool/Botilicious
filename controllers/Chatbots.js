const request = require('request');
const models = require("../models");

var Chatbots = {


  // route GET '/admin' -- Affichage de la page de configuration du chatbot
  index: function (req, res) {
    res.render('chatbot/chatbot');
  },

  // route GET '/admin/configchat' -- Affichage de la page de configuration du chatbot
  chatbotGet: function(req, res, next){
    let allsentences = [];
    models.Sentence
    // .findAll({raw: true})
    .findAll({})
    // query ok
    .then(results => {
      // console.log(results);
      results.map((result, i) => {
        // allsentences.push(result.dataValues);
        allsentences[i] = result.dataValues;
        // console.log('res', i, result.dataValues);
      });
      
      res.render('chatbot/chatbot', {sentences:allsentences});
    });
  },

  // Accepter les données du formulaire 'Nouveau Chatbot' ===> router.post('/configchat', configchats.configchatEnBdd);
  chatbotPost: function (req, res, next) {
    let nom = req.body.name;

    models.chatbot.create(
      {
        name: nom
      }
    );

    res.send('Nouveau bot ok');
  },

  // route GET '/chatbot/message' -- liste des messages d'une conversation
  messageGet: function (req, res, next) {
    console.log("toto");
    res.json([
      {
        id: 1,
        username: "samsepi0l"
      },
      
      {
        id: 2,
        username: "D0loresH4ze"
      }
    ]);
    
  },

  // route POST '/chatbot/message' -- soumission d'un message dans la boite de dialogue du chatbot
  messagePost: function(req, res, next) {
   console.log(req.body.message);
    // let message = req.body.message.split(' ');

     /**
     * méthode sequelize pour trouver des données de la bdd et qui retourne un model 
     * test si cest une question pour renvoyer une reponse
     */ 
    
    models.Sentence.findOne ({ 
      where : { text : req.body.message }
     })
        
     /**
      * fonction qui permet de renvoyer une seule réponse (dans le network de la console du navigateur) 
      * lorsqu'une string de type question est écrite dans le chat. Il faut utiliser un models.sentence.findOne({ })
      * models.Sentence.findOne ({ })1
      */ 
    .then(response => {
      // console.log('response',response);
      models.Sentence.findOne({
        where : { id : response.dataValues.next}
      })
      .then(answer => {
       // console.log('answer',answer)
       
       let jsontostring = {answer : answer.dataValues.text,
                           text : req.body.message}
      res.json(jsontostring)

      })
      
    }) 
//let rand = [Math.floor(Math.random()*res.length)];
       
    // let time;
    // let errorsyntaxe;
    // if (message.length == 3 && typeof(parseInt(message[2]))=== 'number' && typeof(parseInt(message[1]))=== 'number'){
    //   time = 8*message[1] + Math.round(message[2]/3);
    // } else if (message.length == 2 && typeof(parseInt(message[1]))=== 'number'){
    //   time = 8*message[1];
    // } else {
    //   time = 0;
    //   let errorsyntaxe='votre syntaxe est incorrecte';
    // }
    // if (time > 39) {
    //   time = 39;
    // }
    // console.log("time:", time);
    // if (isNaN(time)){
    //   errorsyntaxe='votre syntaxe est incorrecte';
    //   time=0;
    // }

    // request("http://api.openweathermap.org/data/2.5/forecast?q="+message[0]+"&APPID=7081077244653a5c7f8f9ab6496d6bd3", function(error, response, body){
    //   console.log(JSON.parse(response.body));

    //   let data = JSON.parse(response.body);

    //   let temp = Math.round(data.list[time].main.temp-273.15);

    //   console.log(temp);

    //   let responseapi = {Time: data.list[time].dt_txt+" ", City : data.city.name+" ", Country : data.city.country, Weather : data.list[time].weather[0].description+" ", Temperature : temp};
    //   console.log('reponse :',responseapi);
    //   // res.end();

    //   res.json(responseapi);
    // });
    //   }
    // )
    // .catch(function(err) {
    //   console.log('Fetch Error :-S', err);
    // });
  },


};

module.exports = Chatbots;
