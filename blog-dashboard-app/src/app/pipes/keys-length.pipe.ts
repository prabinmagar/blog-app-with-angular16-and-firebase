import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysLength'
})
export class KeysLengthPipe implements PipeTransform {

  transform(object: object): number {
    return Object.keys(object).length;
  }

}
