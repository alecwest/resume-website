import { DatePipe } from '@angular/common';
import { Pipe } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'betterDate'
})
export class BetterDatePipe extends DatePipe {
  transform(value: string | number | Date, format?: string, timezone?: string, locale?: string): string;
  transform(value: null, format?: string, timezone?: string, locale?: string): null;
  transform(value: string | number | Date, format?: string, timezone?: string, locale?: string): string;
  transform(value: unknown, format?: unknown, timezone?: unknown, locale?: unknown): string {
    if (value === 'present') {
      return '';
    } else {
      if (!this.isDate(value as string)) {
        return value as string;
      }
      return super.transform(value as any, format as any, timezone as any, locale as any);
    }
  }

  private isDate(element: string): boolean {
    return element === 'present' || element.match(/(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}/) !== null;
  }
}
