export const toSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const toSnakeCaseObject = <T>(object: T) => {
  if (typeof object === "object") {
    const newObject: any = {};

    for (const camel in object) {
      newObject[toSnakeCase(String(camel))] = object[camel];
    }

    return newObject as T;
  }

  return object;
};
