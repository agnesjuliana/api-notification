const data = (data, description = '', code = 200) => ({ err: null, message: description, data, code });

const paginationData = (data, meta, description = '', code = 200) => ({ err: null, message: description, data, meta, code });

const error = (err, description, code = 500) => ({ err, code, data: null, message: description });

const response = (res, type, result, message = null, code = null) => {
  if (message) {
    result.message = message;
  }
  if (code) {
    result.code = code;
  }
  let status = true;
  if (type === "fail") {
    status = false;
  }
  return res.status(result.code).json({
    success: status,
    data: result.data,
    message: result.message,
    code: result.code
  });
};

const paginationResponse = (res, type, result, message = null, code = null) => {
  if (message) {
    result.message = message;
  }
  if (code) {
    result.code = code;
  }
  let status = true;
  if (type === 'fail') {
    status = false;
  }

  return res.status(result.code).json({
    success: status,
    data: result.data,
    meta: result.meta,
    message: result.message,
    code: result.code
  });
};

module.exports = {
  data,
  paginationData,
  error,
  response,
  paginationResponse
};
