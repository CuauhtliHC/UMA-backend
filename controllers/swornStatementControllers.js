const { request, response } = require('express');
const createrTextSwornStatement = require('../helpers/createrTextswornStatement');
const {
  postswornStarementFromDb,
} = require('../services/swornStarementRequests');

const swornStatementPost = async (req = request, res = response) => {
  const { firstAnswer, secondAnswer, thirdAnswer } = req.body;
  const { user } = res;
  const textSwornStatement = createrTextSwornStatement(
    firstAnswer,
    secondAnswer,
    thirdAnswer,
  );
  const dateSwornSrarement = {
    bodyText: textSwornStatement,
  };
  if (firstAnswer || secondAnswer || thirdAnswer) {
    dateSwornSrarement.aceppt = false;
  } else {
    dateSwornSrarement.aceppt = true;
  }
  await postswornStarementFromDb(dateSwornSrarement, user, res);
};

module.exports = swornStatementPost;
