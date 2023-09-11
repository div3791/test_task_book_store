exports.success = (message, result) => {
  return {
    success: true,
    message,
    result,
  };
};

exports.error = (message, err) => {
  return {
    success: false,
    message,
  };
};
