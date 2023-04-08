export const createSuccessObj = <T = any>(data: T, message?: string, status: number = 200) => {
  return { status, message, data, success: true };
};

export const createErrorObj = (message?: string, status: number = 500) => {
  const err = new Error(message);
  return { status, message: err.message, error: true };
};
