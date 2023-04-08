export var createSuccessObj = function (data, message, status) {
    if (status === void 0) { status = 200; }
    return { status: status, message: message, data: data, success: true };
};
export var createErrorObj = function (message, status) {
    if (status === void 0) { status = 500; }
    var err = new Error(message);
    return { status: status, message: err.message, error: true };
};
