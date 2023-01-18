import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {

  @Input() context: string; // TODO use ng-content for this instead?

  isUrl(element: string): boolean {
    return element.includes('.com');
  }
}
