const logger = require("./logger");
const wrapper = require("./wrapper");
// const { NotFoundError } = require("../../helpers/error/index");

const makePaginationData = (pageNumber, dataSize, countResult, listResult, description, code) => {
    const totalData = countResult;
    const list = listResult;
    const totalPage = Math.ceil(totalData / dataSize);
    const totalDataOnPage = list.length;
    const meta = {
        page: pageNumber,
        totalPage: totalPage,
        totalData: totalData,
        totalDataOnPage: totalDataOnPage
    };

    return wrapper.paginationData(list, meta, description, code);
};

// const resultErrorHandler = (context, scope, errorResult, notFoundMessage, unexpectedMessage) => {
//     if (errorResult.err instanceof NotFoundError) {
//         return wrapper.error(new NotFoundError(notFoundMessage));
//     }
//     logger.log(context, errorResult.err.message, scope);
//     return wrapper.error(new InternalServerError(unexpectedMessage));
// };

module.exports = { makePaginationData };