module.exports = (error, req, res, next) => {
  res.status(500).json({
    message: "error occured",
    error: error,
  });
};
