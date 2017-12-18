/* Merci de mettre un commentaire ici */

const Confirmationinscriptions = {

// route GET '/confirmationinscription' -- Affichage de la page de confirmation d'inscription
    confirmationinscription: function (req, res, next) {
        res.render('Users/confirminscription');
    },
};

module.exports = Confirmationinscriptions; 