var Accounts = {
  

// route GET '/admin/miseajour' -- Affichage de la page de mise à jour des infos personnelles 
    miseajour: function(req, res, next){
        res.render('admin/update');
      },
  
// route GET '/admin/confirmationmaj' -- Affichage de la page de confirmation de mise à jour
    confirmationmaj: function(req, res, next){
        res.render('admin/confirmmaj');
      },

      
};

module.exports = Accounts; 