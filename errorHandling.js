/**
 *
 * @param {Number} statusCode
 * @param {String} errorMessage
 */
export const createError = (statusCode, errorMessage) => {
  statusCode = statusCode ? statusCode : 500;
  const error = new Error(errorMessage);
  error.statusCode = statusCode;
  return error;
};

/**
 *
 * @param {import("express").Response} res
 * @param {Error} error
 */
export const errorHandler = (res, error) => {
  res.status(error.statusCode || 500).json({ error: error.message });
};
