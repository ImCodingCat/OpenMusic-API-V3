module.exports = (status, message, data) => {
  const response = {
    status: status ? 'success' : 'fail',
  };
  if (message) response.message = message;
  if (data) response.data = data;
  return response;
};
