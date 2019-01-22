// Generic error messages
// eslint-disable-next-line no-unused-vars
exports.errorMessage = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(err.statusCode).json({ message: err.message });
};

exports.welcomeMessage = (req, res) => {
  res.json({
    message:
      "Welcome to the contacts api, start by making requests to /contacts"
  });
};
