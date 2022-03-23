import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abs'
})
export class AbsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Math.abs(value);
  }

}
