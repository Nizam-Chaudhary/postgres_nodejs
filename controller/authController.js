const signUp = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Auth Route are working",
  });
};

module.exports = { signUp };
