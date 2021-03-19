import { isNil } from 'lodash';

export class AssignableObject {
  protected assignIfExists<T>(value: T, propertyName: string): void {
    if (!isNil(value)) {
      this[propertyName] = value;
    }
  }

  protected assignIfExistsAndMap(values: any, propertyName: string, mapValue: string): void {
    if (!isNil(values)) {
      this[propertyName] = values.map(value => value[mapValue]);
    }
  }
}
