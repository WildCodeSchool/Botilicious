const nodemailer = require('nodemailer');
const validator = require('validator');
const models = require('../models');

const seedDb = require('./modules/seedDb');
const getKeywords = require('./modules/Keywords');

const Indexes = {

  // route GET '/erreur404' -- Affichage de la page d'erreur 404
  error404(req, res) {
    res.render('index/error');
  },

  seedPost(req, res) {
    console.log(seedDb());
    // res.status(200);
    res.send('seeded');
  },

  seedGet(req, res) {
    getKeywords()
      .then((keywords) => {
        console.log('keywords: ', keywords);
      });

    // res.status(200);
  },

  // route GET '/' -- Affichage de la page d'inscription avec le formulaire
  indexGet(req, res) {
    console.log('render index');
    res.render('index/index');
  },

  indexPost(req, res) {
    console.log(Object.entries(req.body));
    const data = Object.entries(req.body);
    // console.log(data);
    // initalisation du tableau qui listera les erreurs
    const error = [];
    data.map((element, index) => {
      console.log(element, index);
      if (validator.isEmpty(element[1])) {
        error[index + 1] = `Merci de renseigner votre ${element[0]}`;
      }
      return error;
    });
    // console.log('error: ', error);
    // / y'a-t-il des erreurs ?
    if (error.length > 0) {
      // pour remplir toutes les cases jusqu'à la 9ème
      error[10] = 'fin des erreurs';
      console.log('error: ', error);
      console.log('req.body: ', req.body);
      res.render('index/index', { body: req.body, error });
    } else {
      // construire l'objet à donner à sequelize
      const myparams = {
        firstname: req.body.firstname,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dateofbirth: req.body.dateofbirth,
        address: req.body.address,
        zipcode: req.body.zipcode,
        city: req.body.city,
        phone: req.body.phone,
      };
      console.log('myparams: ', myparams);

      // vérifier l'existence ou écrire l'objet
      models.User
        .findOrCreate({ where: myparams })
        .then((results) => {
          // l'utilisateur vérifié dans la bdd
          console.log('results[0].dataValues: ', results[0].dataValues);
          // le boolén qui indique si l'utilisateur a été crée ou pas
          console.log('results[1]: ', results[1]);
          if (!results[1]) {
            error[0] = 'Email déjà présent';
            console.log('error db, redirection: ', error);
            res.render('index/index', { body: req.body, error });
          } else {
            req.session.connected = true;
            // inscrire l'id de l'utilisateur dans req.session
            req.session.userId = results.id;
            console.log('req.session: ', req.session);
            res.redirect('/admin/chatbotEdit');
          }
        });
    }
  },

  // route GET -- envoie de mail pour confirmer son inscription
  emailPost(req, res) {
    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'bad2f38eae6508',
        pass: '359d3004ac5407',
      },
    });
    transport.sendMail({
      from: 'bob@gmail.com', // Expediteur
      to: 'supermario@gmail.com', // Destinataires
      subject: 'Cookies', // Sujet
      text: 'Hello, to confirm your account on Botilicious, click on the following url :', // plaintext body
      html: '<b>Hello world ✔</b>', // html body
    }, (error, response) => {
      if (error) {
        console.log(error);
        res.json({ servermessage: `${error}` });
      } else {
        res.json({ servermessage: `${response.message}` });
        console.log(`Message sent: ${response.message}`);
      }
    });
  },
};

module.exports = Indexes;
