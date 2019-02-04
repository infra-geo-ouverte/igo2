/**
 * Service where all available form fields are registered.
 */
export class FormFieldService {

  static fields: {[key: string]: any} = {};

  static register(type: string, component: any) {
    FormFieldService.fields[type] = component;
  }

  constructor() {}

  /**
   * Return field component by type
   * @param type Field type
   * @returns Field component
   */
  getFieldByType(type: string): any {
    return FormFieldService.fields[type];
  }

}
