export const createSuccessObj = <T = any>(data: T, message?: string, status: number = 200) => {
  return { status, message, data, success: true };
};

export const createErrorObj = (message?: string, status: number = 500) => {
  const err = new Error(message);
  return { status, message: err.message, error: true };
};
interface Ihello {
  name: string;
  age: number;
}
type NotRequired<T = IAnyObjectType> = {
  [index in keyof T]?: T[index];
};

export const deleteItemFromObject = <T = IAnyObjectType>(
  object: NotRequired<T>,
  property: keyof T
) => {};

const hello: NotRequired<Ihello> = { age: 4, name: "number" };

deleteItemFromObject<Ihello>(hello, "age");
