import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'casing',
})
export class CasingPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return args.length === 0
      ? value
      : args[0] === 'U'
      ? value.toUpperCase()
      : value.toLowerCase();
  }
}
