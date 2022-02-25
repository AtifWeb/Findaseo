const handleError = (error) => {
  if (!error.response || !error.response.data) return false;
  return typeof error.response.data.error === "object"
    ? error.response.data.error[0]?.msg
    : error.response.data.error;
};

export default handleError;
