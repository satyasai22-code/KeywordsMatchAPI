const db = require("../models");
const Query = db.queries;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  console.log("findAll", req.query);
  const keyword = req.query.keyword;
  let partialKeyWords = keyword.split(" ");

  return new Promise((resolve, reject) => {
    findOne(keyword, [])
      .then((data) => {
        findAllOfOne(partialKeyWords, data)
          .then((partialMatch) => {
            res.send([{ complete_match: data, partial_match: partialMatch }]);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving Querys.",
            });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Querys.",
        });
      });
  });
};

// Find a single Query with a keyWord
const findOne = (keyword, completeMatch) => {
  var condition = { Keyword: { [Op.iLike]: `%${keyword}%` } };
  return new Promise((resolve, reject) => {
    Query.findAll({ where: condition })
      .then((data) => {
        let res1 = [];
        for (i of data) {
          const res2 = i.dataValues.Keyword;
          if (res2 && !completeMatch.includes(res2)) {
            res1.push(i.dataValues.Keyword);
          }
        }
        resolve(res1);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const findAllOfOne = (keywords, completeMatch) => {
  var promises = [];
  for (keyword of keywords) {
    promises.push(findOne(keyword, completeMatch));
  }
  return Promise.all(promises);
};
