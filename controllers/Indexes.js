const validator = require('validator');
const nodemailer = require("nodemailer");

var Indexes = {
    

// route GET '/erreur404' -- Affichage de la page d'erreur 404 
    erreur404: function(req, res){
        res.render('error');
    },

// route GET '/' -- Affichage de la page d'inscription avec le formulaire    
    indexGet: function (req, res, next) {    
        console.log('render index');
        res.render('index/index');
    },

      
// route POST -- Validation des informations saisies dans le formulaire d'inscription 
    indexPost: function (req, res, next) {
        let error=[];
        console.log(validator.isEmpty(req.body.prenom));
        if(validator.isEmpty(req.body.prenom) ){
            error[0] = "Veuillez renseigner votre prenom";
            console.log(error.length);
        }
        if(validator.isEmpty(req.body.nom) ){
            error[1] = "Veuillez renseigner votre nom";
            console.log(error.length);
        }
        if(validator.isEmpty(req.body.email) ){
            error[2] = "Veuillez renseigner votre identifiant";
            console.log(error.length);
        }
        if(validator.isEmpty(req.body.motdepasse) ){
            error[3] = "Veuillez renseigner votre mot de passe";
            console.log(error.length);
        }
        if(error.length>0){
                console.log(error);
                res.render('index', {error: error});
            }else{
                res.redirect('/confirminscription');
            }
    },


// route GET -- envoie de mail pour confirmer son inscription
    emailsending: function(req, res, next) {
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

    confirmationinscription: function (req, res, next) {
            res.render('index/confirminscription');
    },

    connexionGet: function (req, res, next) {
        res.render('admin/configchat');
    },


    deconnexion: function (req, res, next) {
        res.render('index/deconnexion');
    },
    

    motdepasseoublie: function (req, res, next) {
        res.render('index/oubli');
    },

    connexionPost: function (req, res, next) {
        let error=[];
        console.log(validator.isEmpty(req.body.email));
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
            res.render('login', {error: error});
        }else{
            res.redirect('/connexion');
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

module.exports = Indexes; 