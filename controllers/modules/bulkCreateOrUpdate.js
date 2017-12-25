// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;
const _ = require('lodash');
const models = require("../../models");


function bulkCreateOrUpdate(requestObject){
  console.log('requestObject: ', requestObject);
  const promises = _.map(
    requestObject, (value, index) =>
    Promise
    .resolve()
    .then(() => {
      console.log('value, index: ', value, index);
      console.log(value.text);
      models.Keyword.update(
        value,
        {
          // where: { id : 1 },
          where: { text : value.text },
        })
        .then((data => {
          console.log('after update: ', data);
          // console.log(data[0] == 0);
          // if (true){
          if (data[0] == 0){
            console.log('inserting: ', value);
            models.Keyword.create(value).then(() => console.log('inserted'));
          }
        }))
      })
    );
    // console.log(promises);
    return promises;
  }

  module.exports = bulkCreateOrUpdate;
