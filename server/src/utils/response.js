export const sendResponse = (reply, options, statusCode = 200) => {
  const response = {
    success: options.success,
    message: options.message,
    data: options.data ?? {},
    errors: options.errors,
    meta: options.meta,
  };

  return reply.status(statusCode).send(response);
};
