// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;
const _ = require('lodash');
const models = require('../../models');


function bulkCreateOrUpdate(requestObject) {
  // return new Promise(function(resolve, reject) {

  console.log('requestObject: ', requestObject);
  const promises = _.map(requestObject, (value, index) =>
    Promise
      .resolve()
      .then(() => {
        console.log('value, index: ', value, index);
        console.log(value.text);

        if (value.TagId === '') {
          models.Keyword
            .destroy({ where: { text: value.text } })
            .then(result => console.log('destroy result: ', result));
        } else {
          models.Keyword.update(
            value,
            {
              where: { text: value.text },
            },
          )
            .then(((data) => {
              console.log('after update: ', data);
              // console.log(data[0] == 0);
              // if (true){
              if (data[0] === 0) {
                const toInsert = value;
                toInsert.confidence = 1;
                console.log('inserting: ', toInsert);
                models.Keyword
                  .create(value)
                  .then(() => console.log('inserted'));
              }
            }));
        }
      }));
  //   resolve(promises);
  // });
  console.log('promises: ', promises);
  return promises;
}

module.exports = bulkCreateOrUpdate;
