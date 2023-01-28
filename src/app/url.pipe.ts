import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(/\b(https?:\/\/)?(www\d{0,3}[.])?([a-z0-9.\-]+[.][a-z]{2,4})\/([^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+/g, '$3');
  }
}
