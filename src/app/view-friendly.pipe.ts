import { Pipe, PipeTransform } from '@angular/core';

/**
 * Strip all text not intended for viewing.
 * If none is found, return original string
 */
@Pipe({
  name: 'viewFriendly',
})
export class ViewFriendlyPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const realColumnNameStart = value.indexOf('(');
    const realColumnNameEnd = value.indexOf(')');
    if (realColumnNameStart > -1 && realColumnNameEnd > -1) {
      return value.substring(realColumnNameStart + 1, realColumnNameEnd);
    }
    return value.replace(/(\S)([A-Z])/g, '$1 $2');
  }
}
