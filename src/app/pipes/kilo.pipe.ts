import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kilo'
})
export class KiloPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M'
    if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K'
    return value.toFixed(1).toString()
  }

}
