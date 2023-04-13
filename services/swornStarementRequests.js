const SwornStatement = require('../models/swornStatement');
const { userByIdService } = require('./usersServices');

const postswornStarementFromDb = async (data, user, res) => {
  try {
    const dateSwornStatement = await SwornStatement.create(data);
    const userFind = await userByIdService(user.id);
    await userFind.setSwornStatements(dateSwornStatement);
    res.status(201).json({
      msg: 'SwornStatement Created',
      dateSwornStatement,
    });
    return dateSwornStatement;
  } catch (error) {
    res.status(500).json({
      msg: 'Error Post Sworn Statement',
      location: 'services/swornSrarementRequests.js/postswornSrarementFromDb()',
      error,
    });
  }
};
module.exports = {
  postswornStarementFromDb,
};
