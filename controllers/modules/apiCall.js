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
            api.parameters
              .filter(apiParameter => apiParameter.type === 'out')
              .map((apiParameter, i) => {
                console.log('args.parameters[i]: ', args.parameters[i]);
                params[apiParameter.text] = args.parameters[i].value;
              });
            console.log('params: ', params);

            // ajouter les paramètres fixes (tokens, logins, etc...)
            api.fixed.map((apiParameter) => {
              params[apiParameter.text] = apiParameter.value;
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
                console.log(args.inputs.map(input => input));


                api.parameters
                  .filter(parameter => parameter.type === 'in')
                  .map((parameter) => {
                    let tempResponse = response.data;
                    const tempParameter = parameter;

                    console.log('args.inputs.length: ', args.inputs.length);
                    // les valeurs reçues en argument sont placées
                    args.inputs.map((input) => {
                      tempParameter.value = tempParameter.value.replace(input.tag, input.value);
                      console.log('tempParameter: ', tempParameter);
                    });

                    tempParameter.value.split('.')
                      .map((key) => {
                        console.log(key);

                        const arrayIndexInKey = key.match(/\[[0-9]+\]/gi);
                        if (arrayIndexInKey) {
                          console.log('arrayIndexInKey: ', arrayIndexInKey);

                          const actualIndex = arrayIndexInKey[0].substring(1, arrayIndexInKey[0].length - 1);
                          console.log('actualIndex: ', actualIndex);
                          const tempKey = key.slice(0, key.indexOf(actualIndex) - 1);
                          console.log('tempKey: ', tempKey);

                          const tempArray = tempResponse[tempKey];
                          tempResponse = tempArray[actualIndex];
                          // console.log('tempArray[actualIndex]: ', tempResponse);
                        } else {
                          console.log('key: ', key);
                          tempResponse = tempResponse[key];
                        }
                        // results.data => results.data.name => results.data.name.city
                        return tempResponse;
                      });
                    console.log(tempResponse);
                    console.log(`<${tempParameter.tag}>`);
                    replyToSend.answer = replyToSend.answer.replace(`<${tempParameter.tag}>`, tempResponse);
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
