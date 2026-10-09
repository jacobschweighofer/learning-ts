export const printError = (msg: string): never => {
  throw new Error(msg);
};
