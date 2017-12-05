var Accounts = {
  

// route GET '/admin/update' -- Affichage de la page de mise à jour des infos personnelles 
    update: function(req, res, next){
        res.render('admin/update');
      },
  
// route GET '/admin/updateconfirmation' -- Affichage de la page de confirmation de mise à jour
    updateconfirmation: function(req, res, next){
        res.render('admin/updateconfirmation');
      },

      
};

module.exports = Accounts; 