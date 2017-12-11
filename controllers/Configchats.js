const request = require('request');
const models = require("../models");

var Configchats = {


  // route GET '/admin' -- Affichage de la page de configuration du chatbot
  index: function(req, res){
    res.render('admin/configchat');
  },

  // route GET '/admin/configchat' -- Affichage de la page de configuration du chatbot
  configchat: function(req, res, next){

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
      console.log('tata', allsentences);
      res.render('admin/configchat', {sentences:allsentences});
    });
  },

  // route POST '/admin/postamessage' -- soumission d'un message dans la boite de dialogue du chatbot
  postamessage: function(req, res, next) {
    console.log(req.body.message);
    let message = req.body.message.split(' ');

    let time;
    let errorsyntaxe;
    if (message.length == 3 && typeof(parseInt(message[2]))=== 'number' && typeof(parseInt(message[1]))=== 'number'){
      time = 8*message[1] + Math.round(message[2]/3);
    } else if (message.length == 2 && typeof(parseInt(message[1]))=== 'number'){
      time = 8*message[1];
    } else {
      time = 0;
      let errorsyntaxe='votre syntaxe est incorrecte';
    }
    if (time > 39) {
      time = 39;
    }
    console.log("time:", time);
    if (isNaN(time)){
      errorsyntaxe='votre syntaxe est incorrecte';
      time=0;
    }

    request("http://api.openweathermap.org/data/2.5/forecast?q="+message[0]+"&APPID=7081077244653a5c7f8f9ab6496d6bd3", function(error, response, body){
      console.log(JSON.parse(response.body));

      let data = JSON.parse(response.body);

      let temp = Math.round(data.list[time].main.temp-273.15);

      console.log(temp);

      let responseapi = {Time: data.list[time].dt_txt+" ", City : data.city.name+" ", Country : data.city.country, Weather : data.list[time].weather[0].description+" ", Temperature : temp};
      console.log('reponse :',responseapi);
      // res.end();

      res.json(responseapi);
    });
    //   }
    // )
    // .catch(function(err) {
    //   console.log('Fetch Error :-S', err);
    // });
  },

  postasentence: function(req, res, next) {
    // console.log(req.body);

    // insert into
    models.Sentence.findOrCreate(
      {
        where: {text: req.body.sentence, type: req.body.type}
      })
      .spread(
        (sentence, created) => {
          console.log('sentence: ', sentence.dataValues);
          let data = {sentence};
          // set the error key
          if(created){
            data.error = false;
          } else {
            data.error = true;
            data.serverMessage = 'Error, sentence not added - Already there or database error';
          }

          // send back the new sentence to the browser
          res.json(data)
        })
      },

      //sentenceDelete
      sentenceDelete: function(req, res, next) {
        console.log(req.body);

        // insert into
        models.Sentence.destroy(
          {
            where: {id: req.body.id}
          })
          .then(
            res.status(200).send('delete ok')
            // (sentence, created) => {
            //   console.log('sentence: ', sentence.dataValues);
            //   let data = {sentence};
            //   // set the error key
            //   if(created){
            //     data.error = false;
            //   } else {
            //     data.error = true;
            //     data.serverMessage = 'Error, sentence not added';
            //   }
            //
            //   // send back the new sentence to the browser
            //   res.json(data)
            // }
          )
        },



        // Accepter les données du formulaire 'Nouvelles phrases' ===> router.post('/pattern', patterns.pattern);
        pattern : function(req, res, next){
          let texte = req.body.text;
          let genre = req.body.type;
          let url = req.body.apiurl;

          models.User.create(
            {
              text : texte,
              type : genre
            });
          },

          // Obtenir la liste des tags existants
          tagsGet : function(req, res, next){
            console.log('Loading tags');
            let allcategories = [];
            models.Category.findAll({})
            // query ok
            .then(results => {
              // console.log(results);
              results.map((result, i) => {
                // allcategories.push(result.dataValues);
                allcategories[i] = result.dataValues;
                // console.log('res', i, result.dataValues);
              });
              console.log('tata', allcategories);
              res.json({'tags':allcategories});
            });
          },

          tagSentencePost : function(req, res, next){
          },

          // Accepter les données du formulaire 'Nouveau Modules' ===> router.post('/modules', addModules.modulesEnBdd);
          modulesEnBdd : function(req, res, next){
            let nom = req.body.name;
            let desc = req.body.description;
            let url = req.body.apiurl;

            models.User.create(
              {
                name : nom,
                description : desc,
                apiurl : url
              });
            },

            // Accepter les données du formulaire 'Nouveau Chatbot' ===> router.post('/configchat', configchats.configchatEnBdd);
            configchatEnBdd : function(req, res, next){
              let nom = req.body.name;

              models.User.create(
                {
                  name : nom
                });
              },


            };

            module.exports = Configchats;
