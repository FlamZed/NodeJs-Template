import { WhoseError } from './useResponse';

export enum TypeData {
  string = 'string',
  number = 'number',
  includes = 'includes',
  everyNumber = 'everyNumber',
  date = 'date',
  boolean = 'boolean',
}

type Patamtrs = (data: any, type: TypeData, errorValue: string, object?: object, array?: Array<any>) => void;

const useCheckValue: Patamtrs = (data: any, type: TypeData, errorValue: string, object = {}, array = []) => {
  const stringType = (str: string, errorValue: string) => {
    if (typeof str !== 'string') {
      throw new Error(`${WhoseError.web} ${errorValue} it's not string`);
    }
  };

  const numberType = (numb: number, errorValue: string) => {
    if (isNaN(numb)) {
      throw new Error(`${WhoseError.web} ${errorValue} it's not number`);
    }
    return true;
  };

  const includesType = (str: string, errorValue: string, obj: object) => {
    if (!Object.values(obj).includes(str)) {
      throw new Error(`${WhoseError.web} "${errorValue}" it's not in an accessible object or array`);
    }
    return true;
  };

  const everyNumber = (errorValue: string, arr: Array<any>) => {
    try {
      arr.every(el => numberType(el, `${WhoseError.web} In ${errorValue} "${el}"`));
      return true;
    } catch (e: any) {
      throw new Error(`${WhoseError.web} ${e}`);
    }
  };
  const dateType = (str: string, errorValue: string) => {
    try {
      const [splitYear, splitMonth, splitDay] = str.split('-');
      const checkDate = new Date(str);
      if (
        splitYear.length !== 4 ||
        splitMonth.length !== 2 ||
        splitDay.length !== 2 ||
        !(checkDate instanceof Date) ||
        String(checkDate) === 'Invalid Date' ||
        !str
      ) {
        throw new Error(`${WhoseError.web} "${errorValue}" it's not new Date()`);
      }
      return true;
    } catch (e: any) {
      throw new Error(`${WhoseError.web} "${errorValue}" it's not new Date()`);
    }
  };

  const booleanType = (bool: number, errorValue: string) => {
    if (typeof bool !== 'boolean') {
      throw new Error(`${WhoseError.web} ${errorValue} it's not boolean`);
    }
    return true;
  };

  switch (type) {
    case TypeData.string: {
      return stringType(data, errorValue);
    }
    case TypeData.number: {
      return numberType(data, errorValue);
    }
    case TypeData.includes: {
      return includesType(data, errorValue, object);
    }
    case TypeData.everyNumber: {
      return everyNumber(errorValue, array);
    }
    case TypeData.date: {
      return dateType(data, errorValue);
    }
    case TypeData.boolean: {
      return booleanType(data, errorValue);
    }
  }
};

export default useCheckValue;
