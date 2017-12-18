/* Merci de mettre un commentaire */

const Deconnexions = {
    
// route GET '/deconnexion' -- Affichage de la page de déconnexion
    deconnexion: function (req, res, next) {
        res.render('Users/deconnexion');
    },
};

module.exports = Deconnexions; 