import { ValidationError } from 'yup';

export interface Errors {
  [key: string]: string;
}

export default class ErrorUtils {
  static getValidationErrors(err: ValidationError): Errors {
    const validationErrors: Errors = {};

    err.inner.forEach((error: any) => {
      validationErrors[error.path] = error.message;
    });

    return validationErrors;
  }
}
