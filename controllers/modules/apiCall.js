const models = require('../../models');
const axios = require('axios');

function apiCall(moduleName, args) {
  return new Promise(((resolve, reject) => {
    if (moduleName) {
      const myparams = { where: { name: moduleName } };
      console.log('myparams', myparams);

      models.Module
        .find(myparams)
        .then((results) => {
          // console.log('results.dataValues: ', results.dataValues);
          // if (results.arguments.length !== args.length) {
          //   reject(new Error('Erreur - pas le bon nombre d arguments'));
          // } else {
          const url = results.dataValues.apiurl;
          console.log('url: ', url);
          axios.get(url, args)
            .then((response) => {
              // console.log('response.data.list: ', response.data.list);
              resolve(response.data);
            })
            .catch((error) => {
              // console.log('Error api: ', error);
              reject(error);
            });
          // }
        })
        .catch((error) => {
          console.log('Error bdd: ', error);
          reject(error);
        });
    }
  }));
}

module.exports = apiCall;
