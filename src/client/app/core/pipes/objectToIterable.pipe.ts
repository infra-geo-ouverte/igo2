import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'objectToIterable',  pure: false })
export class ObjectToIterable implements PipeTransform {
  transform(dict: any) {
    let a: any[] = [];
    for (let key in dict) {
      if (dict.hasOwnProperty(key)) { continue; }
      a.push({key: key, val: dict[key]});
    }
    return a;
  }
}
