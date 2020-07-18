import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viewFriendly',
})
export class ViewFriendlyPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const realColumnNameStart = value.indexOf('(');
    const realColumnNameEnd = value.indexOf(')');
    if (realColumnNameStart > -1 && realColumnNameEnd > -1) {
      return value.substring(realColumnNameStart + 1, realColumnNameEnd);
    }
    return value;
  }
}
