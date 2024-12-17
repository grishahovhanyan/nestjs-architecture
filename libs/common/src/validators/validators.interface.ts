/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IFieldOptions {
  each?: boolean
  swagger?: boolean
  nullable?: boolean
}

export interface INumberFieldOptions extends IFieldOptions {
  min?: number
  max?: number
  int?: boolean
  positive?: boolean
}

export interface INumberIdsFieldOptions extends INumberFieldOptions {
  optional?: boolean
}

export interface IStringFieldOptions extends IFieldOptions {
  minLength?: number
  maxLength?: number
  matchKey?: string
  matchMessage?: string
}

export interface IPasswordFieldOptions extends IStringFieldOptions {
  passwordConfirmField?: boolean
}

export interface IBooleanFieldOptions extends IFieldOptions {}
export interface IEnumFieldOptions extends IFieldOptions {}
