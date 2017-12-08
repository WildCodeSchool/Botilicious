const express = require('express');
const router = express.Router();
const validator = require('validator');

var Logins = {

// route GET '/connexion' -- Affichage de la page de login 
    connexionGet: function (req, res, next) {
        res.render('index/login');
    },

// route POST '/connexion' -- Prise en compte du login
    connexionPost: function (req, res, next) {
        let error=[];
        console.log('bob');
        console.log(validator.isEmpty(req.body.email));
        console.log('bob2');
        if(validator.isEmpty(req.body.email) ){
            error[0] = "Merci de renseigner votre identifiant";
            console.log(error.length);
        }
        if(validator.isEmpty(req.body.motdepasse) ){
            error[1] = "Merci de renseigner votre mot de passe";
            console.log(error.length);
        }
        if(error.length>0){
            console.log(error);
            res.render('index/login', {error: error});
        }else{
            req.session.connected = true;
            res.redirect('admin/configchat');
        }
    },
        /* console.log('login en cours');
        console.log(req.body);
        let login = req.body.email;
        let pass = req.body.motdepasse;
        console.log(login, pass); */

    // requête sequelize sur la table Users
        // connection.query('SELECT * FROM users WHERE email = ? AND password = ? ;',[login, pass],function (error, results, fields) {
        //   if (error) throw error;
        //   if (results.length === 0) {
        //     console.log('error login');
        //     res.redirect('/connexion');
        //   } else {
        // req.session.connected = true;

    // inscrire l'id de l'utilisateur dans req.session
        // req.session.user = results[0].id;
        //console.log(req.session);
        //res.redirect('/main/');
    //},


    

}; 


module.exports = Logins;