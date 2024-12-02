export interface IAnyObjectType extends Object {
  [index: string | number]: any;
}

export type NotRequired<T extends { [index: string | number]: any }> = {
  [index in keyof T]?: T[index];
};
