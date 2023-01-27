import { DatePipe } from '@angular/common';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'betterDate'
})
export class BetterDatePipe extends DatePipe {
  transform(value: string | number | Date, format?: string, timezone?: string, locale?: string): string;
  transform(value: null, format?: string, timezone?: string, locale?: string): null;
  transform(value: string | number | Date, format?: string, timezone?: string, locale?: string): string;
  transform(value: unknown, format?: unknown, timezone?: unknown, locale?: unknown): string {
    if (value === 'present') {
      return super.transform(new Date(), format as any, timezone as any, locale as any);
    } else {
      if (isNaN(Date.parse(value as string))) {
        return value as string;
      }
      return super.transform(value as any, format as any, timezone as any, locale as any);
    }
  }
}
