import { injectable, Lifecycle, scoped } from "tsyringe";

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class Validator {
  private _model: any;
  constructor() {
    this._model = {};
  }

  set(key: string, message: string) {
    this._model[key] = message;
  }

  reset() {
    this._model = {};
    return this;
  }

  invalid() {
    return Object.keys(this._model).length > 0;
  }

  errors() {
    return this._model;
  }

  isNull(value: object, errorName: string, message: string) {
    if (!value) this._model[errorName] = message;
    return this;
  }

  required(value: string, errorName: string, message: string) {
    if (!value || value === "") this._model[errorName] = message;
    return this;
  }

  between(
    value: string,
    min: number,
    max: number,
    errorName: string,
    message: string
  ) {
    let length = value?.length;
    if (!(length >= min && length <= max)) this._model[errorName] = message;
    return this;
  }

  isValidEmail(value: string, errorName: string, message: string) {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test(value)) this._model[errorName] = message;
    return this;
  }

  isValidTel(value: string, errorName: string, message: string) {
    const reg =
      /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im;
    if (!reg.test(value)) this._model[errorName] = message;
    return this;
  }

  isValidDate(value: string, errorName: string, message: string) {
    const reg = /^\d{4}-\d{2}-\d{2}$/;
    if (!reg.test(value)) {
      this._model[errorName] = message;
      return this;
    }
    const date = new Date(value);
    const timestamp = date.getTime();
    if (typeof timestamp !== "number" || Number.isNaN(timestamp))
      this._model[errorName] = message;
    return this;
  }

  isValidLength(
    value: string,
    length: number,
    errorName: string,
    message: string
  ) {
    if (value?.length !== length) this._model[errorName] = message;
    return this;
  }

  isValidSize(value: number, size: number, errorName: string, message: string) {
    if (value > size) this._model[errorName] = message;
    return this;
  }

  isNumbersOnly(value: string, errorName: string, message: string) {
    const reg = /^\d+$/;
    if (!reg.test(value)) this._model[errorName] = message;
    return this;
  }

  isSecure(value: string, errorName: string, message: string) {
    const reg = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!reg.test(value)) this._model[errorName] = message;
    return this;
  }

  isEqual(value1: string, value2: string, errorName: string, message: string) {
    if (value1 !== value2) this._model[errorName] = message;
    return this;
  }

  isIncluded(
    value: string,
    values: string[],
    errorName: string,
    message: string
  ) {
    if (!values.includes(value)) this._model[errorName] = message;
    return this;
  }
}
