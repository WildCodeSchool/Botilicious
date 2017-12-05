const express = require('express');
const router = express.Router();

var Logins = {

// route GET '/connexion' -- Affichage de la page de login 
    connexionGet: function (req, res, next) {
        res.render('index/login');
    },

// route POST '/connexion' -- Prise en compte du login
    connexionPost: function (req, res, next) {
        console.log('login en cours');
        console.log(req.body);
        let login = req.body.email;
        let pass = req.body.motdepasse;
        console.log(login, pass);
    
    // requête sequelize sur la table Users
        // connection.query('SELECT * FROM users WHERE email = ? AND password = ? ;',[login, pass],function (error, results, fields) {
        //   if (error) throw error;
        //   if (results.length === 0) {
        //     console.log('error login');
        //     res.redirect('/connexion');
        //   } else {
        req.session.connected = true;
    
    // inscrire l'id de l'utilisateur dans req.session
        // req.session.user = results[0].id;
        console.log(req.session);
        res.redirect('/main/');
    },

     
};

module.exports = Logins; 