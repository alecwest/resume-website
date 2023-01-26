import { Component, Input } from '@angular/core';
import { ResumeEntry } from '../api/v1';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  /**
   * A list of entries which should all be of the same type
   */
  @Input()
  resumeEntries: ResumeEntry[];

  get type(): string {
    return this.resumeEntries.length > 0 && this.resumeEntries[0].type;
  }

  get layout(): string {
    if (this.type === ResumeEntry.TypeEnum.Bio) {
      return 'headerCard';
    } else if (this.resumeEntries.every(entry => entry.details && Object.values(entry.details)
      .some(entryDetailValue => Array.isArray(entryDetailValue)))) {
      // for every entry, there is some value in the details section that is an array
      return 'newDataGrid';
    } else if (this.resumeEntries.every(entry => entry.details.proficiency)) { // TODO consider using something more generic like "ranking"
      return 'list';
    } else {
      return 'wip';
    }
  }
}
