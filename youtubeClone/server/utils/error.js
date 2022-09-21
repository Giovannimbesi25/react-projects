//You can use this to create your own error message

export const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
};  