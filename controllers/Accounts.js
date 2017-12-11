/* Merci de mettre un commentaire ici */

const Accounts = {

// route GET '/admin/miseajour' -- Affichage de la page de mise à jour des infos personnelles 
// !!!!! La views 'update' n'existe pas encore 
    miseajour: function(req, res, next){
        res.render('Users/update');
      },

// route GET '/admin/updateconfirmation' -- Affichage de la page de confirmation de mise à jour
    confirmationmaj: function(req, res, next){
        res.render('Users/updateconfirmation');
      },
};

module.exports = Accounts; 