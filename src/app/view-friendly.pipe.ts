import { Pipe, PipeTransform } from '@angular/core';

/**
 * Strip all text not intended for viewing.
 * If none is found, return original string
 */
@Pipe({
  standalone: true,
  name: 'viewFriendly',
})
export class ViewFriendlyPipe implements PipeTransform {
  transform(value: string): string {
    const columnNameSplit = value.split(".");
    if (columnNameSplit.length > 1) {
      value = columnNameSplit[columnNameSplit.length - 1];
    }
    return this.camelCaseTransform(this.kebabCaseTransform(value));
  }

  private camelCaseTransform(value: string): string {
    return value.replace(/(\S)([A-Z])/g, '$1 $2');
  }

  private kebabCaseTransform(value: string): string {
    return value.replace(/(\w)-(\w)/g, '$1 $2');
  }
}
