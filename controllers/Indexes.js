const validator = require('validator');
const nodemailer = require("nodemailer");
const models = require("../models");

var Indexes = {

  // route GET '/erreur404' -- Affichage de la page d'erreur 404
  error404: function(req, res){
    res.render('index/error');
  },

  // route GET '/' -- Affichage de la page d'inscription avec le formulaire
  indexGet: function (req, res, next) {
    console.log('render index');
    res.render('index/index');
  },

  indexPost: function (req, res, next) {
    res.send('post index ok');
  },

  // route GET -- envoie de mail pour confirmer son inscription
  emailPost: function(req, res, next) {
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "bad2f38eae6508",
        pass: "359d3004ac5407"
      }
    });
    transport.sendMail({
      from: "bob@gmail.com", // Expediteur
      to: "supermario@gmail.com", // Destinataires
      subject: "Cookies", // Sujet
      text: "Hello, to confirm your account on Botilicious, click on the following url :", // plaintext body
      html: "<b>Hello world ✔</b>" // html body
    }, (error, response) => {
      if(error){
        console.log(error);
      }else{
        console.log("Message sent: " + response.message);
      }

    });

  },
};

module.exports = Indexes;
