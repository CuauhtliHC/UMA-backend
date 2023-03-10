exports.logoutControllers = (req, res) => {
  res.clearCookie('token');

  res.sendStatus(204);
};
