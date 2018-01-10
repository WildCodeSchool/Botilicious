const models = require('../../models');
const axios = require('axios');

// fonction qui retourne une promesse. Celle-ci est le call d'api.
function apiCall(moduleName, args) {
  return new Promise(((resolve, reject) => {
    if (moduleName) {
      const myparams = { where: { name: moduleName } };
      console.log('myparams', myparams);

      models.Module
        .find(myparams)
        .then((results) => {
          console.log('results.dataValues: ', results.dataValues);
          const api = JSON.parse(results.dataValues.api);
          // console.log('api :', Object.keys(api.parameters).length);
          // console.log('api :', Object.keys(args.parameters).length);

          // voir s'il manque des paramètres pour passer le call d'api
          if (Object.keys(api.parameters.filter(element => element.type === 'out')).length !== Object.keys(args.parameters).length) {
            reject(new Error('Erreur - pas le bon nombre d\'arguments'));
          } else {
          // former l'objet prams attendu par axios
            const params = {};

            // adaptateur : mapper les arguments reçus sur le modèle attendu
            api.parameters.map((parameter) => {
              params[parameter.text] = args.parameters[parameter.tag];
            });
            // console.log('params: ', params);

            // ajouter les paramètres fixes (tokens, logins, etc...)
            api.fixed.map((parameter) => {
              params[parameter.text] = parameter.value;
            });
            // console.log('params: ', params);

            // récupérer l'url de l'api (dans l'objet api issu de la bdd)
            const url = api.url;
            console.log('url: ', url);

            // appeler l'api
            axios.get(url, { params })
              .then((response) => {
                console.log('response.data: ', response.data);
                // prendre dans la réponse les éléments listés dans la bdd

                const replyToSend = { answerPattern: api.answer, answer: api.answer };

                console.log('api: ', api);
                // console.log(response.data.city.name);
                console.log(args.input.time);


                api.parameters
                  .filter(parameter => parameter.type === 'in')
                  .map((parameter) => {
                    let tempResponse = response.data;
                    parameter.value.split('.')
                      .map((key) => {
                        console.log(key);

                        const tempKey = key;
                        const arrayInKey = key.match(/\[[A-Z]+\]/gi);
                        console.log('array: ', arrayInKey);
                        if (!arrayInKey) {
                        //   tempKey = arrayInKey[0].substring(1, arrayInKey[0].length - 1);
                          // tempResponse = tempResponse[tempKey][args.input.time];
                        // } else {
                        }
                        tempResponse = tempResponse[tempKey];
                        console.log(tempKey);
                        // console.log(`tempResponse ${tempKey}: `, tempResponse);
                        console.log('-----------');
                        return tempResponse;
                      });
                    const remplacePar = tempResponse;
                    console.log(tempResponse);
                    console.log(`<${parameter.tag}>`);
                    replyToSend.answer = replyToSend.answer.replace(`<${parameter.tag}>`, remplacePar);
                  });
                console.log('replyToSend: ', replyToSend);
                // return replyToSend;
                resolve(replyToSend);
              })
              .catch((error) => {
                console.log('Error api: ', error);
                reject(error);
              });
          // }
          }
        })
        // .resolve(replyToSend => replyToSend)
        .catch((error) => {
          console.log('Error bdd: ', error);
          reject(error);
        });
    }
  }));
}

module.exports = apiCall;
