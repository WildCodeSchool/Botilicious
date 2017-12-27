const validator = require('validator');
const models = require('../models');

const Users = {

  // route GET '/confirmationinscription' -- Affichage de la page de confirmation d'inscription
  registered(req, res) {
    res.render('user/registered');
  },

  // route GET '/connexion' -- Affichage de la page de login
  loginGet(req, res) {
    res.render('index/login');
  },

  // route POST '/connexion' -- Prise en compte du login
  loginPost(req, res) {
    const error = [];
    console.log('bob');
    console.log(validator.isEmpty(req.body.email));
    console.log('bob2');
    if (validator.isEmpty(req.body.email)) {
      error[0] = 'Merci de renseigner votre identifiant';
      console.log(error.length);
    }
    if (validator.isEmpty(req.body.motdepasse)) {
      error[1] = 'Merci de renseigner votre mot de passe';
      console.log(error.length);
    }
    if (error.length > 0) {
      console.log(error);
      res.render('index/login', { error });
    } else {
      // res.redirect('admin/chatbot');


      console.log('login en cours');
      // console.log(req.body);
      const myparams = {
        email: req.body.email,
        password: req.body.motdepasse,
      };
      console.log(myparams);

      models.User
        .findOne({ where: myparams })
        .then((results, status) => {
          console.log('results: ', results);
          console.log('status: ', status);
          if (!results) {
            console.log('error login');
            res.redirect('/login');
          } else {
            req.session.connected = true;
            // inscrire l'id de l'utilisateur dans req.session
            req.session.userId = results.id;
            console.log(req.session);
            res.redirect('/admin/chatbot');
          }
        });
    }
  },


  // route GET '/admin/miseajour' -- Affichage de la page de mise à jour des infos personnelles
  // !!!!! La views 'update' n'existe pas encore
  update(req, res) {
    res.render('user/update');
  },

  // route GET '/admin/updateconfirmation' -- Affichage de la page de confirmation de mise à jour
  updateconfirmation(req, res) {
    res.render('user/updateconfirmation');
  },

  // route GET 'user/deconnection' -- Affichage de la page de déconnexion
  deconnection(req, res) {
    res.render('index/deconnection');
  },

  forgottenpw(req, res) {
    res.render('user/forgottenpw');
  },

};

module.exports = Users;
