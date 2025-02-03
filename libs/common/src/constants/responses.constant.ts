export const VALIDATION_MESSAGES = {
  required: 'This field is required.',
  invalidBoolean: 'A valid boolean is required.',
  invalidInteger: 'A valid integer is required.',
  invalidNumber: 'A valid number is required.',
  invalidString: 'A valid string is required.',
  invalidArray: 'A valid array is required.',
  invalidEmail: 'A valid email is required.',
  invalidISOFormat: 'A valid iso date format is required.',
  invalidChoice: (valueUsed: string, validValues: string[] | number[]) =>
    `${valueUsed || 'This field'} is not a valid choice. Use one of these values instead: [${validValues.join(', ')}.`,
  invalidDate: 'This field value must be greater then date now.',
  invalidFormat: (validFormat: string) => `This field has wrong format. Use this format instead: ${validFormat}.`,
  mustBeGreaterThan: (num: number) => `This filed must be greater than or equal to ${num}.`,
  mustBeLessThan: (num: number) => `This filed must be less than or equal to ${num}.`,
  lengthMustBeGreaterThan: (num: number) => `This field length must be at least ${num} characters long.`,
  lengthMustBeLessThan: (num: number) => `This filed length must be less than or equal to ${num} characters long.`,
  passwordMismatch: 'Password mismatch.'
}

export const ERROR_MESSAGES = {
  unauthorized401: 'Authentication credentials were not provided.',
  forbidden403: 'You do not have permission to perform this action.',
  notFound404: 'Not found.',
  userAlreadyExists: 'User with such email already exists.',
  invalidEmailPassword: 'Invalid email and/or password.',
  passwordResetTokenExpired: 'Password reset token has expired.',
  passwordResetRequestTooFrequent: 'You can only request a password reset once per minute.'
}

export const SUCCESS_RESPONSE = { message: 'success' }
