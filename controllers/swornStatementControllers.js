const { request, response } = require('express');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
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
    addDate: dayjs().format('YYYY-MM-DD'),
  };
  if (firstAnswer || secondAnswer || thirdAnswer) {
    dateSwornSrarement.aceppt = false;
  } else {
    dateSwornSrarement.aceppt = true;
  }
  await postswornStarementFromDb(dateSwornSrarement, user, res);
};

module.exports = swornStatementPost;
