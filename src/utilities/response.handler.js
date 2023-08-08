module.exports = function (message, status, code, data) {
    const toReturn = {};
    toReturn.message = message;
    toReturn.status = status;
    toReturn.code = code
    if (data && data.constructor.name == "String") toReturn.errorType = data;
    else if (data && typeof data == "object") toReturn.data = data;
    return toReturn;
};

