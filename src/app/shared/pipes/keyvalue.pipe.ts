import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalue'
})
export class KeyvaluePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const keys = [];
    Object.getOwnPropertyNames(value).forEach((key: string) =>
      keys.push({key: key, value: value[key]}));

    return keys;
  }

}
